export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-600">
        <p>© {new Date().getFullYear()} CBAMtools.com</p>
        <p className="mt-2">Free CBAM calculators and compliance tools for importers and exporters.</p>
        <div className="mt-4 flex gap-5">
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy</a>
          <a href="/disclaimer">Disclaimer</a>
        </div>
      </div>
    </footer>
  );
}
