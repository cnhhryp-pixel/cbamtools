export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-gray-600">
        <p>© {new Date().getFullYear()} CBAMtools.com</p>
        <p className="mt-2">CBAM calculators and compliance resources for global businesses.</p>
      </div>
    </footer>
  );
}
