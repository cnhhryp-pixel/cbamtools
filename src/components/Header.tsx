export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="text-2xl font-bold">CBAMtools</div>
        <nav className="flex gap-6 text-sm text-gray-700">
          <a href="/cbam-calculator">Tools</a>
          <a href="/hs-code-checker">HS Checker</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
