import React from "react";
import useCountDown from "~/lib/hooks/useCountDown";
import { Option } from "./QuizClient";

interface TimerDownProps {
  initialTime: number;
  callback: () => void;
  options?: Option[]
}

const TimerDown = ({ initialTime, callback, options }: TimerDownProps) => {
  const { seconds } = useCountDown({ initialTime, callback});
  return <div>{options!.length ? seconds : null}</div>;
};

export default TimerDown;
