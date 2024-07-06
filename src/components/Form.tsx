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
import { Delete, PlusCircleIcon, Undo2 } from "lucide-react";
import { Button } from "./ui/button";

const Forma = ({ onClose }: { onClose: () => void }) => {
  const optionsSheme = z.object({
    id: z.string(),
    correct: z.number(),
    variants: z.array(z.string()),
    title: z.string(),
  });

  const formSchema = z.object({
    title: z.string(),
    id: z.string(),
    options: z.array(optionsSheme),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      id: "",
      options: [{ id: "", title: "", variants: ["1"], correct: 0 }],
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
  });

  const { fields, append, remove } = useFieldArray({
    name: "options",
    control: form.control,
  });

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
                      <FormLabel>Question name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Question name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {field.variants.map((variant, index) => {
                  return (
                    <FormItem key={`${variant} ${index}`}>
                      <FormLabel>Answer</FormLabel>
                      <FormControl>
                        <Input placeholder="Answer" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                })}
              </div>
            ))}

            <div className="flex items-center gap-2">
              <h5 className="text-lg font-semibold">Add options</h5>
              <Button
                variant="default"
                onClick={() =>
                  append({
                    id: "",
                    title: "",
                    variants: [],
                    correct: 0,
                  })
                }
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
