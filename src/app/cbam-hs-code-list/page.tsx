"use client";
import {useMemo,useState} from "react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import {cbamCodeRules} from "../../data/cbamCodes";

const sectors=["All","Iron & Steel","Aluminium","Cement","Fertilisers","Hydrogen","Electricity"];

export default function Page(){
  const [query,setQuery]=useState("");
  const [sector,setSector]=useState("All");
  const rows=useMemo(()=>{
    const q=query.trim().toLowerCase().replace(/\s/g,"");
    return cbamCodeRules.filter(r=>{
      const sectorMatch=sector==="All"||r.sector===sector;
      const text=(r.prefix+" "+r.product+" "+r.sector).toLowerCase();
      return sectorMatch&&(!q||text.includes(q));
    });
  },[query,sector]);

  return (
    <>
      <SiteHeader/>
      <main className="code-db-page">
        <section className="code-db-hero">
          <span className="kicker">CBAM CODE DATABASE</span>
          <h1>Browse the current CBAM screening dataset.</h1>
          <p>Search the code rules currently used by the CBAMTools checker. This is a screening dataset under expansion, not a complete substitute for the official EU CN/TARIC classification and current CBAM legal scope.</p>
          <div className="code-db-search">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search code, product or sector — e.g. 7318, aluminium"/>
            <select value={sector} onChange={e=>setSector(e.target.value)}>{sectors.map(s=><option key={s}>{s}</option>)}</select>
          </div>
        </section>
        <section className="code-db-body"><div className="data-model-strip"><div><small>DATA MODEL</small><b>Code → Country → Production Route → Regulatory Inputs</b></div><span>2026 definitive-period architecture</span></div>
          <div className="code-db-meta"><b>{rows.length}</b><span>matching screening rules</span><a href="/hs-code-checker">Open interactive checker →</a></div>
          <div className="code-db-table">
            <div className="code-db-head"><span>CODE / PREFIX</span><span>SECTOR</span><span>PRODUCT DESCRIPTION</span><span>GAS</span><span></span></div>
            {rows.map(r=><div className="code-db-row" key={r.prefix+r.product}><b>{r.prefix}</b><span>{r.sector}</span><p>{r.product}</p><span>{r.gas}</span><a href={"/cbam-calculator?sector="+encodeURIComponent(r.sector)+"&code="+encodeURIComponent(r.prefix)}>Calculate →</a></div>)}
          </div>
          {!rows.length&&<div className="code-db-empty"><b>No matching rule in the current dataset.</b><p>Try a broader code or product term. An unmatched search does not mean the goods are outside CBAM scope.</p></div>}
        </section>
      </main>
      <SiteFooter/>
    </>
  );
}
