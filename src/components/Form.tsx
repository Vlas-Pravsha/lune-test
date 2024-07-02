"use client";

import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusCircleIcon, Undo2 } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface DataType {
  quizName: string;
  questionName: string;
}

const Form = ({
  onClose,
  onSubmit: handleFormSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: DataType) => void;
}) => {
  const [fields, setFields] = useState([{ id: 0, name: "variant1" }]);

  const addField = (event: React.FormEvent) => {
    event.preventDefault();
    setFields([
      ...fields,
      { id: fields.length + 1, name: `variant${fields.length + 1}` },
    ]);
  };

  const formSchema = z.object({
    quizName: z.string().min(2, {
      message: "Quiz name must be at least 2 characters.",
    }),
    questionName: z.string().min(2, {
      message: "Question name must be at least 2 characters.",
    }),
  });

  const form = useForm<DataType>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: DataType) {
    handleFormSubmit(values);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded bg-white p-8 shadow-md">
        <Button
          className="absolute right-2 top-2"
          variant="ghost"
          onClick={onClose}
        >
          <Undo2 />
        </Button>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="quizName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Quiz</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Quiz Name"
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="questionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Question</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Question Name"
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-2">
              <h5 className="text-lg font-semibold">Add variant</h5>
              <Button variant="default" onClick={(e) => addField(e)}>
                <PlusCircleIcon />
              </Button>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Form;
