"use client";

import { truncate } from "@/lib/formatters";
import { Link } from "@heroui/link";
import { useEffect } from "react";

export default function Error({ error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <h2 className="text-xl font-bold">Something went wrong!</h2>
        <p className="text-danger">
          {typeof error === "string"
            ? truncate(error, 150)
            : truncate(error.message, 150)}
        </p>
        <Link href="/">Go Home</Link>
      </div>
    </div>
  );
}
