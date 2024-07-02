import React from "react";
import { type QuizOption } from "./QuizClientComponent";

const Result = ({ options }: { options: QuizOption[] }) => {
  return <div>Количество вопросов {options.length}</div>;
};

export default Result;
