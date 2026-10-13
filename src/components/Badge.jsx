export default function Badge({ type }) {
  const isSoftware = type === "software";
  return (
    <span className={"badge " + (isSoftware ? "badge--sw" : "badge--hw")}>
      <span className="b-dot" aria-hidden="true" />
      {isSoftware ? "Software" : "Hardware"}
    </span>
  );
}
