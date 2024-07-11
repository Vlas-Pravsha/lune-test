import { useEffect, useRef, useState } from "react";

const MILLISECONDS = 1000;

interface useCountDownProps {
  initialTime: number;
  callback: () => void;
}

type IntervalRef = ReturnType<typeof setTimeout>;

const useCountDown = ({ initialTime, callback }: useCountDownProps) => {
  const [seconds, setSeconds] = useState(initialTime);
  const [resetTrigger, setResetTrigger] = useState(false);
  const deadlineRef = useRef(Date.now() + initialTime * MILLISECONDS);
  const intervalRef = useRef<IntervalRef>();

  const getTime = (deadline: number) => {
    const time = deadline - Date.now();
    const calcSeconds = Math.floor((time / MILLISECONDS) % 60);
    setSeconds(calcSeconds);

    if (calcSeconds <= 0) {
      clearInterval(intervalRef.current);
      setResetTrigger((prev) => !prev);
      setSeconds(initialTime);
      callback();
    }
  };

  useEffect(() => {
    deadlineRef.current = Date.now() + initialTime * MILLISECONDS;
    intervalRef.current = setInterval(() => getTime(deadlineRef.current), 200);

    return () => clearInterval(intervalRef.current);
  }, [resetTrigger]);

  const resetTimer = () => {
    deadlineRef.current = Date.now() + initialTime * MILLISECONDS;

    setSeconds(initialTime);
  };

  return { seconds, resetTimer };
};

export default useCountDown;
