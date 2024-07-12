"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import QuizCard from "~/components/QuizCard";
import Forma from "~/components/Form";
import { Input } from "./ui/input";
import useLocalStorage from "~/lib/hooks/useLocalStorage";

export type Option = {
  id: string;
  correct: number;
  title: string;
  variants: string[];
};

export interface Quiz {
  id: string;
  title: string;
  options?: Option[];
}

export const initialQuizzes: Quiz[] = [
  {
    id: "1",
    title: "vue quiz",
    options: [
      {
        title: "Кто создал HTML?",
        variants: [
          "Это простой HTML",
          "Это функция",
          "Это тот же HTML, но c возможностью выполнять JS-код",
        ],
        correct: 2,
        id: "1-1",
      },
    ],
  },
  {
    id: "2",
    title: "react quiz",
    options: [
      {
        title: "Кто создал CSS?",
        variants: [
          "Это простой HTML",
          "Это функция",
          "Это тот же HTML, но c возможностью выполнять JS-код",
        ],
        correct: 2,
        id: "2-1",
      },
      {
        title: "Кто создал CSSasa?",
        variants: [
          "Это простой HTML",
          "Это функция",
          "Это тот же HTML, но с возможностью выполнять JS-код",
        ],
        correct: 2,
        id: "2-2",
      },
    ],
  },
];

export default function QuizClient() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [value, setValue] = useLocalStorage<Quiz[]>("quizList", initialQuizzes);
  const onClose = () => {
    setIsFormVisible(false);
  };

  const handleToggle = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  function handleRemoveQuiz(id: string) {
    const newOptions = value.filter((option) => option.id !== id);
    setValue(newOptions);
  }

  function handleFormSubmit(data: Quiz) {
    const newQuiz: Quiz = {
      id: crypto.randomUUID(),
      title: data.title,
      options: data.options!.map((option) => ({
        id: crypto.randomUUID(),
        title: option.title,
        variants: option.variants,
        correct: option.correct,
      })),
    };
    setValue((prevQuizLists) => [...prevQuizLists, newQuiz]);
  }

  function getSearchValue(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  const filteredItems = value.filter((list) =>
    list.title.toLowerCase().includes(searchValue.trim().toLowerCase()),
  );

  return (
    <main className="m-10 flex flex-wrap gap-10">
      <Input
        type="text"
        placeholder="Search by title"
        value={searchValue}
        onChange={getSearchValue}
      />

      {filteredItems.map((quiz) => (
        <QuizCard quiz={quiz} key={quiz.id} onRemove={handleRemoveQuiz} />
      ))}

      <Button variant="ghost" onClick={handleToggle}>
        <Plus className="absolute bottom-12 right-12 h-10 w-10" />
      </Button>

      {isFormVisible && (
        <Forma onClose={onClose} handleFormSubmit={handleFormSubmit} />
      )}
    </main>
  );
}
