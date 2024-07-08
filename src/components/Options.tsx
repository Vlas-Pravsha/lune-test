import React from "react";
import { type Option } from "./QuizClient";
import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

type OptionsProps = {
  option: Option;
  setCorrectOption: (index: number) => void;
};

const Options = ({ option, setCorrectOption }: OptionsProps) => {
  return (
    <>
      <h2>{option.title}</h2>
      {option.variants.map((variant, index) => {
        const id = `${variant}-${index}`;
        return (
          <div
            className="flex items-center space-x-2"
            key={id}
            onClick={() => setCorrectOption(index)}
          >
            <RadioGroupItem value={variant} id={id} />
            <Label htmlFor={id}>{variant}</Label>
          </div>
        );
      })}
    </>
  );
};

export default Options;
