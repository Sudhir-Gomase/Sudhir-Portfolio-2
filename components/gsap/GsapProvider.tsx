"use client";

import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";

export default function GsapProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGsapPlugins();
  }, []);

  useGSAP(() => {
    registerGsapPlugins();

    const refresh = () => ScrollTrigger.refresh();
    refresh();

    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return <>{children}</>;
}
