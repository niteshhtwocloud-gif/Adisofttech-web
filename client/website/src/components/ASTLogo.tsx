"use client";

import React from "react";

interface ASTLogoProps {
  className?: string;
  height?: number;
  width?: number;
}

/**
 * Component: ASTLogo (/components/ASTLogo.tsx)
 * 
 * Renders the authentic high-resolution AST brand logo provided by the client:
 * - Sharp orange 'A' apex and legs
 * - Flowing royal blue wave crossing through 'A' and connecting into 'S'
 * - Interconnected royal blue 'S' and 'T' with aerodynamic flourish
 * - Zero "ADISOFTTECH" text
 */
export default function ASTLogo({
  className = "",
  height = 42,
  width,
}: ASTLogoProps) {
  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
      style={{ height: `${height}px` }}
    >
      <img
        src="/images/ast-logo.png"
        alt="AST Logo"
        style={{
          height: `${height}px`,
          width: width ? `${width}px` : "auto",
        }}
        className="h-full w-auto object-contain mix-blend-multiply transition-transform duration-200"
      />
    </div>
  );
}
