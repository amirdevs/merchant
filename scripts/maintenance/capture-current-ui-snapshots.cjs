const { spawn } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "docs", "ui-snapshots-current");
const tmp = path.join(os.tmpdir(), `merchant-current-capture-${Date.now()}`);
const appUrl = "http://127.0.0.1:5173";
const port = 9226;
const chromeUrl = `http://127.0.0.1:${port}`;
const viewport = { width: 1440, height: 1000 };

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitHttp(url, attempts = 80) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {}
    await sleep(250);
  }
  return false;
}

function startVite() {
  const command = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
  return spawn(command, ["run", "dev:web", "--", "--port", "5173"], {
    cwd: root,
    env: { ...process.env, BROWSER: "none" },
    shell: process.platform === "win32",
    stdio: "ignore",
  });
}

function startChrome() {
  return spawn(
    process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    [
      "--headless=new",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${path.join(os.tmpdir(), `merchant-current-chrome-${Date.now()}`)}`,
      "--disable-gpu",
      "--no-first-run",
      `--window-size=${viewport.width},${viewport.height}`,
      "about:blank",
    ],
    { stdio: "ignore" }
  );
}

async function connect(wsUrl) {
  const socket = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(message.error.message));
    else waiter.resolve(message.result);
  });
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  return {
    send(method, params = {}) {
      id += 1;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
    },
    close: () => socket.close(),
  };
}

async function createPage() {
  const res = await fetch(`${chromeUrl}/json/new?${encodeURIComponent(appUrl)}`, { method: "PUT" });
  const page = await res.json();
  return connect(page.webSocketDebuggerUrl);
}

async function evalJs(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  return result.result?.value;
}

async function waitFor(cdp, expression) {
  for (let i = 0; i < 80; i += 1) {
    if (await evalJs(cdp, expression)) return;
    await sleep(200);
  }
  throw new Error(`Timed out waiting for ${expression}`);
}

async function clickText(cdp, text) {
  const clicked = await evalJs(cdp, `(() => {
    const node = [...document.querySelectorAll("button")].find((button) => button.textContent?.includes(${JSON.stringify(text)}) || button.getAttribute("aria-label")?.includes(${JSON.stringify(text)}));
    if (!node) return false;
    node.click();
    return true;
  })()`);
  if (!clicked) throw new Error(`Missing button/text: ${text}`);
  await sleep(350);
}

async function clickFirst(cdp, selector) {
  const clicked = await evalJs(cdp, `(() => {
    const node = document.querySelector(${JSON.stringify(selector)});
    if (!node) return false;
    node.click();
    return true;
  })()`);
  await sleep(350);
  return Boolean(clicked);
}

async function setInput(cdp, selector, value) {
  await evalJs(cdp, `(() => {
    const input = document.querySelector(${JSON.stringify(selector)});
    if (!input) return false;
    input.value = ${JSON.stringify(value)};
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  })()`);
  await sleep(250);
}

async function expand(cdp) {
  await evalJs(cdp, `(() => {
    document.querySelector("#capture-expand-style")?.remove();
    const style = document.createElement("style");
    style.id = "capture-expand-style";
    style.textContent = [
      "html, body { overflow: auto !important; }",
      ".game-root, .ui-screen-frame, .trade-workspace { min-height: auto !important; height: auto !important; overflow: visible !important; }",
      "section, main, aside, article, .trade-column, .ui-panel, .ui-frame-surface { max-height: none !important; overflow: visible !important; }",
      ".inventory-grid, .customer-board-town, .route-ledger-list, .help-action-list { max-height: none !important; overflow: visible !important; }",
      "* { scroll-behavior: auto !important; animation-duration: 0s !important; transition-duration: 0s !important; }"
    ].join("\\n");
    document.head.appendChild(style);
    [...document.querySelectorAll("*")].forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      const computed = getComputedStyle(node);
      if (node.scrollHeight > node.clientHeight + 20 && computed.position !== "fixed") {
        node.style.overflow = "visible";
        node.style.maxHeight = "none";
      }
    });
    return true;
  })()`);
  await sleep(250);
}

async function stitch(manifestPath) {
  const script = `
$manifest = Get-Content -Raw -LiteralPath '${manifestPath.replace(/'/g, "''")}' | ConvertFrom-Json
Add-Type -AssemblyName System.Drawing
$bitmap = New-Object System.Drawing.Bitmap([int]$manifest.width, [int]$manifest.height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.Clear([System.Drawing.Color]::Transparent)
foreach ($slice in $manifest.slices) {
  $img = [System.Drawing.Image]::FromFile($slice.file)
  try {
    $srcHeight = [Math]::Min($img.Height, [int]$manifest.height - [int]$slice.y)
    if ($srcHeight -gt 0) {
      $dest = New-Object System.Drawing.Rectangle(0, [int]$slice.y, $img.Width, $srcHeight)
      $src = New-Object System.Drawing.Rectangle(0, 0, $img.Width, $srcHeight)
      $graphics.DrawImage($img, $dest, $src, [System.Drawing.GraphicsUnit]::Pixel)
    }
  } finally { $img.Dispose() }
}
$graphics.Dispose()
$bitmap.Save($manifest.output, [System.Drawing.Imaging.ImageFormat]::Png)
$bitmap.Dispose()
`;
  await new Promise((resolve, reject) => {
    const ps = spawn("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script]);
    let stderr = "";
    ps.stderr.on("data", (data) => (stderr += data.toString()));
    ps.on("close", (code) => (code === 0 ? resolve() : reject(new Error(stderr || `stitch failed ${code}`))));
  });
}

async function capture(cdp, name) {
  await expand(cdp);
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  const totalHeight = Math.ceil(await evalJs(cdp, `Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, ${viewport.height})`));
  const positions = [];
  for (let y = 0; y < totalHeight; y += viewport.height) positions.push(y);
  const last = Math.max(0, totalHeight - viewport.height);
  if (!positions.includes(last)) positions.push(last);
  positions.sort((a, b) => a - b);

  const sliceDir = path.join(tmp, name);
  fs.mkdirSync(sliceDir, { recursive: true });
  const slices = [];
  for (let i = 0; i < positions.length; i += 1) {
    await evalJs(cdp, `window.scrollTo(0, ${positions[i]})`);
    await sleep(120);
    const y = await evalJs(cdp, "Math.round(window.scrollY)");
    const png = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false, fromSurface: true });
    const file = path.join(sliceDir, `${String(i).padStart(3, "0")}.png`);
    fs.writeFileSync(file, Buffer.from(png.data, "base64"));
    slices.push({ file, y });
  }
  const manifestPath = path.join(sliceDir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify({ width: viewport.width, height: totalHeight, output: path.join(outDir, `${name}.png`), slices }));
  await stitch(manifestPath);
  await cdp.send("Emulation.clearDeviceMetricsOverride");
  await evalJs(cdp, "window.scrollTo(0, 0)");
  console.log(`saved ${name}.png ${viewport.width}x${totalHeight}`);
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(tmp, { recursive: true });
  let vite = null;
  if (!(await waitHttp(appUrl, 3))) {
    vite = startVite();
    if (!(await waitHttp(appUrl))) throw new Error("Vite did not start");
  }
  const chrome = startChrome();
  let cdp;
  try {
    if (!(await waitHttp(chromeUrl))) throw new Error("Chrome did not start");
    cdp = await createPage();
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await waitFor(cdp, "Boolean(document.querySelector('.trade-workspace'))");

    await capture(cdp, "01-trade-workspace-base");
    await clickFirst(cdp, ".customer-token");
    await capture(cdp, "02-trade-workspace-customer-selected");
    await clickFirst(cdp, ".trade-column-right .inventory-slot-button");
    await capture(cdp, "03-player-offer-added");
    await clickFirst(cdp, ".trade-column-left .inventory-slot-button");
    await capture(cdp, "04-both-offers-added");
    await clickFirst(cdp, ".inventory-protect");
    await capture(cdp, "05-protected-item-state");
    await setInput(cdp, ".trade-column-right .inventory-toolbar input", "coin");
    await capture(cdp, "06-inventory-search-filter");
    await clickText(cdp, "Next Customer");
    await capture(cdp, "07-next-customer-state");
    await clickFirst(cdp, ".route-ledger-card");
    await capture(cdp, "08-after-travel-state");
    await clickText(cdp, "Open controls");
    await capture(cdp, "09-help-modal");

    fs.writeFileSync(path.join(outDir, "README.md"), [
      "# Current UI Snapshots",
      "",
      "Reusable stitched captures for the current app shell. Run with `node scripts/capture-current-ui-snapshots.cjs`.",
      "",
      "- `01-trade-workspace-base.png` - base trade workspace",
      "- `02-trade-workspace-customer-selected.png` - customer selected",
      "- `03-player-offer-added.png` - player inventory item moved into offer",
      "- `04-both-offers-added.png` - player and customer offers populated",
      "- `05-protected-item-state.png` - protected item state",
      "- `06-inventory-search-filter.png` - inventory search/filter state",
      "- `07-next-customer-state.png` - next customer state",
      "- `08-after-travel-state.png` - after travel route click",
      "- `09-help-modal.png` - help modal",
      "",
    ].join("\n"));
  } finally {
    cdp?.close();
    chrome.kill();
    vite?.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
