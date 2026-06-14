import { useEffect, useState } from "react";
import { readJsonSetting, writeJsonSetting } from "@/sub-domains/shared/utils/storage.utils";

export function usePersistedSetting<T extends object>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readJsonSetting(key, fallback));

  useEffect(() => {
    writeJsonSetting(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
