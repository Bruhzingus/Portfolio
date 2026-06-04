export default function Badge({ type, children, onSurface }) {
  const cls =
    type === "software"
      ? "badge badge--sw" + (onSurface ? " on-surface" : "")
      : "badge badge--hw";
  return (
    <span className={cls}>
      <span className="b-dot" />
      {children || (type === "software" ? "Software" : "Hardware")}
    </span>
  );
}
