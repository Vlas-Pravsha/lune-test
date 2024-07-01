/* eslint-disable @typescript-eslint/no-unsafe-return */
export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem, removeItem };
};

// import { useEffect, useState } from 'react'

// const useLocalStorage = (key: string, initialValue: string[]) => {
//   const getValue = () => {
//     const storedValue = localStorage.getItem(key)
//     return storedValue !== null ? JSON.parse(storedValue) : initialValue
//   }

//   const [value, setValue] = useState(getValue)

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value))
//   }, [key, value])

//   return [value, setValue]
// }

// export default useLocalStorage
