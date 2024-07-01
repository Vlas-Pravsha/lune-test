"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import CardList from "~/components/CardList";
import { Button } from "~/components/ui/button";
import Form from "~/components/Form";

export default function HomePage() {
  const [options, setOptions] = useState([
    {
      title: "React - это ... ?",
      variants: ["библиотека", "фреймворк", "приложение"],
      correct: 0,
      id: "1",
    },
    {
      title: "Компонент - это ... ",
      variants: [
        "приложение",
        "часть приложения или страницы",
        "то, что я не знаю что такое",
      ],
      correct: 1,
      id: "2",
    },
    {
      title: "Что такое JSX?",
      variants: [
        "Это простой HTML",
        "Это функция",
        "Это тот же HTML, но с возможностью выполнять JS-код",
      ],
      correct: 2,
      id: "3",
    },
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [quizLists, setQuizLists] = useState([
    {
      id: "1",
      title: "Quiz 1",
    },
    {
      id: "2",
      title: "Quiz 2",
    },
  ]);

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

  return (
    <main className="m-20 flex w-full flex-wrap gap-10">
      {quizLists.map((quiz) => (
        <CardList
          setOptions={setOptions}
          options={options}
          title={quiz.title}
          key={quiz.id}
          id={quiz.id}
          handleRemoveQuiz={handleRemoveQuiz}
        />
      ))}
      <Button variant="ghost" onClick={handleToggle}>
        <Plus className="absolute bottom-12 right-12 h-10 w-10" />
      </Button>
      {isFormVisible && <Form onClose={onClose} />}
    </main>
  );
}
