export default function SpecSheet({ project }) {
  const rows = project.type === "software" ? project.features : project.specs;
  return (
    <dl className="specs">
      {rows.map(([k, v]) => (
        <div className="spec-row" key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
