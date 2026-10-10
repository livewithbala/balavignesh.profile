(function(){
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const EMAIL="baluviki00@gmail.com";
const isMac=/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent);
$("#kbdHint").textContent=isMac?"⌘K":"Ctrl K";

/* theme */
const root=document.documentElement;
const saved=(()=>{try{return localStorage.getItem("theme")}catch(e){return null}})();
const pref=saved||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
const setTheme=t=>{root.dataset.theme=t;try{localStorage.setItem("theme",t)}catch(e){}$('meta[name=theme-color]').content=t==="dark"?"#0E0F13":"#FAFAF7"};
setTheme(pref);
const toggleTheme=()=>setTheme(root.dataset.theme==="dark"?"light":"dark");
$("#theme").onclick=toggleTheme;

/* toast */
let tt;const toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("show"),1800)};
const copyMail=async()=>{try{await navigator.clipboard.writeText(EMAIL);toast("Email copied")}catch(e){location.href="mailto:"+EMAIL}};
const cm=$("#copyMail");if(cm)cm.onclick=copyMail;

/* progress + nav state */
const bar=$("#progress"),nav=$("#nav");
const secs=$$("#links a[href^='#']").map(a=>document.getElementById(a.getAttribute("href").slice(1))).filter(Boolean);
const onScroll=()=>{
  const h=document.documentElement;
  bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%";
  nav.classList.toggle("scrolled",h.scrollTop>10);
  let cur="";secs.forEach(s=>{if(s.getBoundingClientRect().top<window.innerHeight*.4)cur=s.id});
  $$("#links a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+cur));
};
addEventListener("scroll",onScroll,{passive:true});onScroll();

/* reveal + counters */
const countUp=el=>{
  const to=parseFloat(el.dataset.count),dec=+el.dataset.dec||0,suf=el.dataset.suffix||"";
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){el.textContent=to.toFixed(dec)+suf;return}
  const t0=performance.now(),d=1400;
  const f=t=>{const p=Math.min((t-t0)/d,1),e=1-Math.pow(1-p,3);el.textContent=(to*e).toFixed(dec)+suf;if(p<1)requestAnimationFrame(f)};
  requestAnimationFrame(f);
};
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("in");$$("[data-count]",e.target).forEach(countUp);io.unobserve(e.target)}
}),{threshold:.12});
const observe=()=>$$(".rv:not(.in)").forEach(el=>io.observe(el));

/* chips */
$$("[data-chips]").forEach(c=>c.innerHTML=c.dataset.chips.split(",").map(x=>`<span class="chip">${x}</span>`).join(""));

/* timeline filter */
$$(".tabs button").forEach(b=>b.onclick=()=>{
  $$(".tabs button").forEach(x=>x.setAttribute("aria-selected",x===b));
  const f=b.dataset.f;
  $$("#timeline .rel").forEach(r=>r.classList.toggle("hide",f!=="all"&&r.dataset.t!==f));
});

/* shared site content (see content.js) */
const S=window.SITE;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const bookHref=S.bookingUrl||`mailto:${S.email}?subject=${encodeURIComponent("Let's chat")}&body=${encodeURIComponent("Hi Bala,\n\nI found your portfolio and would love to connect about ")}`;
const bookExt=S.bookingUrl?` target="_blank" rel="noopener"`:"";
$$("[data-cta]").forEach(el=>{
  const hero=el.dataset.cta==="hero";
  el.innerHTML=(hero
    ?`<a class="btn primary" href="#work">See my work →</a>`
    :`<a class="btn primary" href="mailto:${esc(S.email)}">Email me</a>`)
  +`<a class="btn ghost" href="${esc(S.resumeUrl)}" download>Resume (PDF) ↓</a>`
  +`<a class="btn ghost" href="${esc(bookHref)}"${bookExt}>Book a chat</a>`
  +(hero?"":`<a class="btn ghost" id="li" href="${esc(S.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>`);
});


/* positioning, skim, story, education */
const posEl=$("#positioning");
if(posEl)posEl.innerHTML=S.positioning.map(x=>`<span class="chip">${esc(x)}</span>`).join("");
const skimEl=$("#skim");
if(skimEl)skimEl.innerHTML=S.skim.map(x=>`<div><b>${esc(x.h)}</b><p>${esc(x.t)}</p></div>`).join("");
const storyEl=$("#storyBody");
if(storyEl)storyEl.innerHTML=S.story.map(p=>`<p class="rv">${esc(p)}</p>`).join("");
const eduEl=$("#edu");
if(eduEl)eduEl.innerHTML=S.education.map(e=>`<p><b>${esc(e.t)}</b><br><span>${esc(e.d)}</span></p>`).join("")+S.certifications.map(e=>`<p><b>${esc(e.t)}</b><br><span>${esc(e.d)}</span></p>`).join("");

/* how I work */
const howEl=$("#howGrid");
if(howEl){
  howEl.innerHTML=S.how.map(h=>`<article class="card rv"><span class="n">${h.n}</span><h3>${esc(h.t)}</h3><p>${esc(h.d)}</p></article>`).join("");
  $("#expect").innerHTML=S.expect.map(x=>`<li>${esc(x)}</li>`).join("");
  $("#need").innerHTML=S.need.map(x=>`<li>${esc(x)}</li>`).join("");
}
const callsEl=$("#callsList");
if(callsEl)callsEl.innerHTML=S.calls.map((c,i)=>`<article class="call rv"><span class="n">0${i+1}</span><div><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p></div></article>`).join("");
const proof=$("#proof");
if(proof&&S.testimonials.length){
  proof.hidden=false;
  $("#proofList").innerHTML=S.testimonials.map(t=>`<figure class="quote rv"><blockquote>“${esc(t.q)}”</blockquote><figcaption><b>${esc(t.n)}</b><span>${esc(t.r)}</span></figcaption></figure>`).join("");
}

/* case studies */
const casesEl=$("#cases");
if(casesEl){
  casesEl.innerHTML=S.cases.map((c,i)=>{
    const chips=`<div class="chips">${c.c.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div>`;
    const top=r=>`<div class="top"><span>${c.k} · ${esc(c.tag)}</span>${r}</div>`;
    if(c.deep)return `<article class="case rv ${c.feature?"feature":""}" data-deep="${i}">${top(`<span class="deeplink" aria-hidden="true">Deep dive →</span>`)}
      <h3><button type="button" class="case-btn" aria-haspopup="dialog">${esc(c.t)}</button></h3><p class="one">${esc(c.one)}</p>${chips}</article>`;
    return `<article class="case rv ${c.feature?"feature":""}">${top(`<span class="plus" aria-hidden="true">+</span>`)}
      <h3><button type="button" class="case-btn" aria-expanded="false" aria-controls="cs${i}">${esc(c.t)}</button></h3><p class="one">${esc(c.one)}</p>${chips}
      <div class="more" id="cs${i}"><div><dl><dt>Problem</dt><dd>${esc(c.p)}</dd><dt>Approach</dt><dd>${esc(c.a)}</dd><dt>Outcome</dt><dd>${esc(c.o)}</dd></dl></div></div></article>`;
  }).join("");
  const dive=$("#dive"),dbody=$("#diveBody");
  const visual=v=>{
    if(v==="apps")return `<div class="viz"><div class="apps">${Array.from({length:13},(_,i)=>`<span class="${i<3?"named":""}">${["Finance","Owner mgmt","Operations"][i]||""}</span>`).join("")}</div><small>13 connected apps (illustrative layout)</small></div>`;
    if(v&&v.startsWith("steps:"))return `<div class="viz"><div class="steps">${v.slice(6).split(",").map((s,i,a)=>`<span>${esc(s)}</span>${i<a.length-1?"<i>→</i>":""}`).join("")}</div></div>`;
    return "";
  };
  const openDive=i=>{
    const c=S.cases[i],d=c.deep;
    dbody.innerHTML=`<button class="dive-x" aria-label="Close" data-close>✕</button>
    <div class="eyebrow">${c.k} · ${esc(c.tag)}</div><h2 id="diveT">${esc(c.t)}</h2><p class="lede">${esc(c.one)}</p>
    <div class="stats">${d.stats.map(s=>`<div><b>${esc(s[0])}</b><span>${esc(s[1])}</span></div>`).join("")}</div>
    ${visual(d.visual)}
    <h4>Context</h4><p>${esc(d.context)}</p>
    <h4>My role</h4><p>${esc(d.role)}</p>
    <h4>How I approached it</h4><ol>${d.approach.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>
    ${d.decisions&&d.decisions.length?`<h4>Decisions and trade-offs</h4>${d.decisions.map(x=>`<p><b>${esc(x.t)}.</b> ${esc(x.d)}</p>`).join("")}`:""}
    <h4>Outcome</h4><p>${esc(d.outcome)}</p>
    ${d.metrics&&d.metrics.length?`<div class="chips">${d.metrics.map(x=>`<span class="chip hi">${esc(x)}</span>`).join("")}</div>`:""}
    <div class="chips" style="margin-top:18px">${d.tags.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div>
    <div class="dive-actions"><a class="btn ghost" href="mailto:${esc(S.email)}?subject=${encodeURIComponent("Question about: "+c.t)}">Ask me about this →</a><button class="btn ghost" data-copy="${i}">Copy link</button></div>`;
    if(!dive.open)dive.showModal();dive.scrollTop=0;
    try{history.replaceState(null,"","#dive-"+i)}catch(e){}
  };
  casesEl.addEventListener("click",e=>{
    const art=e.target.closest(".case");if(!art)return;
    if(art.dataset.deep!==undefined){openDive(+art.dataset.deep);return}
    const btn=$(".case-btn",art),o=!art.classList.contains("open");
    art.classList.toggle("open",o);btn.setAttribute("aria-expanded",o);
  });
  dive.addEventListener("click",async e=>{
    const cp=e.target.closest("[data-copy]");
    if(cp){try{await navigator.clipboard.writeText(location.origin+location.pathname+"#dive-"+cp.dataset.copy);toast("Link copied")}catch(err){toast("Copy the address bar link")}return}
    if(e.target===dive||e.target.closest("[data-close]"))dive.close()});
  dive.addEventListener("close",()=>{try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}});
  const hm=location.hash.match(/^#dive-(\d+)$/);
  if(hm&&S.cases[+hm[1]]&&S.cases[+hm[1]].deep)setTimeout(()=>openDive(+hm[1]),150);
}

if($("#playground")){
/* prioritization playground: RICE, Value vs Effort, MoSCoW, Kano */
const items=[
 {n:"AI summary of customer notes",s:"GenAI · CRM",r:8,i:4,c:7,e:5,vv:8,ve:5,m:"should",k:"delighter"},
 {n:"Bulk data import",s:"Onboarding",r:9,i:3,c:9,e:3,vv:6,ve:3,m:"must",k:"performance"},
 {n:"Audit trail & e-signatures",s:"Compliance · Part 11",r:5,i:5,c:9,e:6,vv:9,ve:7,m:"must",k:"basic"},
 {n:"Custom dashboard builder",s:"Analytics",r:6,i:3,c:5,e:8,vv:5,ve:8,m:"could",k:"performance"},
 {n:"Dark mode",s:"Experience",r:7,i:1,c:9,e:2,vv:3,ve:2,m:"wont",k:"indifferent"}
];
const FW={
 rice:{use:"Many competing ideas and you have reach and effort data. Gives a defensible numeric rank.",how:"Score = (Reach × Impact × Confidence) ÷ Effort."},
 ve:{use:"Early stage, little data, or a quick team workshop. Fast and visual.",how:"Plot value against effort; start with the top-left Quick wins."},
 moscow:{use:"Fixed deadline or budget and you must negotiate scope with stakeholders.",how:"Tag each item Must, Should, Could or Won't for this release."},
 kano:{use:"Deciding what is table stakes versus what delights. Best for UX-heavy or mature markets.",how:"Classify how users react to having or lacking each feature."}
};
const seg=(opts,cur,attr)=>`<div class="seg" role="group">${opts.map(([k,l])=>`<button type="button" aria-pressed="${k===cur}" data-${attr}="${k}">${l}</button>`).join("")}</div>`;
const ctl=(l,f,v,mn,mx,k,lab)=>`<div class="ctl"><label><span>${l}</span><b data-v="${f}">${v}</b></label><input type="range" min="${mn}" max="${mx}" value="${v}" data-f="${f}" aria-label="${lab} ${l}"></div>`;
const MS=[["must","Must"],["should","Should"],["could","Could"],["wont","Won't"]];
const KN=[["basic","Basic"],["performance","Performance"],["delighter","Delighter"],["indifferent","Indifferent"]];

/* RICE */
const pRice=$("#p-rice");
pRice.innerHTML=items.map((x,k)=>`
<div class="item" data-k="${k}">
  <div class="name">${x.n}<small>${x.s}</small></div>
  ${ctl("Reach","r",x.r,1,10,k,x.n)}${ctl("Impact","i",x.i,1,5,k,x.n)}${ctl("Confidence","c",x.c,1,10,k,x.n)}${ctl("Effort","e",x.e,1,10,k,x.n)}
  <div class="score"><b data-sc>0</b><span class="moscow"></span></div>
</div>`).join("")+`<p class="play-note">Top 25% → Must · next 25% → Should · next 25% → Could · rest → Won't (this release).</p>`;
const rRows=$$(".item",pRice);
const calc=x=>(x.r*x.i*(x.c/10))/x.e;
const rowH=()=>rRows[0]?rRows[0].offsetHeight+12:0;
const updRice=()=>{
  const sc=items.map((x,k)=>({k,s:calc(x)})).sort((a,b)=>b.s-a.s),n=sc.length;
  const cls=["must","should","could","wont"],nm=["Must","Should","Could","Won't"],h=rowH();
  sc.forEach((o,pos)=>{
    const row=rRows[o.k],b=Math.min(3,Math.floor(pos/n*4)),m=$(".moscow",row);
    $("[data-sc]",row).textContent=o.s.toFixed(1);
    m.className="moscow "+cls[b];m.textContent=`#${pos+1} ${nm[b]}`;
    row.style.transform=`translateY(${(pos-o.k)*h}px)`;
  });
};

/* Value vs Effort */
const pVe=$("#p-ve");
pVe.innerHTML=`<div class="ve"><div class="matrix" id="matrix" role="img" aria-label="Value versus effort matrix">
  <span class="q q1">Quick wins</span><span class="q q2">Big bets</span><span class="q q3">Fill-ins</span><span class="q q4">Money pit</span>
  ${items.map((x,k)=>`<span class="pt" data-k="${k}" title="${x.n}">${k+1}</span>`).join("")}</div>
  <div class="ve-list">${items.map((x,k)=>`<div class="ve-item" data-k="${k}"><span class="num">${k+1}</span><span class="name">${x.n}</span>
    ${ctl("Value","vv",x.vv,1,10,k,x.n)}${ctl("Effort","ve",x.ve,1,10,k,x.n)}<span class="quad"></span></div>`).join("")}
  </div></div><p class="play-note">Vertical = value (up is better) · horizontal = effort (right is costlier).</p>`;
const quad=x=>x.vv>=6?(x.ve<=5?"Quick win · do first":"Big bet · plan carefully"):(x.ve<=5?"Fill-in · when capacity allows":"Money pit · avoid");
const updVe=()=>items.forEach((x,k)=>{
  const p=$(`#matrix .pt[data-k="${k}"]`);
  p.style.left=((x.ve-1)/9*88+6)+"%";p.style.top=((10-x.vv)/9*88+6)+"%";
  $(`.ve-item[data-k="${k}"] .quad`,pVe).textContent=quad(x);
});

/* MoSCoW */
const pMo=$("#p-moscow");
pMo.innerHTML=items.map((x,k)=>`<div class="row" data-k="${k}"><div class="name">${x.n}<small>${x.s}</small></div>${seg(MS,x.m,"m")}</div>`).join("")+`<div class="summary" id="moSum"></div>`;
const updMo=()=>{
  const c={must:0,should:0,could:0,wont:0};items.forEach(x=>c[x.m]++);
  const pct=Math.round(c.must/items.length*100),el=$("#moSum");
  const msg=c.must===0?"No Musts: if nothing is critical, is this release worth shipping?":pct>60?"Over-stuffed. When most things are Musts, nothing is. Push some down to Should.":"Healthy mix. Musts are the release; Shoulds and Coulds flex with capacity.";
  el.className="summary"+(c.must===0||pct>60?" warn":"");
  el.textContent=`${c.must} Must · ${c.should} Should · ${c.could} Could · ${c.wont} Won't (${pct}% Must). ${msg}`;
};

/* Kano */
const pKa=$("#p-kano");
const KD={basic:"Expected. Absent = angry, present = unnoticed.",performance:"More is better. Satisfaction rises with quality.",delighter:"Unexpected. Absent = fine, present = loved.",indifferent:"Users don't care either way."};
pKa.innerHTML=items.map((x,k)=>`<div class="row" data-k="${k}"><div class="name">${x.n}<small>${x.s}</small></div>${seg(KN,x.k,"k")}</div>`).join("")+`<div class="kano-grid" id="kanoGrid"></div><div class="summary">Build order: all Basics first, then the strongest Performance features, add one Delighter for differentiation, skip Indifferent.</div>`;
const updKa=()=>{$("#kanoGrid").innerHTML=KN.map(([k,l])=>{const l2=items.filter(x=>x.k===k);return `<div class="card"><h4>${l}</h4><p>${KD[k]}</p>${l2.length?`<ul>${l2.map(x=>`<li>${x.n}</li>`).join("")}</ul>`:`<span class="none">None</span>`}</div>`}).join("")};

/* wiring */
const upd={rice:updRice,ve:updVe,moscow:updMo,kano:updKa};
let curFw="rice";
const setFw=f=>{
  curFw=f;
  $$(".fw-tabs button").forEach(b=>b.setAttribute("aria-selected",b.dataset.fw===f));
  $$("#fwPanels .panel").forEach(p=>p.hidden=p.dataset.p!==f);
  $("#fwBrief").innerHTML=`<div><b>Use when</b>${FW[f].use}</div><div><b>How it works</b>${FW[f].how}</div>`;
  upd[f]();
};
$$(".fw-tabs button").forEach(b=>b.onclick=()=>setFw(b.dataset.fw));
$("#fwPanels").addEventListener("input",e=>{
  const inp=e.target.closest("input[type=range]");if(!inp)return;
  const row=inp.closest("[data-k]"),f=inp.dataset.f;
  items[row.dataset.k][f]=+inp.value;$(`[data-v=${f}]`,row).textContent=inp.value;upd[curFw]();
});
$("#fwPanels").addEventListener("click",e=>{
  const b=e.target.closest(".seg button");if(!b)return;
  const row=b.closest("[data-k]"),it=items[row.dataset.k];
  if(b.dataset.m){it.m=b.dataset.m}else{it.k=b.dataset.k}
  $$("button",b.parentNode).forEach(x=>x.setAttribute("aria-pressed",x===b));upd[curFw]();
});
addEventListener("resize",()=>upd[curFw]());
setFw("rice");

}

/* user story writer */
if($("#stories")){
  const f={who:$("#stWho"),goal:$("#stGoal"),why:$("#stWhy")},out=$("#stOut"),chk=$$("#stLens input");
  const LENS={
    perm:["Permissions","Given I do not have permission","When I try to {goal}","Then I see a clear message and nothing changes"],
    empty:["Empty state","Given there is no data yet","When I {goal}","Then I see a helpful empty state with a clear next step"],
    fail:["Failure","Given the service is unavailable","When I {goal}","Then I see an error with a retry option and no data is lost"],
    audit:["Audit","Given the action completes","Then who, what and when are recorded in a tamper-evident audit log"],
    perf:["Performance","Given a large data set","When I {goal}","Then it responds within the threshold agreed with engineering"],
    mobile:["Mobile","Given I am on a phone","When I {goal}","Then the flow is usable without horizontal scrolling"]
  };
  const lc=s=>s.trim().replace(/^\s*(i want to|to)\s+/i,"").replace(/[.]+$/,"");
  const render=()=>{
    const who=f.who.value.trim()||"user",goal=lc(f.goal.value)||"complete the task",why=lc(f.why.value);
    const g=s=>s.replace("{goal}",goal);
    const art=/^[aeiou]/i.test(who)?"an":"a";
    let txt=`USER STORY\nAs ${art} ${who}, I want to ${goal}${why?`, so that ${why}`:""}.\n\nACCEPTANCE CRITERIA\nScenario: Happy path\n  Given I am a signed-in ${who}\n  When I ${goal}\n  Then the action completes successfully${why?`\n  And it supports: ${why}`:""}`;
    chk.forEach(c=>{if(c.checked){const L=LENS[c.value];txt+=`\n\nScenario: ${L[0]}\n  ${L.slice(1).map(g).join("\n  ")}`}});
    out.textContent=txt;
    const words=goal.split(/\s+/).length,tooBig=words>14||/\band\b/i.test(goal);
    $("#stInvest").innerHTML=[
      [!!why,"Valuable","Has a clear benefit"],
      [!tooBig,"Small","Goal is focused"],
      [true,"Testable","Criteria written"]
    ].map(([ok,l,t])=>`<span class="inv ${ok?"ok":"warn"}" title="${t}">${ok?"✓":"!"} ${l}</span>`).join("")+(tooBig?`<small>The goal looks big or has two actions. Consider splitting it into two stories.</small>`:"")+(!why?`<small>Add a "so that" benefit so the value is explicit.</small>`:"");
  };
  [...Object.values(f),...chk].forEach(el=>el.addEventListener("input",render));
  $("#stCopy").onclick=async()=>{try{await navigator.clipboard.writeText(out.textContent);toast("Story copied")}catch(e){toast("Select and copy manually")}};
  render();
}

/* metrics tree */
if($("#metrics")){
  const T={
    saas:{name:"B2B SaaS",ns:"Weekly active teams completing a core job",nsd:"A North Star counts delivered customer value, not logins. Pick the job your product exists to do.",c:[
      {n:"Acquisition",d:"Are the right people arriving?",c:[{n:"Qualified signups",d:"Signups that match your ideal customer profile."},{n:"Signup → activation rate",d:"Share of signups who reach first value. The lever for onboarding and UX work."}]},
      {n:"Engagement",d:"Do they use it for the job it is built for?",c:[{n:"Core action frequency",d:"How often the key action happens per team per week."},{n:"Feature adoption",d:"Share of accounts using the features that predict retention."}]},
      {n:"Retention",d:"Do they stay and grow?",c:[{n:"Logo churn",d:"Accounts lost per period."},{n:"Net revenue retention",d:"Revenue from existing accounts including expansion."}]},
      {n:"Guardrail",d:"What must not get worse?",c:[{n:"Support tickets per 100 users",d:"Rising tickets mean growth is coming with friction."}]}]},
    erp:{name:"PropTech / ERP",ns:"Properties managed end to end on the platform",nsd:"In multi-module platforms, value shows up when whole workflows run inside the product.",c:[
      {n:"Adoption",d:"Is the whole organization using it?",c:[{n:"Active modules per customer",d:"Breadth of use across departments such as finance, owners and operations."},{n:"Users active per account",d:"Depth within each customer."}]},
      {n:"Efficiency",d:"Does it remove work?",c:[{n:"Manual steps removed per workflow",d:"Count steps before and after for the top workflows."},{n:"Month-end close time",d:"Time to close a cycle, such as owner statements."}]},
      {n:"Data quality",d:"Can people trust it?",c:[{n:"Reconciliation errors",d:"Mismatches between modules, for example finance versus operations."}]},
      {n:"Guardrail",d:"What must not get worse?",c:[{n:"Support load per property",d:"Cost to serve as you scale."}]}]},
    reg:{name:"Regulated / HealthTech",ns:"Audit-ready releases shipped",nsd:"In GxP and 21 CFR Part 11 work, speed only counts if each release can be defended in an audit.",c:[
      {n:"Traceability",d:"Can every requirement be traced?",c:[{n:"Requirement-to-test coverage",d:"Share of requirements linked to test evidence in the traceability matrix."}]},
      {n:"Throughput",d:"Are we shipping at pace?",c:[{n:"Documentation turnaround",d:"Time from requirement to approved PDD or ticket. GenAI assistance targets this."},{n:"Release cadence",d:"Validated releases per quarter."}]},
      {n:"Quality",d:"Is it right before it ships?",c:[{n:"UAT defects vs production defects",d:"A healthy ratio finds issues in UAT, not in production."}]},
      {n:"Guardrail",d:"What must not get worse?",c:[{n:"Audit findings per inspection",d:"The number that matters most to the regulated customer."}]}]},
    lend:{name:"Fintech / Lending",ns:"Loans managed through the full lifecycle on the platform",nsd:"Lending value is realized across application, repayment and recovery, not at signup.",c:[
      {n:"Origination",d:"Are good applications converting?",c:[{n:"Application → disbursal conversion",d:"Share of applications that complete."},{n:"Time to decision",d:"Speed from application to approval."}]},
      {n:"Servicing",d:"Do borrowers repay on time?",c:[{n:"On-time repayment rate",d:"Share of installments paid by due date."}]},
      {n:"Efficiency",d:"Is it economical to run?",c:[{n:"Cost to serve per loan",d:"Operational cost across the lifecycle."}]},
      {n:"Guardrail",d:"What must not get worse?",c:[{n:"Security and data exceptions",d:"Incidents involving sensitive financial data."}]}]},
    mkt:{name:"Marketplace",ns:"Successful transactions per week",nsd:"Marketplaces win when both sides get matched. Count completed transactions, not listings.",c:[
      {n:"Supply",d:"Is there enough good supply?",c:[{n:"Active supply",d:"Listings or providers available and responsive."},{n:"Listing quality",d:"Completeness and accuracy of listings."}]},
      {n:"Demand",d:"Is demand arriving and converting?",c:[{n:"Search → request conversion",d:"Share of searches that lead to a request."}]},
      {n:"Liquidity",d:"Do the two sides meet?",c:[{n:"Time to match",d:"Speed from request to match."},{n:"Fill rate",d:"Share of requests that complete."}]},
      {n:"Guardrail",d:"What must not get worse?",c:[{n:"Dispute rate",d:"Trust erodes when transactions go wrong."}]}]}
  };
  const sel=$("#mtType"),tree=$("#mtTree"),info=$("#mtInfo");
  sel.innerHTML=Object.entries(T).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join("");
  const li=(n,lvl)=>`<li><button class="node l${lvl}" data-d="${esc(n.d||"")}" data-n="${esc(n.n)}">${esc(n.n)}</button>${n.c?`<ul>${n.c.map(x=>li(x,lvl+1)).join("")}</ul>`:""}</li>`;
  const draw=()=>{
    const t=T[sel.value];
    tree.innerHTML=`<ul><li><button class="node l0" data-d="${esc(t.nsd)}" data-n="North Star">★ ${esc(t.ns)}</button><ul>${t.c.map(x=>li(x,1)).join("")}</ul></li></ul>`;
    info.innerHTML=`<b>North Star</b>${esc(t.nsd)}`;
  };
  tree.addEventListener("click",e=>{const b=e.target.closest(".node");if(!b)return;$$(".node",tree).forEach(x=>x.classList.toggle("on",x===b));info.innerHTML=`<b>${b.dataset.n}</b>${b.dataset.d||"Input metric that rolls up to the level above."}`});
  sel.addEventListener("change",draw);draw();
}

/* portrait tilt (desktop pointer only) */
const pt=$("#portrait");
if(pt&&matchMedia("(hover:hover) and (min-width:821px)").matches&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
  pt.addEventListener("pointermove",e=>{const r=pt.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;pt.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`});
  pt.addEventListener("pointerleave",()=>pt.style.transform="");
}

/* changelog */


/* command palette */
const PAGES={story:"index.html",about:"index.html",how:"index.html",journey:"index.html",work:"index.html",calls:"index.html",toolkit:"index.html",contact:"index.html",playground:"lab.html",stories:"lab.html",metrics:"lab.html",prd:"lab.html",changelog:"lab.html"};
const onLab=location.pathname.endsWith("lab.html");
const go=id=>()=>{const el=document.getElementById(id);if(el){if(el.tagName==="DETAILS")el.open=true;el.scrollIntoView({behavior:"smooth"})}else location.href=PAGES[id]+"#"+id};
const nav2=u=>()=>{location.href=u};
const cmds=[
 {l:"Go to About (my story)",h:"Profile",f:go("story")},
 {l:"How I work with you",h:"Profile",f:go("how")},
 {l:"Go to Career roadmap",h:"Profile",f:go("journey")},
 {l:"Go to Selected work",h:"Profile",f:go("work")},
 {l:"Calls I'd make again",h:"Profile",f:go("calls")},
 {l:"Go to Toolkit",h:"Profile",f:go("toolkit")},
 {l:"Open Product Lab",h:"Lab",f:nav2("lab.html"),hide:onLab},
 {l:"Try the prioritization playground",h:"Lab",f:go("playground")},
 {l:"Write a user story",h:"Lab",f:go("stories")},
 {l:"Build a metrics tree",h:"Lab",f:go("metrics")},
 {l:"Read my PRD",h:"Lab",f:go("prd")},
 {l:"Show changelog",h:"Lab",f:go("changelog")},
 {l:"Back to profile",h:"Profile",f:nav2("index.html"),hide:!onLab},
 {l:"Download resume (PDF)",h:"↓",f:()=>{const a=document.createElement("a");a.href=S.resumeUrl;a.download="";a.click()}},
 {l:"Book a chat",h:"↗",f:()=>{location.href=bookHref}},
 {l:"Contact",h:"",f:go("contact")},
 {l:"Copy email address",h:"",f:copyMail},
 {l:"Open LinkedIn",h:"↗",f:()=>window.open(S.linkedin,"_blank","noopener")},
 {l:"Toggle dark / light mode",h:"",f:toggleTheme},
 {l:"Print / save as PDF",h:"",f:()=>setTimeout(print,200)}
].filter(c=>!c.hide);
const pal=$("#pal"),pin=$("#palIn"),plist=$("#palList");let sel=0,shown=cmds;
const render=()=>{
  plist.innerHTML=shown.length?shown.map((c,i)=>`<button class="${i===sel?"sel":""}" data-i="${i}"><span>${c.l}</span><small>${c.h}</small></button>`).join(""):`<div class="pal-empty">No matches</div>`;
  const s=$(".sel",plist);if(s)s.scrollIntoView({block:"nearest"});
};
const open=()=>{pal.classList.add("open");pin.value="";shown=cmds;sel=0;render();setTimeout(()=>pin.focus(),10)};
const close=()=>pal.classList.remove("open");
const run=i=>{const c=shown[i];if(c){close();setTimeout(c.f,60)}};
$("#openPal").onclick=open;
pin.addEventListener("input",()=>{const q=pin.value.toLowerCase();shown=cmds.filter(c=>c.l.toLowerCase().includes(q));sel=0;render()});
plist.addEventListener("click",e=>{const b=e.target.closest("button");if(b)run(+b.dataset.i)});
pal.addEventListener("mousedown",e=>{if(e.target===pal)close()});
addEventListener("keydown",e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();pal.classList.contains("open")?close():open();return}
  if(!pal.classList.contains("open"))return;
  if(e.key==="Escape")close();
  else if(e.key==="ArrowDown"){e.preventDefault();sel=Math.min(sel+1,shown.length-1);render()}
  else if(e.key==="ArrowUp"){e.preventDefault();sel=Math.max(sel-1,0);render()}
  else if(e.key==="Enter"){e.preventDefault();run(sel)}
});

/* mobile menu */
const mb=$("#menuBtn");
if(mb){
  const panel=document.createElement("div");panel.id="mnav";panel.hidden=true;
  panel.innerHTML=$$("#links a").map(a=>`<a href="${a.getAttribute("href")}">${a.textContent}</a>`).join("")+`<button type="button" id="mSearch">Search all commands</button>`;
  $("#nav").appendChild(panel);
  const setM=o=>{panel.hidden=!o;mb.setAttribute("aria-expanded",o);mb.textContent=o?"✕":"☰"};
  mb.onclick=()=>setM(panel.hidden);
  panel.addEventListener("click",e=>{if(e.target.closest("a"))setM(false);if(e.target.closest("#mSearch")){setM(false);open()}});
  addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden)setM(false)});
}

/* arrow-key support for tab groups */
$$(".tabs,.fw-tabs").forEach(g=>g.addEventListener("keydown",e=>{
  if(e.key!=="ArrowRight"&&e.key!=="ArrowLeft")return;
  const b=$$("button",g),i=b.findIndex(x=>x.getAttribute("aria-selected")==="true");
  const n=b[(i+(e.key==="ArrowRight"?1:-1)+b.length)%b.length];n.click();n.focus();e.preventDefault();
}));

observe();
})();