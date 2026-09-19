const tools = [
  {
    title: "CBAM Calculator",
    description: "Estimate potential CBAM carbon costs based on your product data.",
    link: "/cbam-calculator",
  },
  {
    title: "HS Code Checker",
    description: "Check whether your product may fall under CBAM requirements.",
    link: "/hs-code-checker",
  },
  {
    title: "Professional Report",
    description: "Generate a detailed CBAM assessment report and unlock PDF download.",
    link: "/report",
  },
];

export default function ToolCards() {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {tools.map((tool) => (
        <a key={tool.title} href={tool.link} className="rounded-xl border p-6 hover:shadow">
          <h2 className="text-xl font-bold">{tool.title}</h2>
          <p className="mt-3 text-gray-600">{tool.description}</p>
        </a>
      ))}
    </section>
  );
}
