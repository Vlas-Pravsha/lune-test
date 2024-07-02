"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import QuizList from "~/components/QuizList";
import Form from "~/components/Form";

export interface QuizOption {
  title: string;
  variants: string[];
  correct: number;
  id: string;
}

export interface Quiz {
  id: string;
  title: string;
  options?: QuizOption[];
}

interface DataType {
  quizName: string;
  questionName: string;
}

const initialQuizzes: Quiz[] = [
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

export default function QuizClientComponent() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [quizLists, setQuizLists] = useState<Quiz[]>(initialQuizzes);

  const onClose = () => {
    setIsFormVisible(false);
  };

  const handleToggle = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  function handleRemoveQuiz(id: string) {
    const newOptions = quizLists.filter((option) => option.id !== id);
    setQuizLists(newOptions);
  }

  function handleFormSubmit(data: DataType) {
    console.log(data);
    const newQuiz = {
      id: crypto.randomUUID(),
      title: data.quizName,
      options: [
        {
          title: data.questionName,
          variants: [
            "Это простой HTML",
            "Это функция",
            "Это тот же HTML, но c возможностью выполнять JS-код",
          ],
          correct: 2,
          id: crypto.randomUUID(),
        },
      ],
    };

    setQuizLists([...quizLists, newQuiz]);
  }

  return (
    <main className="m-20 flex w-full flex-wrap gap-10">
      {quizLists.map((quiz) => (
        <QuizList
          setQuizLists={setQuizLists}
          quizLists={quizLists}
          title={quiz.title}
          key={quiz.id}
          id={quiz.id}
          handleRemoveQuiz={handleRemoveQuiz}
        />
      ))}

      <Button variant="ghost" onClick={handleToggle}>
        <Plus className="absolute bottom-12 right-12 h-10 w-10" />
      </Button>

      {isFormVisible && <Form onClose={onClose} onSubmit={handleFormSubmit} />}
    </main>
  );
}
