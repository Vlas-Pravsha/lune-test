import React from "react";
import useCountDown from "~/lib/hooks/useCountDown";

interface TimerDownProps {
  initialTime: number;
  callback: () => void;
}

const TimerDown = ({ initialTime, callback }: TimerDownProps) => {
  const { seconds } = useCountDown({ initialTime, callback });
  return <div>{seconds}</div>;
};

export default TimerDown;
