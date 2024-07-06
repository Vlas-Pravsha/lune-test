import React from "react";
import { type QuizOption } from "./QuizClientComponent";

const Result = ({
  options,
  correct,
}: {
  options: QuizOption[];
  correct: number;
}) => {
  return (
    <div>
      Number of correct answers {correct} from {options.length}
    </div>
  );
};

export default Result;
