import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen p-8 gap-6 flex flex-col">
      <div className="font-bold text-[28px]">Dashboard</div>

      <div>
        <div>Next Week Predictions</div>
        <Button>Predict</Button>
      </div>

      <div>Graph to show the predicted amount of item required</div>
    </div>
  );
}
