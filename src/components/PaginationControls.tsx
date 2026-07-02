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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "1.5rem",
      }}
    >
      <Link href={previousHref} style={{ color: "#93c5fd", textDecoration: "none" }}>
        ← Previous
      </Link>
      <span>Page {currentPage}</span>
      <Link href={nextHref} style={{ color: "#93c5fd", textDecoration: "none" }}>
        Next →
      </Link>
    </div>
  );
}
