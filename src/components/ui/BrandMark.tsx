/** Paths of the built-in mark, drawn in a 32×32 box. Reused inside other SVGs. */
export function BrandMarkPaths() {
  return (
    <>
      <path d="M3 3h12v26H3z" fill="currentColor" />
      <path d="M19 3h10v4h-6v18h6v4H19z" fill="currentColor" />
      <circle cx="26" cy="16" r="2.4" fill="currentColor" />
    </>
  );
}

/** Built-in fallback mark: a split square — one solid half, one open bracket. */
export function BrandMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <BrandMarkPaths />
    </svg>
  );
}

/** The small two-line icon used on the brand plate. */
export function TwoLines({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 5.5h12M2 10.5h8" strokeLinecap="round" />
    </svg>
  );
}
