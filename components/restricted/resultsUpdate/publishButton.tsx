"use client";
import { useState } from "react";
import { publishResults } from "@/utils/adminUpdates/publishResults";
import { toast } from "sonner";
import { BookCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function PublishButton() {
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    setIsPending(true);
    const result = await publishResults();
    setIsPending(false);

    if (result.success) {
      toast.success("Results published to the public site");
    }
  }

  return (
    <div>
        <Button 
            className="justify-right px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" 
            onClick={handleClick} 
            disabled={isPending}>
        {isPending ? "Publishing..." : "Publish Results"}
        <BookCheck size={16} color="#ffffff"  />
        </Button>
    </div>
  );
}
