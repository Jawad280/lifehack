"use client";
import DailyLogForm from "@/components/DailyLogForm";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Papa from "papaparse";
import { supabase } from "@/lib/db"; 

const Page = () => {
  const [file, setFile] = useState(null);
  const [isSpecialOccasion, setIsSpecialOccasion] = useState<boolean>(false);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        if (results.errors.length > 0) {
          console.error("Errors in parsing CSV file:", results.errors);
          return;
        }

        const data = results.data;
        console.log("Parsed CSV data:", data);

        try {
          const { error } = await supabase.from("daily_sales").insert(data);
          if (error) {
            console.error("Error inserting data:", error);
          } else {
            console.log("Data inserted successfully");
          }
        } catch (error) {
          console.error("Error during data insertion:", error);
        }
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
      },
    });
  };


  return (
    <div className="min-h-screen p-8 flex flex-col items-center bg-gray-100 gap-6">
      <h1 className="text-2xl font-bold mb-6">Track Daily Production</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">
          Upload Past Sales Records
        </h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-4 p-2 border rounded-md w-full"
        />
        <button
          onClick={handleFileUpload}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Upload File
        </button>
  
      </div>

      <div className="bg-slate-200 p-8 rounded-md shadow-sm">
        <div className="flex justify-between items-center">
          <div className="font-bold text-[20px]">Daily Log Form</div>

          <div className="flex items-center space-x-2 py-4">
            <Checkbox
              checked={isSpecialOccasion}
              onCheckedChange={() => setIsSpecialOccasion(!isSpecialOccasion)}
            />
            <Label>Special Occasion</Label>
          </div>
        </div>

        <DailyLogForm isSpecialOccasion={isSpecialOccasion} />
      </div>
    </div>
  );
};
export default Page;