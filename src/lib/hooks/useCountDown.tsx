import { useEffect, useRef, useState } from "react";

const MILLISECONDS = 1000;

interface useCountDownProps {
  initialTime: number;
  callback: () => void;
}

type Ref = ReturnType<typeof setTimeout>;

const useCountDown = ({ initialTime, callback }: useCountDownProps) => {
  const [seconds, setSeconds] = useState(initialTime);
  const deadlineRef = useRef(Date.now() + initialTime * MILLISECONDS);
  const ref = useRef<Ref>();

  const getTime = (deadline: number) => {
    const time = deadline - Date.now();
    const calcSeconds = Math.floor((time / MILLISECONDS) % 60);
    setSeconds(calcSeconds);

    if (calcSeconds <= 0) {
      clearInterval(ref.current);
      setSeconds(initialTime);
      callback();
      return;
    }
  };

  useEffect(() => {
    ref.current = setInterval(() => getTime(deadlineRef.current), 200);

    return () => clearInterval(ref.current);
  }, []);

  return { seconds };
};

export default useCountDown;
