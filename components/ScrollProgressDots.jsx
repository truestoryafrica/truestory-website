"use client";

import { useEffect, useState } from "react";

const sectionIds = ["home", "services", "work", "impact", "about", "team"];

export default function ScrollProgressDots() {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.querySelectorAll("[data-nav]").forEach((link) => {
      link.classList.toggle("active", link.dataset.nav === activeId);
    });
  }, [activeId]);

  return (
    <div className={`scroll-dots${activeId === "home" ? " is-hidden" : ""}`} aria-hidden="true">
      {sectionIds.map((id) => (
        <span key={id} className={id === activeId ? "active" : ""} />
      ))}
    </div>
  );
}
