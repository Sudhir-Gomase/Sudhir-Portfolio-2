"use client";

import { useEffect } from "react";
import { registerGsapPlugins } from "@/lib/gsap";

/** Native document scroll — strip any stale Lenis classes that lock overflow. */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    registerGsapPlugins();

    const html = document.documentElement;
    const { body } = document;

    html.classList.remove("lenis", "lenis-smooth", "lenis-stopped", "lenis-scrolling");
    html.style.overflow = "";
    html.style.height = "";
    body.style.overflow = "";
    body.style.height = "";
  }, []);

  return <>{children}</>;
}
