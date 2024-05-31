"use client";
import React, { useState } from "react";

const Page = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    console.log(file);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Track Daily Production</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Upload Past Sales Records</h2>
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
    </div>
  );
};

export default Page;