import React from "react";
import useCountDown from "~/lib/hooks/useCountDown";
import { type Option } from "./QuizClient";

interface TimerDownProps {
  initialTime: number;
  callback: () => void;
  currentOption?: Option;
}

const TimerDown = ({
  initialTime,
  callback,
  currentOption,
}: TimerDownProps) => {
  const { seconds } = useCountDown({ initialTime, callback });
  return <div>{currentOption && seconds}</div>;
};

export default TimerDown;
