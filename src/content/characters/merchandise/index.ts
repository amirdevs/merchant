import merchandiseAssignmentsJson from "./assignments.json";

export type {
  CharacterMerchandiseAssignment,
  CharacterMerchandiseAssignments,
  CharacterMerchandiseMatchedItem,
} from "./types";
import type { CharacterMerchandiseAssignments } from "./types";

export const characterMerchandiseAssignments = merchandiseAssignmentsJson as CharacterMerchandiseAssignments;
export const characterMerchandiseAssignmentById = new Map(
  characterMerchandiseAssignments.map((assignment) => [assignment.characterId, assignment] as const),
);
