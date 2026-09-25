import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function NotFound(){
  return <>
    <SiteHeader/>
    <main className="not-found-page">
      <section>
        <span className="kicker">404 · PAGE NOT FOUND</span>
        <h1>This page is no longer here.</h1>
        <p>Use one of the main CBAMTools workflows below instead of ending on a dead page.</p>
        <div>
          <a className="primary-btn" href="/cbam-calculator">Open calculator →</a>
          <a className="secondary-404" href="/hs-code-checker">Check HS / CN code</a>
          <a className="secondary-404" href="/pricing">View pricing</a>
        </div>
      </section>
    </main>
    <SiteFooter/>
  </>;
}
