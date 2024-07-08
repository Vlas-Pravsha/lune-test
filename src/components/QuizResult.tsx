import React from "react";
import { type Option } from "./QuizClient";

const QuizResult = ({
  options,
  correct,
}: {
  options: Option[];
  correct: number;
}) => {
  return (
    <div>
      Number of correct answers {correct} from {options.length}
    </div>
  );
};

export default QuizResult;
