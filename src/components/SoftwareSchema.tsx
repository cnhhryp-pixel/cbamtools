export default function SoftwareSchema(){
  const schema={
    '@context':'https://schema.org',
    '@type':'SoftwareApplication',
    name:'CBAMtools',
    applicationCategory:'BusinessApplication',
    description:'CBAM calculator, HS code checker and assessment report tools for EU carbon compliance preparation.',
    operatingSystem:'Web'
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />;
}
