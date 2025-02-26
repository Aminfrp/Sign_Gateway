import { getSessionStorage, setSessionStorage } from "@/lib/utils";
import { useState } from "react";

export const useSessionStorage = <T>(key: string, initialValue?: T) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = getSessionStorage(key);
      return item ? item : initialValue;
    } catch (error) {
      // debugLogger(error);
      return initialValue;
    }
  });

  const setValue = <T>(value: T) => {
    try {
      setStoredValue(value);
      setSessionStorage(key, value);
    } catch (error) {
      // debugLogger(error);
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
