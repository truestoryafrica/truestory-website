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

    const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
    function setActive(key) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.nav === key);
      });
    }

    // Non-homepage routes (Insights, Contact, Team, ...) have no in-page
    // sections to observe, so the current route segment marks the active link.
    if (window.location.pathname !== "/") {
      setActive(window.location.pathname.split("/")[1] || "home");
      return () => window.removeEventListener("scroll", onScroll);
    }

    const sections = navLinks
      .map((link) => document.getElementById(link.dataset.nav))
      .filter(Boolean);
    if (!sections.length) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActive(mostVisible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
