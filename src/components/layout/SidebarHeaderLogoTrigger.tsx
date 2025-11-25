"use client";

import * as React from "react";
import { useSidebar, SidebarTrigger } from "@/components/ui/sidebar";

export function SidebarHeaderLogoTrigger() {
  const { open, toggleSidebar } = useSidebar();
  const [hovered, setHovered] = React.useState(false);

  if (open) {
    // Sidebar aberto: logo à esquerda, trigger à direita
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <img
          src="/logo_corsan-v2.svg"
          alt="Logo Corsan"
          className="h-8 w-auto object-contain"
          draggable="false"
        />
        <SidebarTrigger className="cursor-pointer"/>
      </div>
    );
  }

  // Sidebar fechado: só logo, hover vira trigger
  return (
    <div
      className="flex items-center justify-center px-2 py-2 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={toggleSidebar}
      tabIndex={0}
      role="button"
      aria-label="Abrir menu lateral"
    >
      {hovered ? (
        <SidebarTrigger className="cursor-pointer"/>
      ) : (
        <img
          src="/logo_corsan-v2.svg"
          alt="Logo Corsan"
          className="h-8 w-auto object-contain"
          draggable="false"
        />
      )}
    </div>
  );
}
