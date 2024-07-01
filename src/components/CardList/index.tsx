"use client";

import { RadioGroup } from "~/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Edit, Play, Trash } from "lucide-react";
import { useLocalStorage } from "~/lib/hooks/useLocalStorage";
import CardItem from "../CardItem";
import { useState } from "react";

interface CardItemType {
  id: string;
  title: string;
  variants: Array<string>;
  correct: number;
}

interface CardListProps {
  options: CardItemType[];
  title: string;
  setOptions: (options: CardItemType[]) => void;
  id: string;
  handleRemoveQuiz: (id: string) => void;
}

const CardList = ({
  setOptions,
  options,
  title,
  id,
  handleRemoveQuiz,
}: CardListProps) => {
  const [step, setStep] = useState<number>(0);
  const option = options[step];
  console.log(option);

  const { setItem } = useLocalStorage("selectedOption");

  function handleNextStep() {
    setStep(step + 1);
  }

  return (
    <Card className="w-[550px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Количество вопросов {options.length}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          onValueChange={(value) => {
            console.log(value);
            setItem(value);
          }}
          className="flex flex-col gap-4"
        >
          {option ? <CardItem option={option} /> : <div> Good job!</div>}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => handleNextStep()}>Next</Button>
        <div className="flex flex-row gap-2">
          <Button variant="ghost">
            <Play />
          </Button>
          <Button variant="ghost">
            <Edit />
          </Button>
          <Button variant="ghost" onClick={() => handleRemoveQuiz(id)}>
            <Trash />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardList;
