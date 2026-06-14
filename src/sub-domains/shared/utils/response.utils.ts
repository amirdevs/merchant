import type { IRes } from "@/sub-domains/shared/types/response.type";

export function ok<T>(data: T, message = "OK", status = 200): IRes<T> {
  return { success: true, status, data, meta: { message } };
}

export function fail<T = null>(error: unknown, status = 500): IRes<T | null> {
  const message = error instanceof Error ? error.message : String(error || "Unknown error");
  return { success: false, status, data: null, meta: { message } };
}
