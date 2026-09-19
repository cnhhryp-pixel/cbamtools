export default function ArticleSchema({title,description,url}:{title:string;description:string;url:string}){
 const schema={
  '@context':'https://schema.org',
  '@type':'Article',
  headline:title,
  description,
  author:{'@type':'Organization',name:'CBAMtools'},
  publisher:{'@type':'Organization',name:'CBAMtools'},
  mainEntityOfPage:url
 };
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />;
}
