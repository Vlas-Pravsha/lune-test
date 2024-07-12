import { useEffect, useState } from "react";

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const getValue = (): T => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? (JSON.parse(storedValue) as T) : initialValue;
  };

  const [value, setValue] = useState<T>(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
