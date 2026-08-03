"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function EventGallery({ event }) {
  const [openIndex, setOpenIndex] = useState(null);
  const preview = event.images.slice(0, 4);
  const remaining = event.images.length - preview.length;

  function go(delta) {
    setOpenIndex((current) => (current + delta + event.images.length) % event.images.length);
  }

  return (
    <div className="event-gallery">
      <div className="event-gallery-header">
        <h3>{event.name}</h3>
        <p>{event.client}</p>
        {event.description && <p className="event-gallery-description">{event.description}</p>}
        {event.videoUrl && (
          <Link className="link-arrow event-gallery-video-link" href={event.videoUrl} target="_blank" rel="noopener noreferrer">
            Watch Event Video<span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
      <div className="event-gallery-grid">
        {preview.map((image, index) => (
          <button
            type="button"
            key={image.src}
            className="event-gallery-thumb"
            onClick={() => setOpenIndex(index)}
            aria-label={`View photo: ${image.alt}`}
          >
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 50vw, 25vw" />
            {index === preview.length - 1 && remaining > 0 && (
              <span className="event-gallery-more">View {remaining} more →</span>
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div className="event-lightbox" role="dialog" aria-modal="true" onClick={() => setOpenIndex(null)}>
          <button type="button" className="event-lightbox-close" aria-label="Close gallery" onClick={() => setOpenIndex(null)}>
            ×
          </button>
          <button
            type="button"
            className="event-lightbox-nav prev"
            aria-label="Previous photo"
            onClick={(clickEvent) => {
              clickEvent.stopPropagation();
              go(-1);
            }}
          >
            ‹
          </button>
          <div className="event-lightbox-image" onClick={(clickEvent) => clickEvent.stopPropagation()}>
            <Image
              src={event.images[openIndex].src}
              alt={event.images[openIndex].alt}
              fill
              sizes="90vw"
            />
          </div>
          <button
            type="button"
            className="event-lightbox-nav next"
            aria-label="Next photo"
            onClick={(clickEvent) => {
              clickEvent.stopPropagation();
              go(1);
            }}
          >
            ›
          </button>
          <p className="event-lightbox-counter">
            {openIndex + 1} / {event.images.length}
          </p>
        </div>
      )}
    </div>
  );
}
