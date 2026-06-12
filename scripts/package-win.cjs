const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const releaseDir = path.join(root, "release");
const appName = "MerchantOfflineRemake";
const targetDir = path.join(releaseDir, `${appName}-win`);
const appDir = path.join(targetDir, "resources", "app");

function assertExists(target, message) {
  if (!fs.existsSync(target)) {
    throw new Error(message);
  }
}

function electronPackageDir() {
  return path.dirname(require.resolve("electron/package.json"));
}

function electronRuntimeDir() {
  const packageDir = electronPackageDir();
  const pathFile = path.join(packageDir, "path.txt");
  const directDist = path.join(packageDir, "dist");

  if (fs.existsSync(directDist)) return directDist;
  if (fs.existsSync(pathFile)) {
    const runtimePath = fs.readFileSync(pathFile, "utf8").trim();
    const resolved = path.isAbsolute(runtimePath) ? runtimePath : path.join(packageDir, runtimePath);
    return path.dirname(resolved);
  }

  return null;
}

assertExists(path.join(root, "dist", "index.html"), "Missing production build. Run `pnpm build` before packaging.");

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(appDir, { recursive: true });

const runtimeDir = electronRuntimeDir();
if (!runtimeDir) {
  console.error("Electron runtime is missing. Run `pnpm install --force`, then retry `pnpm package:win`.");
  process.exit(1);
}

fs.cpSync(runtimeDir, targetDir, { recursive: true });
fs.cpSync(path.join(root, "dist"), path.join(appDir, "dist"), { recursive: true });
fs.cpSync(path.join(root, "electron"), path.join(appDir, "electron"), { recursive: true });
fs.writeFileSync(
  path.join(appDir, "package.json"),
  JSON.stringify(
    {
      name: "merchant-offline-remake",
      version: "1.0.0",
      private: true,
      main: "electron/main.cjs",
    },
    null,
    2
  )
);

const sourceExe = path.join(targetDir, "electron.exe");
const targetExe = path.join(targetDir, `${appName}.exe`);
if (fs.existsSync(sourceExe)) fs.renameSync(sourceExe, targetExe);

console.log(`Packaged Windows app: ${targetDir}`);
