"use client";

import React from "react";
import GameLibrary from "@/components/GameLibrary";

type LibrarySidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  apiKey?: string;
};

export default function LibrarySidebar({
  isOpen,
  onClose,
  apiKey,
}: LibrarySidebarProps) {
  return (
    <aside
      className={`fixed top-0 left-0 pt-20 z-20 h-full w-80 max-w-[85vw] border-r border-gray-800 bg-gray-950/95 p-4 shadow-2xl backdrop-blur transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >

      <GameLibrary apiKey={apiKey} />
    </aside>
  );
}
