"use client";

import { useEffect } from "react";

export default function HeaderScrollEffect() {
  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return undefined;

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
