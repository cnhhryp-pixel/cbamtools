export default function SiteHeader() {
  return (
    <header className="inner-header">
      <a className="brand" href="/">
        <span className="brand-mark">C</span>
        <span>CBAM<span className="brand-accent">Tools</span></span>
      </a>
      <nav>
        <a href="/cbam-calculator">Calculator</a>
        <a href="/hs-code-checker">HS Code Checker</a>
        <a href="/cbam-default-values">Default Values</a>
        <a href="/cbam-deadlines">Deadlines</a>
        <a href="/blog">Guides</a>
      </nav>
      <a className="header-cta" href="/cbam-calculator">Open Calculator →</a>
    </header>
  );
}
