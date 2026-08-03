"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { insightCategories } from "@/lib/insightCategories";

function formatInsightDate(date) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function InsightMeta({ insight }) {
  const items = [insight.author, formatInsightDate(insight.date), insight.readingTime].filter(Boolean);
  if (!items.length) return null;
  return (
    <div className="insight-meta">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export default function InsightsBrowser({ insights }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  // Picks up a shared/bookmarked link like /insights?category=Photography on
  // load. Only ever read once on mount - the category buttons own state after
  // that, and push their own changes back into the URL themselves.
  useEffect(() => {
    const fromUrl = searchParams.get("category");
    if (fromUrl) setCategory(fromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function selectCategory(next) {
    setCategory(next);
    const params = new URLSearchParams(searchParams.toString());
    if (next === "All") params.delete("category");
    else params.set("category", next);
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }

  const categories = useMemo(() => {
    const used = insights.map((insight) => insight.category).filter(Boolean);
    const unique = Array.from(new Set([...insightCategories, ...used]));
    return ["All", ...unique];
  }, [insights]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return insights.filter((insight) => {
      const matchesCategory = category === "All" || insight.category === category;
      const matchesQuery =
        !q || insight.title.toLowerCase().includes(q) || insight.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [insights, query, category]);

  return (
    <div className="insights-browser">
      <div className="insights-browser-controls">
        <div className="insights-category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={cat === category ? "active" : ""}
              onClick={() => selectCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <label className="insights-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            placeholder="Search insights..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search insights"
          />
        </label>
      </div>

      {filtered.length > 0 ? (
        <div className="story-grid">
          {filtered.map((insight) => (
            <Link className="story-card" href={`/insights/${insight.slug}`} key={insight.slug}>
              <div className="story-image">
                <Image src={insight.image} alt={insight.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
                <span>{insight.category}</span>
              </div>
              <InsightMeta insight={insight} />
              <h2>{insight.title}</h2>
              <p>{insight.excerpt}</p>
              <strong className="link-arrow">Read Insight<span aria-hidden="true">→</span></strong>
            </Link>
          ))}
        </div>
      ) : (
        <p className="hero-lede">No insights match that search yet.</p>
      )}
    </div>
  );
}
