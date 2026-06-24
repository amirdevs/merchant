const ASSET_ROOT = "/assets";
export const GAME_ASSET_ROOT = ASSET_ROOT;

function extOf(file: string) {
  const dot = file.lastIndexOf(".");
  return dot >= 0 ? file.slice(dot) : "";
}

function baseOf(file: string) {
  const normalized = file.replace(/\\/g, "/");
  const name = normalized.slice(normalized.lastIndexOf("/") + 1);
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(0, dot) : name;
}

export function imageAsset(file: string | null | undefined, bucket: string) {
  if (!file) return "";
  return `${ASSET_ROOT}/imgs/${baseOf(file)}--${bucket}${extOf(file)}`;
}

export function portraitAsset(file: string | null | undefined) {
  return imageAsset(file, "characters");
}

export function stallAsset(file: string | null | undefined) {
  return imageAsset(file, "stalls");
}

export function townAsset(file: string | null | undefined) {
  return imageAsset(file, "townsquares");
}

export function backdropAsset(file: string | null | undefined) {
  return imageAsset(file, "backdrops");
}

export function routeAsset(file: string | null | undefined) {
  return imageAsset(file, "routes");
}

export function mapAsset(file = "main.jpg") {
  return imageAsset(file, "maps");
}

export function itemIconAsset(file: string | null | undefined) {
  if (!file) return "";
  return `${ASSET_ROOT}/items/${file.replace(/\\/g, "/")}`;
}

export function mediaAsset(file: string | null | undefined, bucket: string) {
  if (!file) return "";
  return `${ASSET_ROOT}/media/${baseOf(file)}--${bucket}${extOf(file)}`;
}
