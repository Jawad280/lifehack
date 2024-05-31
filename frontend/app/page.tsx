"use client";
import { useState } from "react";
import PredictionPeriod from "@/components/PredictionPeriod";
import ResultCard from "@/components/ResultCard";
import { XCircle } from "lucide-react";

export default function Home() {
  const [isDataVisible, setIsDataVisible] = useState<boolean>(false);
  const [period, setPeriod] = useState<string>("day");

  return (
    <div className="min-h-screen p-8 gap-6 flex flex-col">
      <div className="flex justify-between">
        <div className="font-bold text-[28px]">Dashboard</div>
        <div className="font-bold text-[20px]">Saturday, 1 June 2024</div>
      </div>

      <div>
        <PredictionPeriod
          setIsDataVisible={setIsDataVisible}
          period={period}
          setPeriod={setPeriod}
        />
      </div>

      {isDataVisible && (
        <div>
          <XCircle onClick={() => setIsDataVisible(false)} />
          <ResultCard type={period} />
        </div>
      )}
    </div>
  );
}
