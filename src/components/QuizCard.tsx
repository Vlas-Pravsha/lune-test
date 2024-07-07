"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
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
import Result from "./Result";
import { type Quiz } from "./QuizClientComponent";
import { Label } from "~/components/ui/label";

interface QuizCardProps {
  quizLists: Quiz[];
  title: string;
  id: string;
  handleRemoveQuiz: (id: string) => void;
  setQuizLists?: React.Dispatch<React.SetStateAction<Quiz[]>>;
}

const QuizCard: React.FC<QuizCardProps> = ({
  quizLists,
  title,
  id,
  handleRemoveQuiz,
}) => {
  const [step, setStep] = useState<number>(0);
  const { setItem } = useLocalStorage("selectedOption");
  const [correct, setCorrect] = useState<number>(0);
  const options = quizLists.find((quiz) => quiz.id === id)?.options ?? [];
  const option = options[step];

  function setCorrectOption(index: number) {
    if (option?.correct === index) {
      setCorrect(correct + 1);
    }
  }

  function handleNextStep() {
    setStep(step + 1);
  }

  return (
    <Card className="w-[550px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Number of questions: {options.length}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          onValueChange={(value) => {
            setItem(value);
          }}
          className="flex flex-col gap-4"
        >
          {option ? (
            <>
              <h2>{option.title}</h2>
              {option.variants.map((variant, index) => {
                const id = `${variant}-${index}`;
                return (
                  <div
                    className="flex items-center space-x-2"
                    key={variant}
                    onClick={() => setCorrectOption(index)}
                  >
                    <RadioGroupItem value={variant} id={id} />
                    <Label htmlFor={id}>{variant}</Label>
                  </div>
                );
              })}
            </>
          ) : (
            <Result options={options} correct={correct} />
          )}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleNextStep} disabled={!option}>
          Next
        </Button>
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

export default QuizCard;
