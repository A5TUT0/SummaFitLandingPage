import React from "react";
import { cn } from "../../lib/utils";

export interface Iphone15ProProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Iphone15Pro({ className, children, ...props }: Iphone15ProProps) {
  return (
    <div
      className={cn(
        "relative mx-auto shrink-0 overflow-hidden rounded-[min(3rem,8vw)] border-[min(12px,1.5vw)] border-zinc-900 bg-zinc-950 shadow-2xl ring-1 ring-zinc-800/50",
        className
      )}
      style={{ aspectRatio: "400/860" }}
      {...props}
    >
      <div className="absolute top-0 inset-x-0 mx-auto w-[30%] h-[3.5%] rounded-b-3xl bg-zinc-900 z-50"></div>
      
      <div className="relative w-full h-full overflow-hidden bg-white/5">
        {children}
      </div>
    </div>
  );
}
