export default function OrganizationSchema(){
 const schema={
  '@context':'https://schema.org',
  '@type':'Organization',
  name:'CBAMtools',
  description:'CBAM compliance tools for carbon calculation, HS code checking and assessment reports.'
 };
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />;
}
