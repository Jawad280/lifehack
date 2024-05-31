"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/db";
import { Pencil, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import CreateDishForm from "./CreateDishForm";
import EditDishForm from "./EditDishForm";

const DishTable = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [dish, setDish] = useState<Dish>({
    dishName: "",
    ingredients: [],
    price: 0.0,
  });

  async function getAllDishes() {
    try {
      // Fetch all dishes
      const { data: dishData, error: dishError } = await supabase
        .from("dish")
        .select();

      if (dishError) {
        throw dishError;
      }

      // If there are dishes, fetch their ingredients
      if (dishData && dishData.length > 0) {
        // Get all dish IDs
        const dishIds = dishData.map((dish: { id: number }) => dish.id);

        // Fetch ingredients for all dishes
        const { data: ingredientData, error: ingredientError } = await supabase
          .from("ingredient")
          .select("*")
          .in("dish_id", dishIds);

        if (ingredientError) {
          throw ingredientError;
        }

        // Combine dishes and their ingredients
        const allDishes: Dish[] = dishData.map(
          (dish: { id: string; dish_name: string; price: number }) => {
            const currDish: Dish = {
              id: dish.id,
              dishName: dish.dish_name,
              price: dish.price,
              ingredients: ingredientData
                ? ingredientData.filter(
                    (ingredient: { dish_id: string }) =>
                      ingredient.dish_id === dish.id
                  )
                : [],
            };

            return currDish;
          }
        );

        setDishes(allDishes);
      } else {
        setDishes([]);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDelete(id: string) {
    try {
      const { error } = await supabase.from("dish").delete().eq("id", id);
      getAllDishes();
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getAllDishes();
  }, [isFormVisible]);

  if (isFormVisible) {
    return (
      <div className="flex flex-col p-8 items-center min-h-screen gap-6">
        <EditDishForm setIsFormVisible={setIsFormVisible} dish={dish} />
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>A list of your dishes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Dish</TableHead>
          <TableHead>Price</TableHead>

          <TableHead className="w-[150px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dishes.map((d) => (
          <TableRow key={d.id}>
            <TableCell className="font-medium">{d.dishName}</TableCell>
            <TableCell>${d.price}</TableCell>

            <TableCell className="flex items-center justify-between">
              <Pencil
                size={24}
                className="cursor-pointer"
                onClick={() => {
                  setDish(d);
                  setIsFormVisible(true);
                }}
              />
              <Trash2Icon
                size={24}
                className="cursor-pointer"
                color="red"
                onClick={() => handleDelete(d.id || "")}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DishTable;
