import React from "react";
import { type Option } from "./QuizClient";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type OptionsProps = {
  option: Option;
  setCorrectOption: (index: number) => void;
};

const Options = ({ option, setCorrectOption }: OptionsProps) => {
  return (
    <RadioGroup className="flex flex-col gap-4">
      <h2>{option.title}</h2>
      {option.variants.map((variant, index) => {
        const id = `${variant}-${index}`;
        return (
          <div
            className="flex items-center space-x-2"
            onClick={() => setCorrectOption(index)}
            key={id}
          >
            <RadioGroupItem value={variant} id={id} />
            <Label htmlFor={id}>{variant}</Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default Options;
