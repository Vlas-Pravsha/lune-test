import { Label } from "~/components/ui/label";
import { RadioGroupItem } from "~/components/ui/radio-group";
import { Separator } from "~/components/ui/separator";

import React from "react";

type CardItemType = {
  id: string;
  title: string;
  variants: Array<string>;
  correct: number;
};

interface CardItemProps {
  option: CardItemType;
}

const CardItem = ({ option }: CardItemProps) => {
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

export default CardItem;
