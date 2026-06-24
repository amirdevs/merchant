import type { Character } from "@/shared/types/game-data";
import { characterIdentityCatalogBatches } from "@/content/characters/profiles";
import { runtimeCharacterIdForIndex } from "@/content/characters/runtime";
import type { FinalCharacterIdentityProfile } from "@/content/characters/profiles/types";
import type { CharacterExpression } from "@/content/characters/planning";
import { fallbackCharacterProfileView, tradePortraitExpression, type CharacterProfileView } from "./characterProfileShared";
import sheet0001_0012 from "../../../docs/assets/character-prompts/characters-0001-0012.json";
import sheet0013_0024 from "../../../docs/assets/character-prompts/characters-0013-0024.json";
import sheet0025_0036 from "../../../docs/assets/character-prompts/characters-0025-0036.json";
import sheet0037_0048 from "../../../docs/assets/character-prompts/characters-0037-0048.json";
import sheet0049_0060 from "../../../docs/assets/character-prompts/characters-0049-0060.json";
import sheet0061_0072 from "../../../docs/assets/character-prompts/characters-0061-0072.json";
import sheet0073_0084 from "../../../docs/assets/character-prompts/characters-0073-0084.json";
import sheet0085_0096 from "../../../docs/assets/character-prompts/characters-0085-0096.json";
import sheet0097_0108 from "../../../docs/assets/character-prompts/characters-0097-0108.json";
import sheet0109_0120 from "../../../docs/assets/character-prompts/characters-0109-0120.json";
import sheet0121_0132 from "../../../docs/assets/character-prompts/characters-0121-0132.json";
import sheet0133_0144 from "../../../docs/assets/character-prompts/characters-0133-0144.json";
import sheet0145_0156 from "../../../docs/assets/character-prompts/characters-0145-0156.json";
import sheet0157_0168 from "../../../docs/assets/character-prompts/characters-0157-0168.json";
import sheet0169_0180 from "../../../docs/assets/character-prompts/characters-0169-0180.json";
import sheet0181_0192 from "../../../docs/assets/character-prompts/characters-0181-0192.json";
import sheet0193_0204 from "../../../docs/assets/character-prompts/characters-0193-0204.json";
import sheet0205_0216 from "../../../docs/assets/character-prompts/characters-0205-0216.json";
import sheet0217_0228 from "../../../docs/assets/character-prompts/characters-0217-0228.json";
import sheet0229_0240 from "../../../docs/assets/character-prompts/characters-0229-0240.json";
import sheet0241_0252 from "../../../docs/assets/character-prompts/characters-0241-0252.json";
import sheet0253_0264 from "../../../docs/assets/character-prompts/characters-0253-0264.json";
import sheet0265_0276 from "../../../docs/assets/character-prompts/characters-0265-0276.json";
import sheet0277_0288 from "../../../docs/assets/character-prompts/characters-0277-0288.json";
import sheet0289_0300 from "../../../docs/assets/character-prompts/characters-0289-0300.json";
import sheet0301_0312 from "../../../docs/assets/character-prompts/characters-0301-0312.json";
import sheet0313_0324 from "../../../docs/assets/character-prompts/characters-0313-0324.json";
import sheet0325_0336 from "../../../docs/assets/character-prompts/characters-0325-0336.json";
import sheet0337_0348 from "../../../docs/assets/character-prompts/characters-0337-0348.json";
import sheet0349_0360 from "../../../docs/assets/character-prompts/characters-0349-0360.json";
import sheet0361_0372 from "../../../docs/assets/character-prompts/characters-0361-0372.json";
import sheet0373_0384 from "../../../docs/assets/character-prompts/characters-0373-0384.json";
import sheet0385_0396 from "../../../docs/assets/character-prompts/characters-0385-0396.json";
import sheet0397_0408 from "../../../docs/assets/character-prompts/characters-0397-0408.json";
import sheet0409_0420 from "../../../docs/assets/character-prompts/characters-0409-0420.json";
import sheet0421_0432 from "../../../docs/assets/character-prompts/characters-0421-0432.json";
import sheet0433_0444 from "../../../docs/assets/character-prompts/characters-0433-0444.json";
import sheet0445_0456 from "../../../docs/assets/character-prompts/characters-0445-0456.json";
import sheet0457_0468 from "../../../docs/assets/character-prompts/characters-0457-0468.json";
import sheet0469_0480 from "../../../docs/assets/character-prompts/characters-0469-0480.json";
import sheet0481_0492 from "../../../docs/assets/character-prompts/characters-0481-0492.json";
import sheet0493_0504 from "../../../docs/assets/character-prompts/characters-0493-0504.json";
import sheet0505_0516 from "../../../docs/assets/character-prompts/characters-0505-0516.json";
import sheet0517_0528 from "../../../docs/assets/character-prompts/characters-0517-0528.json";
import sheet0529_0540 from "../../../docs/assets/character-prompts/characters-0529-0540.json";
import sheet0541_0552 from "../../../docs/assets/character-prompts/characters-0541-0552.json";
import sheet0553_0564 from "../../../docs/assets/character-prompts/characters-0553-0564.json";
import sheet0565_0576 from "../../../docs/assets/character-prompts/characters-0565-0576.json";
import sheet0577_0588 from "../../../docs/assets/character-prompts/characters-0577-0588.json";
import sheet0589_0600 from "../../../docs/assets/character-prompts/characters-0589-0600.json";
import sheet0601_0612 from "../../../docs/assets/character-prompts/characters-0601-0612.json";
import sheet0613_0624 from "../../../docs/assets/character-prompts/characters-0613-0624.json";
import sheet0625_0636 from "../../../docs/assets/character-prompts/characters-0625-0636.json";
import sheet0637_0648 from "../../../docs/assets/character-prompts/characters-0637-0648.json";
import sheet0649_0660 from "../../../docs/assets/character-prompts/characters-0649-0660.json";
import sheet0661_0672 from "../../../docs/assets/character-prompts/characters-0661-0672.json";
import sheet0673_0684 from "../../../docs/assets/character-prompts/characters-0673-0684.json";
import sheet0685_0696 from "../../../docs/assets/character-prompts/characters-0685-0696.json";
import sheet0697_0708 from "../../../docs/assets/character-prompts/characters-0697-0708.json";
import sheet0709_0720 from "../../../docs/assets/character-prompts/characters-0709-0720.json";
import sheet0721_0722 from "../../../docs/assets/character-prompts/characters-0721-0722.json";

type PromptImageEntry = {
  readonly globalOrder: number;
  readonly order: number;
  readonly row: number;
  readonly column: number;
  readonly cell: string;
  readonly imageId: string;
  readonly characterId: string;
  readonly displayName: string;
  readonly profession: string;
  readonly expression: CharacterExpression;
  readonly outputFile: string;
  readonly ancestryOrSpecies?: string;
  readonly magicalTraits?: readonly string[];
  readonly visualTraits?: readonly string[];
  readonly professionProps?: readonly string[];
};

type PromptSheet = {
  readonly batchId: string;
  readonly images: readonly PromptImageEntry[];
};

const promptSheets = [
  sheet0001_0012, sheet0013_0024, sheet0025_0036, sheet0037_0048, sheet0049_0060, sheet0061_0072, sheet0073_0084, sheet0085_0096, sheet0097_0108, sheet0109_0120, sheet0121_0132, sheet0133_0144, sheet0145_0156, sheet0157_0168, sheet0169_0180, sheet0181_0192, sheet0193_0204, sheet0205_0216, sheet0217_0228, sheet0229_0240, sheet0241_0252, sheet0253_0264, sheet0265_0276, sheet0277_0288, sheet0289_0300, sheet0301_0312, sheet0313_0324, sheet0325_0336, sheet0337_0348, sheet0349_0360, sheet0361_0372, sheet0373_0384, sheet0385_0396, sheet0397_0408, sheet0409_0420, sheet0421_0432, sheet0433_0444, sheet0445_0456, sheet0457_0468, sheet0469_0480, sheet0481_0492, sheet0493_0504, sheet0505_0516, sheet0517_0528, sheet0529_0540, sheet0541_0552, sheet0553_0564, sheet0565_0576, sheet0577_0588, sheet0589_0600, sheet0601_0612, sheet0613_0624, sheet0625_0636, sheet0637_0648, sheet0649_0660, sheet0661_0672, sheet0673_0684, sheet0685_0696, sheet0697_0708, sheet0709_0720, sheet0721_0722
] as unknown as readonly PromptSheet[];

export type CharacterPortraitRecord = PromptImageEntry & {
  readonly assetPath: string;
};

export const CHARACTER_PORTRAIT_ASSET_ROOT = "/assets/portraits/characters";
export const EXPECTED_CHARACTER_PORTRAIT_COUNT = 722;
export const EXPECTED_CHARACTER_IDENTITY_COUNT = 240;
export const EXPECTED_PRIMARY_CAST_COUNT = 48;
export const EXPECTED_SUPPORTING_CAST_COUNT = 192;

export function runtimePortraitAsset(outputFile: string | null | undefined) {
  if (!outputFile) return "";
  return `${CHARACTER_PORTRAIT_ASSET_ROOT}/${outputFile.replace(/\\/g, "/")}`;
}

export const characterPortraitRecords: readonly CharacterPortraitRecord[] = promptSheets
  .flatMap((sheet) => sheet.images.map((image) => ({ ...image, assetPath: runtimePortraitAsset(image.outputFile) })))
  .sort((left, right) => left.globalOrder - right.globalOrder);

export const characterPortraitsByOutputFile = new Map(
  characterPortraitRecords.map((portrait) => [portrait.outputFile, portrait] as const),
);

export const characterPortraitsByImageId = new Map(
  characterPortraitRecords.map((portrait) => [portrait.imageId, portrait] as const),
);

export const characterPortraitsByCharacterId = new Map<string, CharacterPortraitRecord[]>();
for (const portrait of characterPortraitRecords) {
  const list = characterPortraitsByCharacterId.get(portrait.characterId) || [];
  list.push(portrait);
  characterPortraitsByCharacterId.set(portrait.characterId, list);
}
for (const list of characterPortraitsByCharacterId.values()) {
  list.sort((left, right) => expressionSortKey(left.expression) - expressionSortKey(right.expression));
}

export const characterIdentityProfiles: readonly FinalCharacterIdentityProfile[] = characterIdentityCatalogBatches.flatMap(
  (batch) => batch.identities,
);

export const characterIdentityById = new Map(
  characterIdentityProfiles.map((identity) => [identity.characterId, identity] as const),
);

export const characterPortraitManifestSummary = {
  promptSheetCount: promptSheets.length,
  portraitCount: characterPortraitRecords.length,
  identityCount: characterIdentityProfiles.length,
  primaryCastCount: characterIdentityProfiles.filter((identity) => identity.rosterGroup === "primary_cast").length,
  supportingCastCount: characterIdentityProfiles.filter((identity) => identity.rosterGroup === "supporting_cast").length,
  assetRoot: CHARACTER_PORTRAIT_ASSET_ROOT,
} as const;

export function characterIdForRuntimeIndex(index: number) {
  return runtimeCharacterIdForIndex(index);
}

export function characterIdForCharacter(character: Character | null | undefined) {
  if (!character) return null;
  const explicit = (character as Character & { characterId?: string }).characterId;
  if (explicit && characterIdentityById.has(explicit)) return explicit;
  return characterIdForRuntimeIndex(character.index);
}

export function characterProfileForCharacter(character: Character | null | undefined) {
  const id = characterIdForCharacter(character);
  return id ? characterIdentityById.get(id) || null : null;
}

export function characterExpressionPortrait(characterId: string, expression: CharacterExpression = "neutral") {
  const portraits = characterPortraitsByCharacterId.get(characterId) || [];
  return (
    portraits.find((portrait) => portrait.expression === expression) ||
    portraits.find((portrait) => portrait.expression === "neutral") ||
    portraits[0] ||
    null
  );
}

export function characterPortraitAssetForCharacter(character: Character | null | undefined, expression: CharacterExpression = "neutral") {
  const id = characterIdForCharacter(character);
  if (!id) return "";
  return characterExpressionPortrait(id, expression)?.assetPath || "";
}

export function characterProfileView(character: Character, expression: CharacterExpression = "neutral"): CharacterProfileView {
  const fallback = fallbackCharacterProfileView(character);
  const id = characterIdForCharacter(character);
  const profile = id ? characterIdentityById.get(id) || null : null;
  const portraitSrc = profile ? characterExpressionPortrait(profile.characterId, expression)?.assetPath || "" : "";
  return {
    id,
    name: profile?.finalDisplayName || fallback.name,
    profession: profile?.profession || fallback.profession,
    portraitSrc,
    story: profile?.shortStory || fallback.story,
    marketFlavor: profile?.marketFlavor || fallback.marketFlavor,
    tradePersonality: profile?.tradePersonality || fallback.tradePersonality,
    roleTags: profile?.roleTags || [],
    gameplayGroups: profile?.gameplayGroups || [],
    ancestryOrSpecies: profile?.ancestryOrSpecies,
    magicalTraits: profile?.magicalTraits || [],
    visualIdentity: profile?.visualIdentity || fallback.visualIdentity,
  };
}

export function characterCustomerIntro(character: Character) {
  const view = characterProfileView(character);
  return `${view.name} steps up to the counter. ${view.marketFlavor}`;
}

function expressionSortKey(expression: CharacterExpression) {
  const order: readonly CharacterExpression[] = ["neutral", "happy", "suspicious", "worried", "angry", "sad", "surprised", "bargaining", "wonder", "proud", "amused", "tired"];
  const index = order.indexOf(expression);
  return index === -1 ? 999 : index;
}
