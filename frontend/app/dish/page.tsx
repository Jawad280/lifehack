"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateDishForm from "@/components/CreateDishForm";
import DishTable from "@/components/DishTable";

const Page = () => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  if (isFormVisible) {
    return (
      <div className="flex flex-col p-8 items-center min-h-screen gap-6">
        <CreateDishForm setIsFormVisible={setIsFormVisible} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 items-center gap-6 flex flex-col">
      <div className="flex justify-between w-full">
        <div className="font-bold text-[28px]">Dishes</div>
        <Button onClick={() => setIsFormVisible(true)}>+ Add dish</Button>
      </div>

      <DishTable />
    </div>
  );
};

export default Page;
