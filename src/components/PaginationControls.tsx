import Link from "next/link";
import React from "react";

type PaginationControlsProps = {
  currentPage: number;
  previousHref: string;
  nextHref: string;
};

export default function PaginationControls({
  currentPage,
  previousHref,
  nextHref,
}: PaginationControlsProps) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <Link href={previousHref} className="text-blue-300 no-underline hover:text-blue-200">
        ← Previous
      </Link>
      <span>Page {currentPage}</span>
      <Link href={nextHref} className="text-blue-300 no-underline hover:text-blue-200">
        Next →
      </Link>
    </div>
  );
}
