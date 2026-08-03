"use client";

import { useEffect, useState } from "react";

export default function TestimonialCarousel({ testimonials }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (testimonials.length < 2 || paused) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length, paused]);

  if (!testimonials.length) return null;

  const testimonial = testimonials[index];

  function goTo(next) {
    setIndex((next + testimonials.length) % testimonials.length);
  }

  return (
    <div
      className="testimonial-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <article className="testimonial-card" key={testimonial.organization}>
        <span className="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>
        <p>{testimonial.quote}</p>
        <div className="testimonial-attribution">
          <strong>{testimonial.role}</strong>
          <span>{testimonial.organization}</span>
        </div>
      </article>
      {testimonials.length > 1 && (
        <div className="testimonial-controls">
          <button type="button" aria-label="Previous testimonial" onClick={() => goTo(index - 1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="testimonial-dots">
            {testimonials.map((item, dotIndex) => (
              <button
                key={item.organization}
                type="button"
                aria-label={`Go to testimonial ${dotIndex + 1}`}
                aria-current={dotIndex === index}
                className={dotIndex === index ? "active" : ""}
                onClick={() => goTo(dotIndex)}
              />
            ))}
          </div>
          <button type="button" aria-label="Next testimonial" onClick={() => goTo(index + 1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
