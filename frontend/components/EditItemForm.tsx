"use client";
import React from "react";
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
import { supabase } from "@/lib/db";

const EditItemForm = ({
  item,
  setIsFormVisible,
}: {
  item: Item;
  setIsFormVisible: (isFormVisible: boolean) => void;
}) => {
  const formSchema = z.object({
    itemName: z.string().trim().min(1, { message: "Field cannot be empty" }),
    quantityInStock: z.coerce
      .number()
      .min(0, { message: "Field cannot be empty" }),
    unit: z.enum(["kg", "g", "l", "ml", "whole", "packet", "bag"]),
    unitPrice: z.coerce.number().min(0).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      itemName: item.itemName,
      quantityInStock: item.quantityInStock,
      unit: item.unit,
      unitPrice: item.unitPrice,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      const { error } = await supabase
        .from("item")
        .update({
          name: values.itemName.toUpperCase(),
          unit: values.unit,
          unit_price: values.unitPrice,
          quantity_in_stock: values.quantityInStock,
        })
        .eq("id", item.id || "");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="p-10 flex flex-col items-center gap-6 bg-slate-200 rounded-md min-w-6 justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="itemName"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Label className="font-bold text-[16px]">Item Name</Label>
                    <Input placeholder="Enter name of item..." {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantityInStock"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Label className="font-bold text-[16px]">
                      Quantity In Stock
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter quantity in stock..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-bold text-[16px]">Unit</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="g">g</SelectItem>
                    <SelectItem value="l">l</SelectItem>
                    <SelectItem value="ml">ml</SelectItem>
                    <SelectItem value="whole">whole</SelectItem>
                    <SelectItem value="packet">packet</SelectItem>
                    <SelectItem value="bag">bag</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unitPrice"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Label className="font-bold text-[16px]">
                      Unit Price (Optional)
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter unit price..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-4">
            <Button
              className="mt-4 flex-1"
              variant="destructive"
              onClick={() => setIsFormVisible(false)}
            >
              Cancel
            </Button>

            <Button className="mt-4 flex-1" variant="default" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditItemForm;
