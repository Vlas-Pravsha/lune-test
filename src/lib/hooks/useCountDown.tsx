import { useCallback, useEffect, useRef, useState } from "react";

const MILLISECONDS = 1000;

type CallbackFunction = () => void;

interface UseCountDownProps {
  initialTime: number;
  callback: CallbackFunction;
}

type IntervalRef = ReturnType<typeof setTimeout>;

const useCountDown = ({ initialTime, callback }: UseCountDownProps) => {
  const [seconds, setSeconds] = useState(initialTime);
  const [resetTrigger, setResetTrigger] = useState(false);
  const deadlineRef = useRef(Date.now() + initialTime * MILLISECONDS);
  const intervalRef = useRef<IntervalRef>();

  const getTime = useCallback(
    (deadline: number) => {
      const time = deadline - Date.now();
      const calcSeconds = Math.floor((time / MILLISECONDS) % initialTime);
      setSeconds(calcSeconds);

      if (calcSeconds <= 0) {
        clearInterval(intervalRef.current);
        setResetTrigger((prev) => !prev);
        setSeconds(initialTime);
        callback();
      }
    },
    [callback, initialTime],
  );

  useEffect(() => {
    deadlineRef.current = Date.now() + initialTime * MILLISECONDS;
    intervalRef.current = setInterval(() => getTime(deadlineRef.current), 200);

    return () => clearInterval(intervalRef.current);
  }, [resetTrigger]);

  const resetTimer = useCallback(() => {
    deadlineRef.current = Date.now() + initialTime * MILLISECONDS;

    setSeconds(initialTime);
  }, [initialTime]);

  return { seconds, resetTimer };
};

export default useCountDown;
