"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const PredictionPeriod = ({
  setIsDataVisible,
  period,
  setPeriod,
}: {
  setIsDataVisible: (isDataVisible: boolean) => void;
  period: string;
  setPeriod: (period: string) => void;
}) => {
  const formSchema = z.object({
    period: z.enum(["day", "range", "month"]),
    day: z.string().date().optional(),
    range: z
      .object({
        start: z.string().optional(),
        end: z.string().optional(),
      })
      .optional(),
    month: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      period: "day",
      day: new Date().toISOString().split("T")[0],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsDataVisible(true);
  }

  return (
    <div className="p-10 flex flex-col items-center gap-6 bg-lime-200 rounded-md min-w-6 justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-bold text-[16px]">Period</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setPeriod(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period for prediction" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="range">Range</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {period === "day" && (
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold text-[16px]">Date</Label>
                      <Input type="date" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {period === "range" && (
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="range.start"
                render={({ field }) => (
                  <FormItem className="mb-4 flex-1">
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold text-[16px]">
                          Start Date
                        </Label>
                        <Input type="date" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="range.end"
                render={({ field }) => (
                  <FormItem className="mb-4 flex-1">
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold text-[16px]">
                          End Date
                        </Label>
                        <Input type="date" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {period === "month" && (
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold text-[16px]">Month</Label>
                      <Input type="month" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button className="mt-4 flex-1" variant="default" type="submit">
            &gt; Generate Predictions
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PredictionPeriod;
