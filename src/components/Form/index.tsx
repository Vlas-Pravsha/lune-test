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
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const Form = ({ onClose }: { onClose: () => void }) => {
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
    ...fields.reduce((acc: Record<string, z.ZodString>, field) => {
      acc[field.name] = z.string().min(2, {
        message: `${field.name} must be at least 2 characters.`,
      });
      return acc;
    }, {}),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                    <Input placeholder="Quiz Name" {...field} />
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
                    <Input placeholder="Question Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {fields.map((field) => (
              <FormField
                key={field.id}
                control={form.control}
                name={field.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variant</FormLabel>
                    <FormControl>
                      <div className="flex w-full flex-row items-center gap-2">
                        <Input placeholder="Answer" {...field} />
                        <h2 className="font-semibold">Correct?</h2>
                        <Checkbox />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
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
