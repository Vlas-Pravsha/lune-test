"use client";

import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Edit, Play, Trash } from "lucide-react";
import { type Quiz } from "./QuizClient";

interface QuizCardProps {
  quiz: Quiz;
  onRemove: (id: string) => void;
}

type ActionButtonProps = {
  href?: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({ href, icon, onClick }) => (
  <Button variant="ghost" onClick={onClick}>
    {href ? <Link href={href}>{icon}</Link> : icon}
  </Button>
);

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onRemove }) => {
  const { id, title, options } = quiz;

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-sm font-semibold">
          Number of questions: {options!.length}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="flex flex-row gap-2">
          <ActionButton href={`/quiz/${id}`} icon={<Play />} />
          <ActionButton href={`/quiz/edit/${id}`} icon={<Edit />} />
          <ActionButton icon={<Trash />} onClick={() => onRemove(id)} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
