// Small presentational inline icons shared across the site. They inherit color
// via currentColor and take a size so each caller can match its context.

export function ArrowUpRight({ size = 14 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ChevronDown({ size = 16 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
