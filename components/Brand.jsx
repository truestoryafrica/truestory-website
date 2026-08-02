export default function Brand({ size = 30, iconOnly = false }) {
  const mark = (
    <svg className="brand-mark" aria-hidden="true" width={size} height={size} viewBox="14 10 90 92" fill="none">
      <polyline points="19,35 19,15 40,15" stroke="currentColor" strokeWidth="3.8" fill="none" />
      <polyline points="78,15 99,15 99,35" stroke="currentColor" strokeWidth="3.8" fill="none" />
      <polyline points="19,77 19,97 40,97" stroke="currentColor" strokeWidth="3.8" fill="none" />
      <polyline points="78,97 99,97 99,77" stroke="currentColor" strokeWidth="3.8" fill="none" />
      <circle cx="59" cy="56" r="11" fill="#CC1520" />
    </svg>
  );

  if (iconOnly) return mark;

  return (
    <span className="brand">
      {mark}
      <span className="brand-text">
        <strong>TRUESTORY<span>.</span></strong>
        <small>AFRICA</small>
      </span>
    </span>
  );
}
