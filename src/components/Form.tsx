"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "~/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusCircleIcon, Trash, Undo2 } from "lucide-react";
import { Button } from "./ui/button";
import { type Quiz } from "./QuizClient";

const Forma = ({
  onClose,
  handleFormSubmit,
}: {
  onClose: () => void;
  handleFormSubmit: (value: Quiz) => void;
}) => {
  const optionsSheme = z.object({
    id: z.string(),
    correct: z.number(),
    variants: z.array(z.string().min(2)),
    title: z.string().min(2),
  });

  const formSchema = z.object({
    title: z.string().min(2),
    id: z.string(),
    options: z.array(optionsSheme),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      id: "",
      options: [{ id: "", title: "", variants: ["Answer 1"], correct: 0 }],
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
    handleFormSubmit(values);
    onClose();
  });

  const { fields, append, remove } = useFieldArray({
    name: "options",
    control: form.control,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="absolute top-[15%] w-full max-w-3xl rounded bg-white p-8 shadow-md">
        <Button
          className="absolute right-2 top-2"
          variant="ghost"
          onClick={onClose}
        >
          <Undo2 />
        </Button>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Quiz</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name of Quiz" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name={`options.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-lg font-semibold">
                          Question name
                        </FormLabel>
                        <div className="flex items-center gap-2">
                          <h5 className="text-lg font-semibold">
                            Delete options
                          </h5>
                          <Button
                            variant="destructive"
                            onClick={() => remove(index)}
                            size="sm"
                          >
                            <Trash />
                          </Button>
                        </div>
                      </div>
                      <FormControl>
                        <Input {...field} placeholder="Question name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`options.${index}.variants`}
                  render={({ field }) => (
                    <div>
                      {field.value.map((_: string, vIndex: number) => (
                        <FormItem key={`${index}.variants.${vIndex}`}>
                          <FormLabel>Answer {vIndex + 1}</FormLabel>
                          <div className="flex flex-row items-center justify-center gap-2">
                            <FormControl>
                              <Input
                                {...form.register(
                                  `options.${index}.variants.${vIndex}`,
                                )}
                                placeholder={`Answer ${vIndex + 1}`}
                              />
                            </FormControl>
                            <FormMessage />
                            <Button
                              type="button"
                              variant="outline"
                              className="flex gap-2"
                              onClick={(e) => {
                                console.log(e);
                              }}
                            >
                              <Trash />
                              Delete Answer
                            </Button>
                          </div>
                        </FormItem>
                      ))}
                      <Button
                        type="button"
                        variant="default"
                        className="mt-4 flex w-full gap-2"
                        onClick={() => {
                          form.setValue(`options.${index}.variants`, [
                            ...field.value,
                            `Answer ${field.value.length + 1}`,
                          ]);
                        }}
                      >
                        <PlusCircleIcon />
                        Add Answer
                      </Button>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`options.${index}.correct`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correct Answer Number</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <div className="flex items-center gap-2">
              <h5 className="text-lg font-semibold">Add options</h5>
              <Button
                variant="default"
                onClick={(event) => {
                  event.preventDefault();
                  append({
                    id: "",
                    title: "",
                    variants: ["Answer 1"],
                    correct: 0,
                  });
                }}
              >
                <PlusCircleIcon />
              </Button>
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Forma;
