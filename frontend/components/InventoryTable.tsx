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
import EditItemForm from "./EditItemForm";
import Loading from "./Loading";

const InventoryTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [item, setItem] = useState<Item>({
    itemName: "",
    quantityInStock: 0,
    unit: "g",
  });

  async function getAllItems() {
    try {
      setIsLoading(true);
      const { data: itemData, error: itemError } = await supabase.from("item").select();
      const { data: ingredientData, error: ingredientError } = await supabase.from("ingredient").select();

      if (itemError) throw itemError;
      if (ingredientError) throw ingredientError;

      // Create a map to store the total amount for each item_id from ingredient table
      const currentStockMap: { [key: string]: number } = {};

      // Sum the amounts for each item_id from the ingredient table
      ingredientData.forEach((ingredient: { item_id: string, amount: number }) => {
        if (!currentStockMap[ingredient.item_id]) {
          currentStockMap[ingredient.item_id] = 0;
        }
        currentStockMap[ingredient.item_id] += ingredient.amount;
      });

      // Create a map to store the total amount for each item_id
      const itemAmountMap: { [key: string]: number } = {};

      // Initialize with the existing quantity in stock and add ingredient amounts
      itemData.forEach((item: { id: string, quantity_in_stock: number }) => {
        itemAmountMap[item.id] = currentStockMap[item.id] || 0;
        itemAmountMap[item.id] += item.quantity_in_stock;
      });

      // Update the itemData with the summed amounts
      const updatedItems: Item[] =
        itemData?.map((elem: any) => {
          const updatedItem: Item = {
            id: elem.id,
            itemName: elem.name,
            quantityInStock: itemAmountMap[elem.id] || 0,
            unit: elem.unit,
            unitPrice: elem.unit_price,
          };

          // Update the item quantity in the database
          supabase.from("item").update({ quantity_in_stock: updatedItem.quantityInStock }).eq("id", elem.id);

          return updatedItem;
        }) || [];

      setItems(updatedItems);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDelete(id: string) {
    try {
      const { error } = await supabase.from("item").delete().eq("id", id);
      getAllItems();
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getAllItems();
  }, [isFormVisible]);

  if (isLoading) {
    return <Loading />;
  }

  if (isFormVisible) {
    return (
      <div className="flex flex-col p-8 items-center min-h-screen gap-6">
        <EditItemForm setIsFormVisible={setIsFormVisible} item={item} />
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>A list of your items.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Quantity in Stock</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Unit Price</TableHead>
          <TableHead className="w-[150px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.itemName}</TableCell>
            <TableCell>{item.quantityInStock}</TableCell>
            <TableCell>{item.unit}</TableCell>
            <TableCell>${item.unitPrice}</TableCell>
            <TableCell className="flex items-center justify-between">
              <Pencil
                size={24}
                className="cursor-pointer"
                onClick={() => {
                  setItem(item);
                  setIsFormVisible(true);
                }}
              />
              <Trash2Icon
                size={24}
                className="cursor-pointer"
                color="red"
                onClick={() => handleDelete(item.id || "")}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InventoryTable;
