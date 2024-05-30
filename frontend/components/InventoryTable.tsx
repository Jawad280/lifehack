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

const InventoryTable = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [item, setItem] = useState<Item>({
    itemName: "",
    quantityInStock: 0,
    unit: "g",
  });

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
  }, []);

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
          <TableHead>Unit</TableHead>
          <TableHead>Unit Price</TableHead>
          <TableHead>Quantity in Stock</TableHead>
          <TableHead className="w-[150px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.itemName}</TableCell>
            <TableCell>{item.unit}</TableCell>
            <TableCell>${item.unitPrice}</TableCell>
            <TableCell>{item.quantityInStock}</TableCell>
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
