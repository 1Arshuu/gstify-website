/**
 * Motion-graphics decor — a few translucent glass shapes that drift slowly
 * behind a section's content. Pure CSS transforms (cheap, GPU-friendly) and
 * disabled under prefers-reduced-motion. Rendered behind the z-10 content.
 */
export function FloatingShapes({ count = 3 }: { count?: 3 | 4 }) {
  return (
    <div aria-hidden className="floating-shapes">
      <span className="fshape s1" />
      <span className="fshape s2" />
      <span className="fshape s3" />
      {count === 4 && <span className="fshape s4" />}
    </div>
  );
}
