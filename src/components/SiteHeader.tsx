export default function SiteHeader(){
  return <header className="inner-header">
    <a className="brand" href="/"><span className="brand-mark">C</span><span>CBAM<span className="brand-accent">Tools</span></span></a>
    <nav>
      <a href="/cbam-calculator">Calculator</a>
      <a href="/hs-code-checker">HS Code Checker</a>
      <a href="/cbam-default-values">Default Values</a>
      <a href="/cbam-deadlines">Deadlines</a>
      <a href="/pricing">Pricing</a>
      <a href="/blog">Guides</a>
    </nav>
    <a className="header-cta" href="/cbam-calculator">Open Calculator →</a>
    <details className="mobile-menu">
      <summary aria-label="Open navigation">Menu</summary>
      <div>
        <a href="/cbam-calculator">Calculator</a>
        <a href="/hs-code-checker">HS Code Checker</a>
        <a href="/cbam-default-values">Default Values</a>
        <a href="/cbam-certificate-price">Certificate Price</a>
        <a href="/pricing">Pricing</a>
        <a href="/blog">Guides</a>
      </div>
    </details>
  </header>;
}
