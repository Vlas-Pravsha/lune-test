import { Label } from "~/components/ui/label";
import { RadioGroupItem } from "~/components/ui/radio-group";

import React from "react";

type OptionType = {
  id: string;
  title: string;
  variants: Array<string>;
  correct: number;
};

const QuizCard = ({ option }: { option: OptionType }) => {
  return (
    <>
      <h2>{option.title}</h2>
      {option.variants.map((value, index) => {
        const id = `${option.id}-${index}`;
        return (
          <div className="flex items-center space-x-2" key={value}>
            <RadioGroupItem value={value} id={id} />
            <Label htmlFor={value}>{value}</Label>
          </div>
        );
      })}
    </>
  );
};

export default QuizCard;
