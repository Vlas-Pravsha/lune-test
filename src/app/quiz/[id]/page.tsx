import React from "react";
import QuizCard from "~/components/QuizCard";

export default function QuizId({ params }: { params: { id: string } }) {
  return <div>Params {params.id}</div>;
}
