import { mediaAsset } from "./assets";

let enabled = true;
let ambient: HTMLAudioElement | null = null;

export function setAudioEnabled(next: boolean) {
  enabled = next;
  if (!enabled) ambient?.pause();
}

export function audioEnabled() {
  return enabled;
}

export function playSound(file: string, bucket: string, volume = 0.35) {
  if (!enabled) return;
  const source = mediaAsset(file, bucket);
  if (!source) return;
  const audio = new Audio(source);
  audio.volume = volume;
  void audio.play().catch(() => undefined);
}

export function playUiSound(name: "trade" | "menu_click" | "map" | "pack_open" | "pack_closed") {
  playSound(`${name}.wav`, "ui", name === "trade" ? 0.45 : 0.25);
}

export function playItemSound(name: "page" | "metal" | "wood_small") {
  playSound(name === "page" ? "page.ogg" : `${name}.wav`, "items", 0.25);
}

export function playAmbient(file: string | null | undefined) {
  if (!enabled || !file) return;
  const source = mediaAsset(file, "ambiance");
  if (!source || ambient?.src.endsWith(source)) return;
  ambient?.pause();
  ambient = new Audio(source);
  ambient.loop = true;
  ambient.volume = 0.16;
  void ambient.play().catch(() => undefined);
}
