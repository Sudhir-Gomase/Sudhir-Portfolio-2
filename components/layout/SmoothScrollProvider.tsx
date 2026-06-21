"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { ScrollTrigger, registerGsapPlugins } from "@/lib/gsap";

function ScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });

  return null;
}

function useNativeScroll() {
  const [native, setNative] = useState(true);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const narrow = window.matchMedia("(max-width: 1023px)");

    const update = () => {
      setNative(coarse.matches || narrow.matches);
    };

    update();
    coarse.addEventListener("change", update);
    narrow.addEventListener("change", update);
    return () => {
      coarse.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
    };
  }, []);

  return native;
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const nativeScroll = useNativeScroll();

  useEffect(() => {
    registerGsapPlugins();
  }, []);

  if (nativeScroll) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.14,
        duration: 0.75,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.85,
        touchMultiplier: 2,
        syncTouch: true,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
