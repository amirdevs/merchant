import type { MouseEvent } from "react";
import type { MoveAmount } from "../../../lib/inventory";

export function clickMoveAmount(event: MouseEvent<HTMLButtonElement>, mode: "stock" | "offer"): MoveAmount {
  if (event.altKey) return mode === "offer" ? -10 : 10;
  if (event.shiftKey) return "half";
  return mode === "offer" ? -1 : 1;
}
