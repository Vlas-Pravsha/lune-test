import React from "react";
import { type Option } from "./QuizClient";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

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
            onClick={() => setCorrectOption(index)}
            key={id}
          >
            <Checkbox value={variant} id={id} />
            <Label htmlFor={id}>{variant}</Label>
          </div>
        );
      })}
    </>
  );
};

export default Options;
