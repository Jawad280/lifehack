"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateItemForm from "@/components/CreateItemForm";
import InventoryTable from "@/components/InventoryTable";

const Page = () => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  if (isFormVisible) {
    return (
      <div className="flex flex-col p-8 items-center min-h-screen gap-6">
        <CreateItemForm setIsFormVisible={setIsFormVisible} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 items-center gap-6 flex flex-col">
      <div className="flex justify-between w-full">
        <div className="font-bold text-[28px]">Inventory</div>
        <Button onClick={() => setIsFormVisible(true)}>+ Add Item</Button>
      </div>

      <div className="w-full">
        <InventoryTable />
      </div>
    </div>
  );
};

export default Page;
