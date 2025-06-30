"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface NotFoundClientProps {
  goBackText: string;
}

export function NotFoundClient({ goBackText }: NotFoundClientProps) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      size="lg"
      className="group border-2"
    >
      <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
      {goBackText}
    </Button>
  );
}