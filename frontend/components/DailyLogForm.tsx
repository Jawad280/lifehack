"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { supabase } from "@/lib/db";

const DailyLogForm = ({
  isSpecialOccasion,
}: {
  isSpecialOccasion: boolean;
}) => {
  const [dishes, setDishes] = useState<any>([]);

  async function getAllDishes() {
    try {
      const { data: dishData, error: dishError } = await supabase
        .from("dish")
        .select();

      if (dishError) {
        throw dishError;
      }

      setDishes(dishData);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getAllDishes();
  }, []);

  const dailySaleSchema = z.object({
    date: z.string().date(),
    special_occasion: z.boolean(),
    dish_name: z.string(),
    price: z.coerce.number(),
    units_sold: z.coerce.number(),
    notes: z.string().optional(),
  });

  const formSchema = z.object({
    dailySales: z.array(dailySaleSchema),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      dailySales: [],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "dailySales",
  });

  useEffect(() => {
    if (dishes.length > 0 && fields.length === 0) {
      dishes.forEach((dish: any) => {
        append({
          date: new Date().toISOString().split("T")[0],
          special_occasion: isSpecialOccasion,
          dish_name: dish.dish_name,
          price: dish.price,
          notes: "",
          units_sold: 0,
        });
      });
    }
  }, [dishes, fields, append]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data, error } = await supabase
        .from("daily_sales")
        .upsert(values.dailySales)
        .select();

      if (error) {
        throw error;
      }

      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full"
      >
        <div className="flex flex-col gap-6 w-full mb-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 rounded-md bg-white flex gap-6 shadow-sm relative items-center justify-between"
            >
              <Label className="font-bold text-[16px] flex-1">
                {field.dish_name}
              </Label>

              <div className="flex gap-4 flex-1">
                <FormField
                  control={form.control}
                  name={`dailySales.${index}.units_sold`}
                  render={({ field }) => (
                    <FormItem className="mb-4 flex-1">
                      <FormControl>
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold text-[16px]">
                            Units Sold
                          </Label>
                          <Input type="number" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`dailySales.${index}.notes`}
                  render={({ field }) => (
                    <FormItem className="mb-4 flex-1">
                      <FormControl>
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold text-[16px]">Notes</Label>
                          <Input
                            type="text"
                            placeholder="Enter notes..."
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <Button type="submit" className="flex-1">
          Submit Day Log
        </Button>
      </form>
    </Form>
  );
};

export default DailyLogForm;
