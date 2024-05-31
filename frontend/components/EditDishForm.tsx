"use client";
import React, { useState, useEffect } from "react";
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
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { supabase } from "@/lib/db";
import { CircleX } from "lucide-react";

const EditDishForm = ({
  setIsFormVisible,
  dish,
}: {
  setIsFormVisible: (isFormVisible: boolean) => void;
  dish: Dish;
}) => {
  const [items, setItems] = useState<Item[]>([]);

  console.log(dish);

  async function getAllItems() {
    try {
      const { data, error } = await supabase.from("item").select();

      const allItems: Item[] =
        data?.map((elem, index) => {
          const currItem: Item = {
            id: elem.id,
            itemName: elem.name,
            quantityInStock: elem.quantity_in_stock,
            unit: elem.unit,
            unitPrice: elem.unit_price,
          };

          return currItem;
        }) || [];

      setItems(allItems);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getAllItems();
  }, []);

  // Define the Ingredient schema
  const ingredientSchema = z.object({
    itemId: z.string(),
    amount: z.coerce.number().min(0, { message: "Amount cannot be negative" }),
  });

  // Define the Dish schema
  const formSchema = z.object({
    dishName: z.string().trim().min(1, { message: "Field cannot be empty" }),
    price: z.coerce.number().min(0, { message: "Price cannot be negative" }),
    ingredients: z
      .array(ingredientSchema)
      .min(1, { message: "At least one ingredient is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      dishName: dish.dishName,
      price: dish.price,
      ingredients: dish.ingredients.map((ing) => ({
        itemId: ing.item_id || "",
        amount: ing.amount,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const handleAddIngredient = () => {
    if (items.length > 0) {
      append({ itemId: items[0].id || "", amount: 0 });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      // Update dish into 'dish' table
      const { error: dishError } = await supabase
        .from("dish")
        .update({
          dish_name: values.dishName,
          price: values.price,
        })
        .eq("id", dish.id || "");

      if (dishError) {
        throw dishError;
      }

      const ingredientInserts = values.ingredients.map((ingredient) => ({
        dish_id: dish.id,
        item_id: ingredient.itemId,
        amount: ingredient.amount,
      }));

      // Delete existing ingredients for the dish
      const { error: deleteError } = await supabase
        .from("ingredient")
        .delete()
        .eq("dish_id", dish.id);

      if (deleteError) {
        throw deleteError;
      }

      const { error: ingredientError } = await supabase
        .from("ingredient")
        .insert(ingredientInserts);

      if (ingredientError) {
        throw ingredientError;
      }
    } catch (e) {
      console.error(e);
    }

    setIsFormVisible(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-slate-200 p-10 rounded-md shadow-sm flex flex-col"
      >
        <FormField
          control={form.control}
          name="dishName"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <div className="flex flex-col gap-2">
                  <Label className="font-bold text-[16px]">Dish Name</Label>
                  <Input placeholder="Enter name of dish..." {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <div className="flex flex-col gap-2">
                  <Label className="font-bold text-[16px]">Price</Label>
                  <Input
                    type="number"
                    placeholder="Enter price..."
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-6 w-fit mb-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 rounded-md bg-white flex flex-col gap-6 shadow-sm relative"
            >
              <div className="absolute top-2 right-2 cursor-pointer">
                <CircleX
                  size={28}
                  color="red"
                  onClick={() => index > 0 && remove(index)}
                />
              </div>

              <FormField
                control={form.control}
                name={`ingredients.${index}.itemId`}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-bold text-[16px]">
                      Ingredient
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ingredient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {items.map((item) => (
                          <SelectItem key={item.id} value={item.id || ""}>
                            {item.itemName} (in {item.unit})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`ingredients.${index}.amount`}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold text-[16px]">Amount</Label>
                        <Input
                          type="number"
                          placeholder="Enter amount..."
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <Button onClick={handleAddIngredient} variant={"add"} type="button">
          Add ingredient
        </Button>

        <div className="flex justify-between gap-6 mt-6">
          <Button
            variant={"destructive"}
            onClick={() => setIsFormVisible(false)}
            className="flex-1"
          >
            Cancel
          </Button>

          <Button type="submit" className="flex-1">
            Update Dish
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditDishForm;
