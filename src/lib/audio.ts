import { mediaAsset } from "./assets";

let enabled = true;
let ambient: HTMLAudioElement | null = null;
export type AudioChannel = "ui" | "dialogue" | "ambient" | "events" | "minigames" | "items";
const channelVolumes: Record<AudioChannel, number> = {
  ui: 0.75,
  dialogue: 0.8,
  ambient: 0.5,
  events: 0.8,
  minigames: 0.8,
  items: 0.7,
};

export function setAudioEnabled(next: boolean) {
  enabled = next;
  if (!enabled) ambient?.pause();
}

export function audioEnabled() {
  return enabled;
}

export function setAudioChannelVolume(channel: AudioChannel, volume: number) {
  channelVolumes[channel] = Math.max(0, Math.min(1, volume));
  if (channel === "ambient" && ambient) ambient.volume = 0.32 * channelVolumes.ambient;
}

export function audioChannelVolume(channel: AudioChannel) {
  return channelVolumes[channel];
}

export function playSound(file: string, bucket: string, volume = 0.35, channel: AudioChannel = "ui") {
  if (!enabled) return;
  const source = mediaAsset(file, bucket);
  if (!source) return;
  const audio = new Audio(source);
  audio.volume = volume * channelVolumes[channel];
  void audio.play().catch(() => undefined);
}

export function playUiSound(name: "trade" | "menu_click" | "map" | "pack_open" | "pack_closed") {
  playSound(`${name}.wav`, "ui", name === "trade" ? 0.45 : 0.25, "ui");
}

export function playItemSound(name: "page" | "metal" | "wood_small") {
  playSound(name === "page" ? "page.ogg" : `${name}.wav`, "items", 0.25, "items");
}

export function playOfferReaction(appraisal: string) {
  const tone = ["great_deal", "good_deal", "fair_deal"].includes(appraisal)
    ? "positive"
    : appraisal === "close" || appraisal === "reaching"
      ? "uncertain"
      : "negative";
  playSound(`offer_${tone}.wav`, "dialogue", 0.4, "dialogue");
}

export function playAmbient(file: string | null | undefined) {
  if (!enabled || !file) return;
  const source = mediaAsset(file, "ambiance");
  if (!source || ambient?.src.endsWith(source)) return;
  ambient?.pause();
  ambient = new Audio(source);
  ambient.loop = true;
  ambient.volume = 0.32 * channelVolumes.ambient;
  void ambient.play().catch(() => undefined);
}
