"use client";

import { useState } from "react";
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
import CardItem from "./QuizCard";
import Result from "./Result";
import { type Quiz } from "./QuizClientComponent";

interface QuizList {
  quizLists: Quiz[];
  title: string;
  id: string;
  handleRemoveQuiz: (id: string) => void;
  setQuizLists?: React.Dispatch<React.SetStateAction<Quiz[]>>;
}
const QuizList = ({ quizLists, title, id, handleRemoveQuiz }: QuizList) => {
  const [step, setStep] = useState<number>(0);
  const options = quizLists.find((quiz) => quiz.id === id)?.options ?? [];
  const option = options[step];

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
            setItem(value);
          }}
          className="flex flex-col gap-4"
        >
          {option ? <CardItem option={option} /> : <Result options={options} />}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleNextStep}>Next</Button>
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

export default QuizList;
