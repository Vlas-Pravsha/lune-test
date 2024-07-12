"use client";

import Link from "next/link";
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
import Options from "~/components/Options";
import QuizResult from "~/components/QuizResult";
import {
  initialQuizzes,
  type Quiz,
  type Option,
} from "~/components/QuizClient";
import useCountDown from "~/lib/hooks/useCountDown";
import useLocalStorage from "~/lib/hooks/useLocalStorage";

interface QuizIdProps {
  params: { id: string };
  title: string;
}

export default function QuizId({ params, title }: QuizIdProps) {
  const [step, setStep] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const { seconds, resetTimer } = useCountDown({
    initialTime: 20,
    callback: handleNextStep,
  });
  const [value] = useLocalStorage("quizList", initialQuizzes);

  const quiz: Quiz | undefined = value.find((quiz) => quiz.id === params.id);
  const options: Option[] = quiz?.options ?? [];
  const currentOption: Option | undefined = options[step];

  function handleCorrectOption(index: number) {
    if (currentOption?.correct === index) {
      setCorrect((prev) => prev + 1);
    }
  }

  function handleNextStep() {
    setStep((prev) => prev + 1);
    resetTimer();
  }

  function renderContent() {
    if (currentOption) {
      return (
        <>
          <Options
            option={currentOption}
            setCorrectOption={handleCorrectOption}
          />
        </>
      );
    }
    return <QuizResult options={options} correct={correct} />;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center justify-between">
            <CardDescription>
              Number of questions: {options.length}
            </CardDescription>
            {currentOption && seconds}
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup className="flex flex-col gap-4">
            {renderContent()}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button>Back</Button>
          </Link>
          <Button onClick={handleNextStep}>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
