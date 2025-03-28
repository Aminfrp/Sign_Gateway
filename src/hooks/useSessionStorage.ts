import { getSessionStorage, setSessionStorage } from "@/lib/utils";
import { useState } from "react";

export const useSessionStorage = <T>(
  key: string,
  initialValue?: T
): [T | undefined, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const item = getSessionStorage(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      setSessionStorage(key, value);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
