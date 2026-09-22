const resources = [
  ["REFERENCE", "Default Values", "Find the right path when supplier emissions data is unavailable or incomplete.", "/cbam-default-values", "Explore default values"],
  ["TIMELINE", "CBAM Deadlines", "Track the major 2026–2027 implementation milestones and preparation dates.", "/cbam-deadlines", "View timeline"],
  ["GUIDE", "Importer Guide", "Organise product, supplier and emissions information before assessment.", "/cbam-for-importers", "Read importer guide"],
  ["CHECKLIST", "Compliance Checklist", "Work through classification, emissions, cost and documentation tasks.", "/cbam-compliance-checklist", "Open checklist"],
  ["DATA", "Supplier Emissions Data", "Build a more consistent request and review process for supplier information.", "/cbam-supplier-emission-data", "Review data needs"],
  ["REPORT", "Assessment Report", "Understand what to document after modelling CBAM exposure.", "/cbam-assessment-report", "See report workflow"]
];

export default function PopularResources() {
  return (
    <section className="section resources">
      <div className="section-heading">
        <div>
          <span className="kicker">WORKFLOW RESOURCES</span>
          <h2>Move from classification to a documented assessment.</h2>
        </div>
        <p>Practical reference pages for the questions that appear between checking a product and reviewing a CBAM estimate.</p>
      </div>
      <div className="resource-grid home-resource-grid">
        {resources.map(([type, name, description, link, action]) => (
          <a href={link} key={name}>
            <span>{type}</span>
            <h3>{name}</h3>
            <p>{description}</p>
            <b>{action} →</b>
          </a>
        ))}
      </div>
      <div className="resource-more"><a href="/blog">Browse all CBAM guides & resources →</a></div>
    </section>
  );
}
