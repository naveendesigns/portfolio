/* ================================================================
   DesignOS — concept prototype
   Vanilla JS, component-style architecture with local mock data.
   ================================================================ */
'use strict';
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const sleep = ms => new Promise(r=>setTimeout(r,ms));
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- icon system (hand-drawn, stroke 1.75, 24px grid) ---------- */
const ICONS = {
  search:'<circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 21 21"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  'chev-down':'<path d="m6 9 6 6 6-6"/>',
  'chev-right':'<path d="m9 6 6 6-6 6"/>',
  'arrow-right':'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  folder:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  layers:'<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M4 13l8 4.4L20 13"/><path d="M4 16.8l8 4.4 8-4.4"/>',
  scale:'<path d="M12 3v18M7 21h10M4 6.5h16"/><path d="M6.5 6.5 3.6 13a3.3 3.3 0 0 0 5.8 0L6.5 6.5z"/><path d="M17.5 6.5 14.6 13a3.3 3.3 0 0 0 5.8 0l-2.9-6.5z"/>',
  sparkle:'<path d="M12 2.5l2.3 7.2 7.2 2.3-7.2 2.3L12 21.5l-2.3-7.2-7.2-2.3 7.2-2.3z"/>',
  box:'<path d="M21 8.2 12 3 3 8.2v7.6L12 21l9-5.2z"/><path d="M3 8.2l9 5.2 9-5.2"/><path d="M12 13.4V21"/>',
  type:'<path d="M5 6.5V5h14v1.5M12 5v14M9.5 19h5"/>',
  ruler:'<path d="M3.5 16.5 16.5 3.5 20.5 7.5 7.5 20.5z"/><path d="m7 13 1.8 1.8M10 10l1.8 1.8M13 7l1.8 1.8"/>',
  droplet:'<path d="M12 2.7s6.3 6.6 6.3 10.8a6.3 6.3 0 0 1-12.6 0C5.7 9.3 12 2.7 12 2.7z"/>',
  square:'<rect x="4" y="4" width="16" height="16" rx="3"/>',
  inbox:'<path d="M22 12h-5.5l-2 3h-5l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',
  alert:'<circle cx="12" cy="12" r="9"/><path d="M12 8v4.5M12 15.8h.01"/>',
  msg:'<path d="M21 14.5a2.5 2.5 0 0 1-2.5 2.5H8l-5 4V5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5z"/>',
  bell:'<path d="M18 8.5a6 6 0 0 0-12 0c0 6.5-2.5 8.5-2.5 8.5h17S18 15 18 8.5z"/><path d="M13.7 20.5a2 2 0 0 1-3.4 0"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4.5 21c.8-3.5 3.9-5.5 7.5-5.5s6.7 2 7.5 5.5"/>',
  users:'<circle cx="9" cy="8" r="3.6"/><path d="M2.5 20c.7-3.2 3.4-5 6.5-5s5.8 1.8 6.5 5"/><path d="M16 4.6a3.6 3.6 0 0 1 0 6.9M17.5 15.2c2.2.6 3.6 2.2 4 4.8"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3.2 2"/>',
  history:'<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3 8.5"/><path d="M3 3.5v5h5"/><path d="M12 7.5V12l3.5 2"/>',
  link:'<path d="M10.2 13.8a4.6 4.6 0 0 0 6.9.4l2.8-2.8a4.6 4.6 0 0 0-6.5-6.5l-1.6 1.6"/><path d="M13.8 10.2a4.6 4.6 0 0 0-6.9-.4l-2.8 2.8a4.6 4.6 0 0 0 6.5 6.5l1.6-1.6"/>',
  file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
  send:'<path d="M21.5 2.5 11 13"/><path d="M21.5 2.5 14.5 21.5l-3.4-8.1-8.1-3.4z"/>',
  eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  shield:'<path d="M12 2.5 20 6v6c0 4.8-3.4 8.2-8 9.5-4.6-1.3-8-4.7-8-9.5V6z"/><path d="m9 11.5 2 2 4-4"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  zap:'<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>',
  lock:'<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
  card:'<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 9.5h19"/>',
  receipt:'<path d="M6.5 2.5h11a1 1 0 0 1 1 1V21l-3-2-2.5 2-2.5-2-3 2V3.5a1 1 0 0 1 1-1z"/><path d="M9.5 7.5h5M9.5 11h5"/>',
  enter:'<path d="M20 4v6.5a3.5 3.5 0 0 1-3.5 3.5H5"/><path d="m9 9.5-4.5 4.5L9 18.5"/>',
  undo:'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  flask:'<path d="M9.5 3h5M10 3v5.5L4.8 18a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3L14 8.5V3"/><path d="M7.5 14.5h9"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  'check-circle':'<circle cx="12" cy="12" r="9"/><path d="m8.5 12.2 2.4 2.4 4.6-4.8"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  pen:'<path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z"/><path d="m14.5 6.5 3 3"/>',
  branch:'<path d="M6 3v15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
  command:'<path d="M9 9V6.5A2.5 2.5 0 1 0 6.5 9H9zm0 0v6m0-6h6m-6 6H6.5A2.5 2.5 0 1 0 9 17.5V15zm6-6h2.5A2.5 2.5 0 1 0 15 6.5V9zm0 0v6m0 0v2.5A2.5 2.5 0 1 0 17.5 15H15z"/>',
  a11y:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="8.6" r="1.8"/><path d="M8.7 11.4h6.6M12 11.4v3.2M12 14.6l-2.7 4.4M12 14.6l2.7 4.4"/>',
  play:'<path d="M7 4.5v15l12-7.5z"/>'
};
function ic(n,s=18){return `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]||''}</svg>`}
function initIcons(root=document){$$('[data-icon]',root).forEach(el=>{el.innerHTML=ic(el.dataset.icon,+(el.dataset.size||18))})}

/* ---------- shared helpers ---------- */
function toast(msg,icon='check'){
  const t=document.createElement('div');t.className='toast';
  t.innerHTML=`${ic(icon,15)}<span>${msg}</span>`;
  $('#toasts').append(t);
  setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),350)},3600);
}
let lastFocus=null, activeOverlay=null;
function openModal(html){
  closeModal();
  lastFocus=document.activeElement;
  const ov=document.createElement('div');ov.className='overlay';
  ov.innerHTML=`<div class="modal" role="dialog" aria-modal="true" tabindex="-1"><button class="mclose" aria-label="Close dialog">${ic('x',15)}</button>${html}</div>`;
  $('#modalRoot').append(ov);activeOverlay=ov;
  ov.addEventListener('mousedown',e=>{if(e.target===ov)closeModal()});
  $('.mclose',ov).addEventListener('click',closeModal);
  ov.querySelector('.modal').focus();
  document.body.style.overflow='hidden';
  initIcons(ov);
  return ov;
}
function closeModal(){
  if(!activeOverlay)return;
  activeOverlay.remove();activeOverlay=null;document.body.style.overflow='';
  if(lastFocus)lastFocus.focus();
}
async function typeInto(el,text,tok,speed=15){
  el.classList.add('typing');
  if(RM){el.textContent=text;el.classList.remove('typing');return}
  for(let i=1;i<=text.length;i++){
    if(tok&&tok.cancelled)return;
    el.textContent=text.slice(0,i);
    await sleep(speed);
  }
  el.classList.remove('typing');
}
function countConf(pctEl,barEl,pct){
  if(RM){pctEl.textContent=pct+'%';barEl.style.width=pct+'%';return}
  const t0=performance.now(),dur=850;
  (function f(t){
    const p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);
    pctEl.textContent=Math.round(pct*e)+'%';
    if(p<1)requestAnimationFrame(f);
  })(t0);
  requestAnimationFrame(()=>barEl.style.width=pct+'%');
}

/* ---------- nav ---------- */
const nav=$('#siteNav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>10),{passive:true});
const mm=$('#mobileMenu'),mb=$('#menuBtn');
mb.addEventListener('click',()=>{
  const open=mm.classList.toggle('open');
  mb.setAttribute('aria-expanded',open);
  mb.innerHTML=ic(open?'x':'menu',18);
});
 $$('a',mm).forEach(a=>a.addEventListener('click',()=>{mm.classList.remove('open');mb.innerHTML=ic('menu',18)}));
function openBeta(){
  const ov=openModal(`<div class="betain">
    <h3 style="font-size:19px">Join the private beta</h3>
    <p style="font-size:13.5px;color:var(--ink-2);margin-top:8px;line-height:1.6">DesignOS heads to a private beta in 2026. Leave an email to hold a place — this concept stores nothing.</p>
    <input type="email" id="betaEmail" placeholder="you@team.com" aria-label="Email">
    <p class="err" id="betaErr">Enter a valid email address.</p>
    <div class="mfoot" style="margin-top:14px"><button class="btn btn-primary" id="betaGo" style="width:100%">Request access</button></div>
    <div class="ok" id="betaOk">${ic('check-circle',30)}<p class="t">You're on the list.</p><p class="s">№ 214 in queue · nothing was stored — this is a prototype.</p></div>
  </div>`);
  $('#betaGo',ov).addEventListener('click',()=>{
    const v=$('#betaEmail',ov).value.trim();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){$('#betaErr',ov).classList.add('on');return}
    $('#betaErr',ov).classList.remove('on');
    $('#betaOk',ov).classList.add('on');
    $('#betaGo',ov).style.display='none';
  });
}
 $('#tryBtn').addEventListener('click',openBeta);
 $('#tryBtnM').addEventListener('click',openBeta);
 $('#ctaBtn').addEventListener('click',openBeta);
 $('#signIn').addEventListener('click',()=>toast('Sign-in is disabled in this concept prototype.','info'));
 $('#signInM').addEventListener('click',()=>toast('Sign-in is disabled in this concept prototype.','info'));
 $('#navKbd').addEventListener('click',()=>openCmdk());

/* ---------- reveal on scroll ---------- */
const ro=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    const d=+(e.target.dataset.delay||0);
    setTimeout(()=>e.target.classList.add('on'),d);
    ro.unobserve(e.target);
  }
}),{threshold:.15,rootMargin:'0px 0px -40px'});
 $$('[data-reveal]').forEach(el=>ro.observe(el));

/* ---------- product sidebar builder ---------- */
const SIDE=[
  {id:'overview',n:'Overview',i:'grid',go:'#workspace'},
  {id:'projects',n:'Projects',i:'folder'},
  {id:'ds',n:'Design System',i:'layers',go:'#designsystem'},
  {id:'research',n:'Research',i:'flask',go:'#research'},
  {id:'decisions',n:'Decisions',i:'scale',go:'#decision'},
  {id:'skills',n:'AI Skills',i:'sparkle',go:'#skills',dot:true},
];
function buildSide(mountId,active){
  const m=$(mountId);
  m.innerHTML=SIDE.map(s=>`<button class="side-item ${s.id===active?'active':''}" data-id="${s.id}" ${s.go?`data-go="${s.go}"`:''}>${ic(s.i,15)}${s.n}${s.dot?'<span class="aidot" aria-hidden="true"></span>':''}</button>`).join('');
  $$('.side-item',m).forEach(b=>b.addEventListener('click',()=>{
    $$('.side-item',m).forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    if(b.dataset.go)$(b.dataset.go)?.scrollIntoView({behavior:RM?'auto':'smooth'});
  }));
}
buildSide('#heroSide','projects');
buildSide('#dashSide','overview');

/* ---------- pipeline / flow diagrams ---------- */
 $('#pipe').innerHTML=['Knowledge','Context','AI','Design Decision','System Learning']
  .map(t=>`<b>${t}</b>`).join(ic('arrow-right',13));
 $('#flowv').innerHTML=['Design Knowledge','Reusable Skill','Context','AI Reasoning','Recommendation']
  .map(t=>`<b>${t}</b>`).join(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M12 4v16m0 0-5-5m5 5 5-5"/></svg>`);
 $('#flowv').insertAdjacentHTML('beforeend',`<p style="font:400 10.5px var(--mono);color:var(--ink-3);margin-top:12px">SKILLS TURN REPEATED AI WORKFLOWS INTO REUSABLE PRODUCT CAPABILITIES.</p>`);

/* ================================================================
   HERO DEMO — Ask DesignOS
   ================================================================ */
const QUESTIONS=[
 {q:'Why should I use the existing confirmation modal here?',src:['Design System','Decisions','Guidelines'],
  a:'Your design system already uses Confirmation Modal for destructive actions — reusing it keeps the checkout consistent and inherits its accessibility rules.',
  rec:'Modal / Confirmation',
  why:['This pattern is already used in Account deletion','Used in Subscription cancellation','Used in Payment removal'],
  ev:[{t:'DS',n:'Design System v3.2',s:'Confirmation Modal — reserved for destructive or irreversible actions; requires an explicit confirm step.'},
      {t:'FL',n:'Cancellation Flow',s:'Figma · Payments v2 — modal wired after "Cancel subscription" since v2.4.'},
      {t:'GL',n:'Accessibility guideline #42',s:'Irreversible actions must be confirmable — WCAG 2.2 · 3.3.4.'}],
  conf:94,apply:'modal'},
 {q:'Why does this component exist?',src:['Design System','Decisions','Guidelines'],
  a:'The primary action follows the Payments team’s "one action per screen" rule for money movement, set in the 2024 checkout rebuild.',
  rec:'Button / Primary',
  why:['One primary action per screen — checkout rule #3','Money movement requires filled emphasis','The label states the exact amount'],
  ev:[{t:'DC',n:'Decision #138',s:'One-page checkout adopted; single CTA at order summary.'},
      {t:'DS',n:'Design System v3.2',s:'Button / Primary — reserved for the view’s main action.'},
      {t:'GL',n:'Checkout guidelines',s:'Rule 3: nothing competes with the pay action.'}],
  conf:88},
 {q:'Is there an existing pattern for this?',src:['Design System','Research'],
  a:'Yes — payment details use a compact form pattern with inline validation, shipped in the billing update flow.',
  rec:'Form / Payment Details',
  why:['Inline validation reduced abandonment by 11%','Matches the Stripe layout already in production','Reuses Input / Currency'],
  ev:[{t:'DS',n:'Payments module',s:'Form / Payment Details — 4 fields, inline errors, sticky CTA.'},
      {t:'RS',n:'Checkout study 2025',s:'P14: "I liked seeing errors right under the field."'},
      {t:'CP',n:'Input / Currency',s:'Formats on blur · validates against token type-currency.'}],
  conf:92},
 {q:'What does our research say?',src:['Research','Support'],
  a:'Users look for total-cost clarity before paying — 12 of 31 checkout participants hesitated at the review step.',
  rec:'Surface order summary above payment',
  why:['12 of 31 participants hesitated before the CTA','Totals were scanned 2.4× before paying','P07 asked "is tax included?" twice'],
  ev:[{t:'RS',n:'Checkout study 2025',s:'12/31 hesitation at the review step.'},
      {t:'RS',n:'Interview P07',s:'"Is tax included? I can’t tell from this screen."'},
      {t:'SU',n:'Support · billing',s:'214 tickets tagged "charge confusion", trailing 12 months.'}],
  conf:86},
 {q:'Is this accessible?',src:['Guidelines','Audits'],
  a:'Mostly — the Pay button passes contrast at 4.8:1, but card input errors currently rely on color alone.',
  rec:'Add icon + text to error states',
  why:['WCAG 1.4.1 — color is not the only signal','Guideline #12 requires icon + message','Screen readers skip color-only cues'],
  ev:[{t:'GL',n:'Accessibility guideline #12',s:'Errors: icon, text, and aria-live announcement.'},
      {t:'GL',n:'WCAG 2.2',s:'1.4.1 Use of Color (Level A).'},
      {t:'AU',n:'Payments audit 2025',s:'3 color-only error states found.'}],
  conf:90},
 {q:'How should this behave on mobile?',src:['Design System','Guidelines'],
  a:'Under 480px, bottom sheets replace modals across the product — confirmations included.',
  rec:'Sheet / Confirmation (mobile)',
  why:['Modals are hard to reach one-handed','The sheet already ships in mobile checkout','Guidelines set the 480px breakpoint'],
  ev:[{t:'DS',n:'Sheet component',s:'Mobile alternative to Modal · v3.2.'},
      {t:'GL',n:'Mobile guidelines',s:'Below 480px: sheet, not modal.'},
      {t:'CP',n:'Checkout mobile spec',s:'Confirmation rendered as sheet since 1.4.'}],
  conf:91},
 {q:'Has this decision been made before?',src:['Decisions','Research'],
  a:'Yes — in 2024 the team chose single-page checkout with a confirm step, over a two-step flow.',
  rec:'Follow Decision #138',
  why:['Two-step flow tested 9% slower to complete','Decision owner: Payments team','Revisited and upheld in Q1 2026'],
  ev:[{t:'DC',n:'Decision #138',s:'One-page checkout + confirmation — Feb 2024.'},
      {t:'RS',n:'A/B results Q3 2024',s:'Step 2 abandoned 9% more often.'},
      {t:'SL',n:'#payments',s:'Thread "keeping one page" — 41 replies, upheld.'}],
  conf:97},
];
const qChips=$('#qChips'),thread=$('#aiThread');
qChips.innerHTML=QUESTIONS.map((q,i)=>`<button class="chip ${i===0?'on':''}" data-i="${i}">${q.q}</button>`).join('');
let heroTok={cancelled:false};
function resetCanvas(){
  $('#frameVeil').classList.remove('in');
  $('#appliedChip').classList.remove('in');
}
async function runQ(i){
  heroTok.cancelled=true;const tok={cancelled:false};heroTok=tok;
  resetCanvas();
  $$('.chip',qChips).forEach((c,j)=>c.classList.toggle('on',j===i));
  const d=QUESTIONS[i];
  thread.innerHTML=`<div class="ai-q"><span class="who">YOU</span><p>${d.q}</p></div>
  <div class="ai-r">
    <div class="ai-rhead">${ic('sparkle',14)}DesignOS<span class="tm">now</span></div>
    <div class="consult"><span class="lbl">CONSULTING</span>${d.src.map(s=>`<span class="src"><span class="st"></span>${s}</span>`).join('')}</div>
    <p class="ai-sum"></p>
    <div class="ai-block pend"><div class="bl">Recommendation</div><div class="rec">${ic('box',14)}<code>${d.rec}</code></div></div>
    <div class="ai-block pend"><div class="bl">Why</div><ul>${d.why.map(w=>`<li>${w}</li>`).join('')}</ul></div>
    <div class="ai-block pend evb"><div class="bl">Evidence · click to expand</div>${d.ev.map(e=>`<div class="evrow" tabindex="0" role="button"><span class="evtag">${e.t}</span><span class="evname">${e.n}</span>${ic('chev-right',13)}</div><div class="evsn">${e.s}</div>`).join('')}</div>
    <div class="ai-conf pend" style="border:1px solid var(--line);border-radius:9px;padding:10px 12px;margin-top:10px"><div class="bl" style="font:500 9.5px var(--mono);letter-spacing:.14em;color:var(--ink-3);text-transform:uppercase;margin-bottom:8px">Confidence</div><div class="conf"><div class="bar"><i></i></div><span class="pct">0%</span></div></div>
    <div class="ai-actions pend"><button class="btn btn-primary btn-sm use">Use recommendation</button><button class="btn btn-outline btn-sm ev">View evidence</button></div>
  </div>`;
  $$('.evrow',thread).forEach(r=>r.addEventListener('click',()=>r.closest('.evb').classList.toggle('open')));
  thread.scrollTop=0;
  // sequential source consulting
  const pills=$$('.src',thread);
  for(const p of pills){
    if(tok.cancelled)return;
    p.classList.add('checking');await sleep(RM?0:460);
    if(tok.cancelled)return;
    p.classList.remove('checking');p.classList.add('ok');p.querySelector('.st').innerHTML=ic('check',11);
    await sleep(RM?0:90);
  }
  $('.consult',thread).classList.add('done');
  if(tok.cancelled)return;
  await typeInto($('.ai-sum',thread),d.a,tok,14);
  if(tok.cancelled)return;
  // staggered reveal of blocks
  const pends=$$('.pend',thread);
  for(const b of pends){
    if(tok.cancelled)return;
    b.classList.add('on');await sleep(RM?0:120);
  }
  countConf($('.pct',thread),$('.conf .bar i',thread),d.conf);
  const useBtn=$('.use',thread),evBtn=$('.ev',thread);
  useBtn.addEventListener('click',()=>{
    if(useBtn.classList.contains('done')){
      useBtn.classList.remove('done');useBtn.textContent='Use recommendation';resetCanvas();return;
    }
    useBtn.classList.add('done');
    if(d.apply==='modal'){
      $('#frameVeil').classList.add('in');
      $('#appliedChip').classList.add('in');
      useBtn.innerHTML=`${ic('check',13)}Applied — Undo`;
      toast('Modal / Confirmation applied to canvas — decision recorded.');
    }else{
      useBtn.innerHTML=`${ic('check',13)}Accepted — Undo`;
      toast('Recommendation accepted — decision recorded.');
    }
  });
  evBtn.addEventListener('click',()=>{
    const b=$('.evb',thread);b.classList.toggle('open');
    evBtn.textContent=b.classList.contains('open')?'Hide evidence':'View evidence';
  });
}
qChips.addEventListener('click',e=>{const c=e.target.closest('.chip');if(c)runQ(+c.dataset.i)});
 $('#undoChip').addEventListener('click',()=>{resetCanvas();toast('Recommendation undone — canvas restored.','undo')});
 $('#cmCancel').addEventListener('click',()=>{$('#frameVeil').classList.remove('in');$('#appliedChip').classList.remove('in')});
 $('#cmConfirm').addEventListener('click',()=>{
  toast('Confirmed — prototype flow complete.');
  setTimeout(()=>{$('#frameVeil').classList.remove('in')},700);
});
 $('#resync').addEventListener('click',()=>toast('All sources re-synced — 1,847 relationships.'));
/* tabs */
 $$('.tab').forEach(t=>t.addEventListener('click',()=>{
  $$('.tab').forEach(x=>x.setAttribute('aria-selected',x===t));
  const name=t.dataset.tab;
  $('#tabDesign').hidden=name!=='design';
  $('#tabContext').hidden=name!=='context';
  $('#tabReview').hidden=name!=='review';
}));
/* autoplay first question when visible */
const heroIO=new IntersectionObserver(es=>{
  if(es[0].isIntersecting){heroIO.disconnect();setTimeout(()=>runQ(0),700)}
},{threshold:.35});
heroIO.observe($('#heroApp'));

/* ================================================================
   WORKFLOW — scroll-driven stage
   ================================================================ */
const wfStepEls=$$('.wf-step'),wfStage=$('#wfStage');
let wfCur=-1,wfTok={cancelled:false};
const SRC_ROWS=[['layers','Design System'],['flask','Research'],['scale','Decisions']];
function block(html){const d=document.createElement('div');d.className='sin';d.innerHTML=html;return d}
async function renderStage(n){
  wfTok.cancelled=true;const tok={cancelled:false};wfTok=tok;
  wfStage.innerHTML='';
  if(n===0){
    wfStage.append(block(`<div class="s-prompt">${ic('sparkle',24)}<span class="t">Ask about this frame</span><span class="s">Patterns, rules, research — in context.</span><div class="fthumb"><div class="fl">NEW FRAME · PAYMENT STEP</div><div class="ln"></div><div class="ln s"></div><div class="ln s"></div></div></div>`));
    return;
  }
  const ask=block(`<div class="s-ask"><span class="q"></span>${ic('send',15)}</div>`);
  wfStage.append(ask);
  if(n===1){typeInto($('.q',ask),'Is there an existing pattern for this?',tok,26);return}
  $('.q',ask).textContent='Is there an existing pattern for this?';
  if(tok.cancelled)return;
  const cons=block(`<div class="s-consult"><span class="lbl">CONSULTING</span>${SRC_ROWS.map(r=>`<div class="s-src" data-s="${r[1]}">${ic(r[0],14)}${r[1]}<span class="st"></span></div>`).join('')}<div class="s-donenote"></div></div>`);
  wfStage.append(cons);
  const rows=$$('.s-src',cons);
  if(n===2){
    for(const r of rows){
      if(tok.cancelled)return;
      r.classList.add('check');await sleep(RM?0:520);
      if(tok.cancelled)return;
      r.classList.remove('check');r.classList.add('ok');r.querySelector('.st').innerHTML=ic('check',12);
    }
    if(tok.cancelled)return;
    $('.s-donenote',cons).textContent='18 MATCHES · 3 SOURCES';
    return;
  }
  rows.forEach(r=>{r.classList.add('ok');r.querySelector('.st').innerHTML=ic('check',12)});
  $('.s-donenote',cons).textContent='18 MATCHES · 3 SOURCES';
  if(tok.cancelled)return;
  const rec=block(`<div class="s-rec"><div class="bl">RECOMMENDATION</div><div class="rec">${ic('box',14)}<code>Form / Payment Details</code></div>
    <div style="margin-top:11px">${[['DS','Payments module'],['RS','Checkout study 2025']].map(e=>`<div class="evrow" style="padding:3px 0"><span class="evtag">${e[0]}</span><span class="evname">${e[1]}</span></div>`).join('')}</div>
    <div class="conf" style="margin-top:10px"><div class="bar" style="flex:1;height:4px;background:var(--surface-3);border-radius:2px;overflow:hidden"><i style="display:block;height:100%;width:0;background:var(--accent);transition:width .8s"></i></div><span class="mono" style="font:500 12px var(--mono)">0%</span></div></div>`);
  wfStage.append(rec);
  if(n===3){requestAnimationFrame(()=>{const b=$('.conf .bar i',rec),p=$('.conf .mono',rec);b.style.width='92%';p.textContent='92%'});return}
  requestAnimationFrame(()=>{$('.conf .bar i',rec).style.width='92%';$('.conf .mono',rec).textContent='92%'});
  if(tok.cancelled)return;
  if(n===4){
    const dec=block(`<div class="s-acts"><button class="btn btn-outline btn-sm">Modify</button><button class="btn btn-outline btn-sm">Reject</button><button class="btn btn-primary btn-sm acc">Accept</button></div>`);
    wfStage.append(dec);
    await sleep(RM?0:900);
    if(tok.cancelled)return;
    dec.innerHTML=`<div class="s-acc">${ic('check-circle',15)}Accepted · decision logged 2:41 PM</div>`;
    return;
  }
  wfStage.append(block(`<div class="s-acc">${ic('check-circle',15)}Accepted · decision logged 2:41 PM</div>`));
  if(tok.cancelled)return;
  wfStage.append(block(`<div class="s-learn"><div class="h">${ic('sparkle',15)}Decision #247 recorded</div><div class="d">Payment step → Form / Payment Details. 4 relationships added to the knowledge graph — this pattern now informs future recommendations.</div><div class="tag">SYSTEM LEARNING</div></div>`));
}
function wfUpdate(){
  const line=innerHeight*.5;let cur=0;
  wfStepEls.forEach((el,i)=>{if(el.getBoundingClientRect().top<line)cur=i});
  if(cur!==wfCur){
    wfCur=cur;
    wfStepEls.forEach((el,i)=>el.classList.toggle('on',i===cur));
    renderStage(cur);
    const p=cur/(wfStepEls.length-1);
    $('#wfTrack').style.height=(p*100)+'%';
    $('#wfFill').style.top=`calc(${p*100}% - 3px)`;
  }
}
let wfTick=false;
addEventListener('scroll',()=>{if(!wfTick){wfTick=true;requestAnimationFrame(()=>{wfUpdate();wfTick=false})}},{passive:true});
wfUpdate();

/* ================================================================
   AI SKILLS
   ================================================================ */
const SKILLS=[
 {n:'Design System Skill',i:'box',d:'Understand components, tokens and usage rules.',
  p:'Answers component, token and pattern questions from your live design system — usage rules included, not just the spec sheet.',
  inputs:['Component or layer selection','Token values','Frame context'],
  ctx:['Figma libraries','Design system docs','Adoption telemetry'],
  out:'The right component with its rules attached — never a lookalike.',
  ev:['Component specs','Usage guidelines','Recent project usage'],avg:92,range:'88–96% · based on system coverage',
  ex:{q:'Which component handles currency input?',steps:['Design System','Guidelines'],o:'Use Input / Currency — it formats on blur, validates against token type-currency, and pairs with helper text per guideline #31.'}},
 {n:'UX Review Skill',i:'eye',d:'Evaluate flows against product patterns and usability principles.',
  p:'Evaluates a flow against your product’s patterns and usability principles — before it reaches critique.',
  inputs:['Flow steps','Screens or prototypes','Review checklist'],
  ctx:['Product patterns','Past review notes','Usability principles'],
  out:'Friction points and pattern deviations, ranked by severity.',
  ev:['Pattern library','Review history','Heuristic set'],avg:86,range:'82–91% · based on pattern coverage',
  ex:{q:'Review the checkout flow before Thursday’s critique.',steps:['UX patterns','Research'],o:'3 findings: missing order summary before payment (pattern: Form / Payment), modal on mobile (guideline: Sheet), and an unlabeled destructive action.'}},
 {n:'Accessibility Skill',i:'a11y',d:'Identify accessibility risks and explain their impact.',
  p:'Identifies accessibility risks — contrast, focus order, semantics — and explains the impact in product terms, with the rule cited.',
  inputs:['Screens & layer trees','Color tokens','Interaction specs'],
  ctx:['WCAG 2.2','Team accessibility guidelines','Past audits'],
  out:'Risks with severity, affected users, and the exact rule cited.',
  ev:['WCAG criteria','Team guidelines','Audit results'],avg:90,range:'85–94% · deterministic checks + AI review',
  ex:{q:'Is the new payment form accessible?',steps:['WCAG 2.2','Guideline #12'],o:'One risk: card errors signal with color alone — fails 1.4.1. Add icon + text (guideline #12). Focus order and contrast pass.'}},
 {n:'Research Skill',i:'flask',d:'Connect design decisions to research evidence.',
  p:'Connects design decisions to research evidence — and never states an insight without its source.',
  inputs:['Design decision or question','Flow or component','Target audience'],
  ctx:['Interviews & studies','Support tickets','Analytics events'],
  out:'Evidence-backed findings with participant counts and quotes.',
  ev:['Study files','Interview notes','Ticket data'],avg:84,range:'80–89% · based on evidence coverage',
  ex:{q:'What do we know about cancellation behavior?',steps:['Studies','Tickets'],o:'Two studies, 31 participants: users misread cancellation consequences — 7 of 12 believed "Cancel" was reversible. 3 linked tickets.'}},
 {n:'Content Skill',i:'type',d:'Evaluate product language against content guidelines.',
  p:'Evaluates product language against your content guidelines — voice, clarity, and microcopy patterns.',
  inputs:['UI copy','Component context','Tone target'],
  ctx:['Content guidelines','Voice & tone doc','Localization notes'],
  out:'Rewrites with the rule cited — verbs first, consequence stated.',
  ev:['Guideline docs','Voice & tone','Past rewrites'],avg:88,range:'84–92% · based on guideline coverage',
  ex:{q:'Rewrite this confirmation message.',steps:['Content guidelines','Voice doc'],o:'"Your plan stays active until Mar 28." — states the consequence first (guideline #8); passive voice removed.'}},
 {n:'Product Strategy Skill',i:'target',d:'Connect design decisions to business and product goals.',
  p:'Connects design decisions to product goals — so "why" questions get business answers, not guesses.',
  inputs:['Decision or proposal','Screens in scope','Metrics of interest'],
  ctx:['Product strategy docs','Roadmap context','Experiment results'],
  out:'Alignment notes: which goal a decision serves, and what it risks.',
  ev:['Strategy docs','Roadmap','Experiment results'],avg:82,range:'78–87% · based on strategy coverage',
  ex:{q:'Should we invest in the empty states project?',steps:['Strategy','Roadmap'],o:'Empty states touch 3 Q3 retention bets — week-1 drop-off is the stated problem. One risk: 6 surfaces need coordinated rollout.'}},
];
 $('#skillGrid').innerHTML=SKILLS.map((s,i)=>`<button class="skill" data-i="${i}">
  <span class="icb">${ic(s.i,19)}</span><h3>${s.n}</h3><p>${s.d}</p>
  <span class="ft">View Skill ${ic('arrow-right',14)}</span></button>`).join('');
 $('#skillGrid').addEventListener('click',e=>{
  const c=e.target.closest('.skill');if(c)openSkill(+c.dataset.i);
});
function openSkill(i){
  const s=SKILLS[i];
  const ov=openModal(`<div class="sk-top"><span class="sk-ic">${ic(s.i,21)}</span><div><h3>${s.n}</h3><span class="sk-tag">AI SKILL · DESIGNOS</span></div></div>
  <dl class="spec">
    <div><dt>Purpose</dt><dd class="standout">${s.p}</dd></div>
    <div><dt>Inputs</dt><dd><span class="tagchips">${s.inputs.map(t=>`<span class="tchip">${t}</span>`).join('')}</span></dd></div>
    <div><dt>Context</dt><dd><span class="tagchips">${s.ctx.map(t=>`<span class="tchip">${t}</span>`).join('')}</span></dd></div>
    <div><dt>Output</dt><dd>${s.out}</dd></div>
    <div><dt>Evidence</dt><dd><span class="tagchips">${s.ev.map(t=>`<span class="tchip">${t}</span>`).join('')}</span></dd></div>
    <div><dt>Confidence</dt><dd><span style="display:flex;align-items:center;gap:10px"><span style="flex:1;height:4px;background:var(--surface-3);border-radius:2px;overflow:hidden;display:block"><i style="display:block;height:100%;width:${s.avg}%;background:var(--accent)"></i></span><span class="mono" style="font:400 11.5px var(--mono);color:var(--ink-2)">${s.range}</span></span></dd></div>
  </dl>
  <div class="ex"><div class="ex-h">EXAMPLE RUN</div>
    <span class="ex-q">${ic('user',14)} “${s.ex.q}”</span>
    <div class="ex-run" id="exRun"><button class="btn btn-outline btn-sm" id="exGo">${ic('play',13)}Run example</button></div>
  </div>`);
  let ran=false;
  $('#exGo',ov).addEventListener('click',async()=>{
    if(ran)return;ran=true;
    const run=$('#exRun',ov);
    run.innerHTML=`<div class="srcs" style="display:flex;gap:7px;flex-wrap:wrap">${s.ex.steps.map(t=>`<span class="src">${t}<span class="st"></span></span>`).join('')}</div><p class="out"></p>`;
    const pills=$$('.src',run);
    for(const p of pills){p.classList.add('checking');await sleep(RM?0:480);p.classList.remove('checking');p.classList.add('ok');p.querySelector('.st').innerHTML=ic('check',11)}
    await typeInto($('.out',run),s.ex.o,null,14);
  });
}

/* ================================================================
   DESIGN SYSTEM panel
   ================================================================ */
const DS={
 button:{g:'Components',i:'box',name:'Button / Primary',uses:142,upd:'3d ago',ai:true,
  p:'Carries the single most important action in a view — money, creation, confirmation.',
  variants:['Primary','Secondary','Ghost','Destructive'],states:['Default','Hover','Focus','Active','Disabled','Loading'],
  tokens:['space-3 · padding','radius-2 · 8px','text-body / medium','color-action','height 40px'],
  usage:['One primary button per view','Labels are verbs — "Pay", never "OK"','Never for navigation'],
  a11y:'Focus ring 2px color-action · minimum target 40×40 · loading announced via aria-busy.'},
 modal:{g:'Components',i:'msg',name:'Modal / Base',uses:38,upd:'2w ago',
  p:'Focuses attention on one decision or task, above the page.',
  variants:['Base','Confirmation','Form'],states:['Open','Closing','Scrim press'],
  tokens:['elevation-3','radius-3 · 12px','space-5 · padding'],
  usage:['Reserve for decisions that block the flow','Confirmation variant for destructive actions','Never stack modals'],
  a11y:'Traps focus · closes on Esc · returns focus to the trigger.'},
 input:{g:'Components',i:'type',name:'Input / Text',uses:216,upd:'5d ago',
  p:'Collects a single line of structured input with inline validation.',
  variants:['Text','Currency','Search'],states:['Default','Focus','Filled','Error','Disabled'],
  tokens:['height 40px','text-body','color-border','focus ring 2px'],
  usage:['Label always visible — never placeholder-only','Helper text below; error replaces it','Validate on blur'],
  a11y:'Errors announced via aria-live · icon + text, never color alone.'},
 dropdown:{g:'Components',i:'chev-down',name:'Dropdown / Menu',uses:57,upd:'1mo ago',
  p:'Selects one option from a known set without leaving the page.',
  variants:['Select','Action menu'],states:['Closed','Open','Keyboard nav'],
  tokens:['radius-2','elevation-2','item height 36px'],
  usage:['Max 8 visible items before adding search','No nested menus'],
  a11y:'Full arrow-key navigation · selected item aria-checked.'},
 card:{g:'Components',i:'square',name:'Card / Base',uses:98,upd:'2w ago',
  p:'Groups related content into a scannable, tappable unit.',
  variants:['Base','Interactive','Static'],states:['Default','Hover (interactive)','Pressed'],
  tokens:['radius-3','space-4','elevation-0'],
  usage:['Interactive cards get one tap target','No cards inside cards'],
  a11y:'Whole-card tap target exposes an aria role.'},
 table:{g:'Components',i:'grid',name:'Table / Data',uses:44,upd:'3w ago',
  p:'Dense comparison and scanning of homogeneous records.',
  variants:['Base','With bulk actions'],states:['Default','Row hover','Row selected'],
  tokens:['row height 44px','text-body / regular','space-2'],
  usage:['Sticky header beyond 8 rows','Empty state required — see Empty State pattern'],
  a11y:'Sortable headers announce state · row selection announced.'},
 typography:{g:'Tokens',i:'type',name:'Typography / Scale',uses:0,upd:'1mo ago',
  p:'A five-step scale for product surfaces — no custom sizes anywhere.',
  values:['Display 32/40 · Semibold','Title 20/28 · Semibold','Heading 16/24 · Semibold','Body 15/24 · Regular','Mono 13/20 · meta only'],
  usage:['Never skip more than one step','Mono is for values and meta — never body copy'],
  a11y:'Body stays at 15px minimum for reading comfort.'},
 spacing:{g:'Tokens',i:'ruler',name:'Spacing / Grid',uses:0,upd:'1mo ago',
  p:'A 4px base grid — everything sits on it.',
  values:['space-1 · 4px','space-2 · 8px','space-3 · 12px','space-4 · 16px','space-5 · 24px','space-6 · 32px'],
  usage:['Component internals use steps 1–3','Layout gaps use steps 4–6'],
  a11y:'Consistent rhythm lowers cognitive load — WCAG 2.4 readable pacing.'},
 color:{g:'Tokens',i:'droplet',name:'Color / Roles',uses:0,upd:'2w ago',
  p:'Roles, not hexes — surfaces, ink, action, danger.',
  values:['surface / #FFFFFF','surface-2 / #F2F2F4','ink / #16171A','action / #3F4DE8','danger / #C7382F'],
  usage:['Action color is reserved for primary actions and AI indicators — never decoration','Danger never for emphasis, only destruction'],
  a11y:'All text pairs meet 4.5:1 · non-text indicators 3:1.'},
 radius:{g:'Tokens',i:'square',name:'Radius / Steps',uses:0,upd:'1mo ago',
  p:'Two radii, mapped to elevation level.',
  values:['radius-2 · 8px — controls','radius-3 · 12px — containers & overlays'],
  usage:['Controls never borrow the container radius'],
  a11y:'Larger radii on touch targets read as tappable.'},
 elevation:{g:'Tokens',i:'layers',name:'Elevation / Levels',uses:0,upd:'1mo ago',
  p:'Four levels, tied to layer — not to importance.',
  values:['e-0 · flat, border only','e-1 · card','e-2 · popover','e-3 · modal'],
  usage:['If two elements overlap, the higher layer gets the higher level'],
  a11y:'Shadows never carry meaning on their own.'},
 empty:{g:'Patterns',i:'inbox',name:'Empty State',uses:61,upd:'1w ago',
  p:'Explains an absence, its cause, and the next action.',
  structure:['Icon · 24 · ink-3 (decorative)','Title · Heading','One line of body','A single action'],
  usage:['One action, never two','Never inside modals'],
  a11y:'Icon marked decorative · action reachable in tab order after text.'},
 error:{g:'Patterns',i:'alert',name:'Error State',uses:47,upd:'2w ago',
  p:'Says what went wrong, why, and how to recover.',
  structure:['Icon + code · mono','Plain-language cause','Recovery action'],
  usage:['Never blame the user','Never "Something went wrong" alone'],
  a11y:'Announced via aria-live · recovery action is the next tab stop.'},
 confirmation:{g:'Patterns',i:'check-circle',name:'Confirmation',uses:33,upd:'1mo ago',
  p:'A deliberate pause before destructive or irreversible actions.',
  structure:['Modal or Sheet','Consequence stated first','Cancel stays neutral'],
  usage:['Confirmation for irreversible actions only — not for every save'],
  a11y:'Focus starts on the destructive label, not Cancel.'},
 onboarding:{g:'Patterns',i:'users',name:'Onboarding',uses:12,upd:'2mo ago',
  p:'Progressive disclosure of value — teach at the moment of use.',
  structure:['3 steps maximum','Skip always visible','One skill per step'],
  usage:['Never gate core flows behind tours'],
  a11y:'Progress announced · Skip is a real button, not a corner link.'},
};
const DS_ORDER={Components:['button','modal','input','dropdown','card','table'],Tokens:['typography','spacing','color','radius','elevation'],Patterns:['empty','error','confirmation','onboarding']};
const dsTree=$('#dsTree');
dsTree.innerHTML=Object.entries(DS_ORDER).map(([g,keys])=>`<div class="tg">${g.toUpperCase()}</div>${keys.map(k=>`<button class="titem" data-k="${k}">${ic(DS[k].i,14)}${DS[k].name.split(' /')[0]}<span class="use">${DS[k].uses||''}</span></button>`).join('')}`).join('');
function renderDS(k){
  const d=DS[k];
  $$('.titem',dsTree).forEach(t=>t.classList.toggle('on',t.dataset.k===k));
  const chipRow=(label,arr,mono)=>arr?`<div class="ds-sec"><span class="lb">${label}</span><span class="tagchips">${arr.map(v=>`<span class="tchip ${mono?'m':''}">${v}</span>`).join('')}</span></div>`:'';
  const listSec=(label,arr)=>arr?`<div class="ds-sec"><span class="lb">${label}</span><ul>${arr.map(v=>`<li>${v}</li>`).join('')}</ul></div>`:'';
  $('#dsDetail').innerHTML=`
    <div class="ds-crumb">${d.g.toUpperCase()} / ${d.name.split(' /')[0].toUpperCase()}</div>
    <h3>${d.name}</h3>
    <div class="ds-meta">${d.uses?`${d.uses} USES THIS QUARTER · `:''}DS v3.2 · UPDATED ${d.upd.toUpperCase()}</div>
    <div class="ds-sec" style="border-top:0;padding-top:18px"><span class="lb">Purpose</span><span class="vv standout">${d.p}</span></div>
    ${chipRow('Variants',d.variants)}
    ${chipRow('States',d.states)}
    ${chipRow('Tokens',d.tokens,true)}
    ${chipRow('Values',d.values,true)}
    ${chipRow('Anatomy',d.structure)}
    ${listSec('Usage',d.usage)}
    <div class="ds-sec"><span class="lb">Accessibility</span><span class="vv">${ic('shield',13)} ${d.a11y}</span></div>
    ${d.ai?`<div class="aicard"><div class="h">${ic('sparkle',15)}This component has been used inconsistently in 3 recent projects.</div>
      <p>Detected in Billing settings, Marketing site and Mobile checkout.</p>
      <div class="row"><button class="btn btn-primary btn-sm" id="dsReview">Review variations</button></div></div>`:''}`;
  const rv=$('#dsReview');
  if(rv)rv.addEventListener('click',openVariations);
}
dsTree.addEventListener('click',e=>{const t=e.target.closest('.titem');if(t)renderDS(t.dataset.k)});
renderDS('button');
function openVariations(){
  const ov=openModal(`<h3 style="font-size:19px">Button — 3 variations detected</h3>
  <p style="font-size:13.5px;color:var(--ink-2);margin-top:7px">Same component, three drifts. Left unchecked, each becomes the local "correct" version.</p>
  <div style="margin-top:20px">
    ${[['Billing settings','Ghost button used as a primary action',['border 1.5px','radius 6','height 36']],
       ['Marketing site','Custom padding and radius',['radius 4','space-4','label 14']],
       ['Mobile checkout','Scaled-down primary',['height 36','text 14','shadow e-1']]]
      .map(v=>`<div class="mvar"><div class="h"><span class="t">${v[0]}</span></div><div class="fl">${v[1]}</div>
      <div class="diffs">${v[2].map(d=>`<span>${d}</span>`).join('')}</div><a class="lk" href="#" data-toast="Opening Figma file…">Open in Figma ${ic('arrow-right',12)}</a></div>`).join('')}
  </div>
  <div class="mfoot"><span class="n">Proposing Button / Primary as the standard.</span>
  <button class="btn btn-primary btn-sm" id="std">Standardize across 3 projects</button>
  <button class="btn btn-outline btn-sm" data-close>Dismiss</button></div>`);
  $('#std',ov).addEventListener('click',()=>{closeModal();toast('Proposal #31 created — Billing, Marketing and Mobile notified.')});
  $('[data-close]',ov).addEventListener('click',closeModal);
  $$('[data-toast]',ov).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();toast(a.dataset.toast,'link')}));
}
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-toast]');
  if(t&&!t.closest('.modal')&&!t.closest('#modalRoot'))toast(t.dataset.toast,'link');
});

/* ================================================================
   EVOLUTION
   ================================================================ */
const simIO=new IntersectionObserver(es=>{if(es[0].isIntersecting){simIO.disconnect();setTimeout(()=>{$('#simBar').style.width='82%'},400)}},{threshold:.4});
simIO.observe($('#simBar'));
function evoDone(msg,icon){
  $('#evoActions').innerHTML=`<span class="okc" style="display:flex;margin-left:auto;align-items:center;gap:8px;color:var(--acc-text);font-weight:500;font-size:13.5px">${ic(icon,15)}${msg}</span>`;
}
 $('#evoDismiss').addEventListener('click',()=>{evoDone('Dismissed — DesignOS will keep watching this pattern.','undo');toast('Dismissed. DesignOS will keep watching this pattern.','undo')});
 $('#evoReview').addEventListener('click',()=>{
  const ov=openModal(`<h3 style="font-size:19px">Empty State / Standard — proposed component</h3>
  <span class="sk-tag">SYSTEM PROPOSAL · #77</span>
  <p style="font-size:13.5px;color:var(--ink-2);margin-top:12px;line-height:1.6">A single component merged from 3 team variants — shared structure, configurable action slot.</p>
  <dl class="spec" style="margin-top:10px">
    <div><dt>Anatomy</dt><dd><span class="tagchips">${['Icon · 24','Title · Heading','Body · one line','Action slot'].map(t=>`<span class="tchip">${t}</span>`).join('')}</span></dd></div>
    <div><dt>Tokens</dt><dd><span class="tagchips">${['radius-3','space-5','scale / Heading+Body'].map(t=>`<span class="tchip m">${t}</span>`).join('')}</span></dd></div>
    <div><dt>Rules</dt><dd><ul><li>One action — link or button, never both</li><li>Never inside modals</li><li>Icon is decorative</li></ul></dd></div>
    <div><dt>Adoption</dt><dd>Replaces 6 surfaces across Payments, Projects and Notifications.</dd></div>
  </dl>
  <div class="mfoot"><span class="n">2 of 3 teams already reviewed.</span>
  <button class="btn btn-primary btn-sm" id="evoCreate">Create component</button>
  <button class="btn btn-outline btn-sm" data-close>Dismiss</button></div>`);
  $('#evoCreate',ov).addEventListener('click',()=>{closeModal();evoDone('Empty State / Standard added to your design system.','check-circle');toast('Empty State / Standard added to Design System — proposal #77.')});
  $('[data-close]',ov).addEventListener('click',()=>{closeModal();evoDone('Dismissed — DesignOS will keep watching this pattern.','undo')});
});

/* ================================================================
   DECISION — apply pattern to the flow
   ================================================================ */
let dApplied=false;
 $('#dApply').addEventListener('click',()=>{
  if(dApplied){ // undo
    dApplied=false;
    $('#flNew')?.remove();$('#flNewArr')?.remove();
    $('#flEndSub').textContent='immediate · no undo';
    $('#flowVer').textContent='v0.3';
    $('#recChip').classList.remove('in');
    $('#dApply').classList.remove('done');$('#dApply').textContent='Apply pattern';
    toast('Undone — flow restored to v0.3.','undo');return;
  }
  dApplied=true;
  const end=$('#flEnd');
  end.insertAdjacentHTML('beforebegin',
    `<span class="flarr" id="flNewArr">${ic('arrow-right',16)}</span>
     <div class="flnode new" id="flNew"><span class="ap">${ic('sparkle',10)} APPLIED</span><div class="n">Confirm cancellation</div><div class="s">consequence stated · neutral cancel</div></div>`);
  $('#flEndSub').textContent='confirmed · two-step';
  $('#flowVer').textContent='v0.4';
  $('#recChip').classList.add('in');
  $('#dApply').classList.add('done');$('#dApply').innerHTML=`${ic('check',13)}Pattern applied — Undo`;
  toast('Confirmation step applied — decision #248 recorded.');
});
 $('#dEvidence').addEventListener('click',()=>{
  $('#dRecCard').classList.toggle('open');
  $('#dEvidence').textContent=$('#dRecCard').classList.contains('open')?'Hide evidence':'View evidence';
});
 $('#dFollow').addEventListener('click',()=>{
  const fu=$('#dFu');fu.classList.toggle('in');
  $('#dFollow').textContent=fu.classList.contains('in')?'Hide follow-up':'Ask follow-up';
  if(fu.classList.contains('in'))typeInto($('.fa p',fu),'State the consequence and what’s retained: "Your plan stays active until Mar 28. Your data is kept for 30 days." — verb first, consequence before reassurance.',null,13);
});
const dIO=new IntersectionObserver(es=>{if(es[0].isIntersecting){dIO.disconnect();setTimeout(()=>{countConf($('#dConfPct'),$('#dConfBar'),91)},600)}},{threshold:.35});
dIO.observe($('#dRecCard'));

/* ================================================================
   DASHBOARD
   ================================================================ */
 $$('#dashList [data-acc]').forEach(b=>b.addEventListener('click',()=>{
  const row=b.closest('.drowi');
  if(row.classList.contains('done'))return;
  row.classList.add('done');
  toast('Decision recorded — future recommendations updated.');
}));
 $$('#dashList [data-go]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.go)?.scrollIntoView({behavior:RM?'auto':'smooth'})));
 $$('#dashList [data-var]').forEach(b=>b.addEventListener('click',openVariations));
const covIO=new IntersectionObserver(es=>{if(es[0].isIntersecting){covIO.disconnect();setTimeout(()=>$('#covBar').style.width='91%',400)}},{threshold:.4});
covIO.observe($('#covBar'));
const goCmdk=()=>openCmdk();
 $('#dashSearch').addEventListener('click',goCmdk);
 $('#dashSearch').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')goCmdk()});

/* ================================================================
   UNIVERSAL SEARCH — inline + ⌘K overlay
   ================================================================ */
const INDEX=[
 {g:'Design System',gi:'layers',t:'Empty State guideline',s:'Patterns · anatomy & rules',go:'#designsystem'},
 {g:'Design System',gi:'layers',t:'Button / Primary',s:'Components · 142 uses',go:'#designsystem'},
 {g:'Design System',gi:'layers',t:'Typography / Scale',s:'Tokens · five steps',go:'#designsystem'},
 {g:'Components',gi:'box',t:'EmptyState / Default',s:'Component · 6 uses in production',go:'#designsystem'},
 {g:'Components',gi:'box',t:'Input / Currency',s:'Component · formats on blur',go:'#designsystem'},
 {g:'Research',gi:'flask',t:'Empty state usability study',s:'2025 · 31 participants',go:'#research'},
 {g:'Research',gi:'flask',t:'Cancellation study 2025',s:'Interviews · 12 participants',go:'#research'},
 {g:'Research',gi:'flask',t:'Checkout study 2025',s:'Mixed methods · 31 participants',go:'#research'},
 {g:'Decisions',gi:'scale',t:'Dashboard redesign decision',s:'#142 · Feb 2025 · data density rules',go:'#decision'},
 {g:'Decisions',gi:'scale',t:'Decision #138 — one-page checkout',s:'Feb 2024 · Payments team',go:'#decision'},
 {g:'Guidelines',gi:'file',t:'Accessibility guideline #42',s:'Confirmable destruction · WCAG 3.3.4',go:'#designsystem'},
 {g:'Guidelines',gi:'file',t:'Mobile guidelines',s:'Below 480px: sheets, not modals',go:'#designsystem'},
 {g:'AI Skill',gi:'sparkle',t:'UX Review Skill',s:'Evaluates flows against patterns',go:'#skills',skill:1},
 {g:'AI Skill',gi:'sparkle',t:'Research Skill',s:'Connects decisions to evidence',go:'#skills',skill:3},
];
const GROUP_ORDER=['Design System','Components','Research','Decisions','Guidelines','AI Skill'];
const AI_ANSWERS=[
 {k:['empty'],go:'#designsystem',conf:89,src:['Empty State guideline','EmptyState / Default','UX Review Skill'],
  t:'Empty states should explain the absence, why it happened, and the next action. Your guideline allows one action — and in tables, keep the headers so the structure persists.'},
 {k:['cancel','confirm'],go:'#decision',conf:91,src:['Decision #96','Confirmation pattern','Cancellation study 2025'],
  t:'Irreversible actions take a confirmation step; reversible ones shouldn’t. Cancellation needs it — 7 of 12 participants thought "Cancel" was reversible.'},
 {k:['button'],go:'#designsystem',conf:93,src:['Button / Primary','Checkout guidelines'],
  t:'Primary buttons carry the view’s main action — one per screen, with the amount in the label. Ghost variants are for secondary actions, never the money action.'},
 {k:['research','study','evidence','billing'],go:'#research',conf:84,src:['Checkout study 2025','Support · billing'],
  t:'Recent evidence: the 2025 checkout study (31 participants) and 214 support tickets tagged "billing confusion" both point to unclear consequences at cancellation.'},
];
function aiFor(q){
  const lq=q.toLowerCase();
  for(const a of AI_ANSWERS)if(a.k.some(k=>lq.includes(k)))return a;
  return null;
}
function createSearch(mount,opts={}){
  mount.innerHTML=`<div class="sbox">
    <div class="sbox-in">${ic('search',17)}<input type="text" placeholder="Ask anything about your product…" aria-label="Search your product"></div>
    <div class="sres"></div>
    <div class="sfoot"><span>↑↓ NAVIGATE</span><span>↵ ASK DESIGNOS</span><span>${opts.overlay?'ESC TO CLOSE':'GROUNDED IN YOUR SOURCES'}</span></div>
  </div>`;
  const input=$('input',mount),res=$('.sres',mount);
  let rows=[],active=-1,aiEl=null,tok={cancelled:false};
  function resultRow(it){
    return `<button class="srow" data-go="${it.go||''}" data-skill="${it.skill??''}">
      ${ic(it.gi,15)}<span><span class="t">${it.t}</span><br><span class="s">${it.s}</span></span>
      <span class="go">${ic('enter',14)}</span></button>`;
  }
  function render(){
    const q=input.value.trim().toLowerCase();
    tok.cancelled=true;
    let html='';
    if(aiEl)html+=aiEl;
    const hits=INDEX.filter(it=>!q||it.t.toLowerCase().includes(q)||it.s.toLowerCase().includes(q));
    if(!q&&!aiEl){
      html+=`<div class="sgrp">SUGGESTED</div>`+INDEX.slice(0,4).map(resultRow).join('');
    }else{
      const groups={};
      hits.forEach(it=>(groups[it.g]=groups[it.g]||[]).push(it));
      GROUP_ORDER.forEach(g=>{
        if(!groups[g])return;
        html+=`<div class="sgrp">${g} · ${groups[g].length}</div>`+groups[g].map(resultRow).join('');
      });
      if(!hits.length&&!aiEl)html+=`<div class="sgrp">NO DIRECT MATCH — PRESS ↵ TO ASK DESIGNOS</div>`;
    }
    res.innerHTML=html;
    rows=$$('.srow',res);active=-1;
    $$('.srow',res).forEach(r=>r.addEventListener('click',()=>{
      if(r.dataset.skill)openSkill(+r.dataset.skill);
      else if(r.dataset.go)$(r.dataset.go)?.scrollIntoView({behavior:RM?'auto':'smooth'});
      if(opts.onNavigate)opts.onNavigate();
    }));
  }
  async function askAI(){
    const q=input.value.trim();if(!q)return;
    const a=aiFor(q);
    const ans=a||{t:`Here’s what I found across your sources for “${q}” — the strongest matches are below.`,src:INDEX.slice(0,3).map(x=>x.t),go:null};
    aiEl=`<div class="sans"><div class="h">${ic('sparkle',12)}ANSWER · GROUNDED IN YOUR SOURCES</div><p class="anst"></p>
      <div class="srcs">${ans.src.map(s=>`<span>${s}</span>`).join('')}</div>
      ${ans.conf?`<div class="cf"><div class="bar"><i></i></div><span class="pct">0%</span></div>`:''}
      ${ans.go?`<a class="lk" href="${ans.go}">Open source ${ic('arrow-right',12)}</a>`:''}</div>`;
    render();
    // scroll answer into view inside results
    const p=$('.sans p',res);
    const t2={cancelled:false};
    await typeInto(p,ans.t,t2,13);
    if(ans.conf){
      const bar=$('.sans .cf i',res),pct=$('.sans .cf .pct',res);
      requestAnimationFrame(()=>{bar.style.width=ans.conf+'%';countConf(pct,bar,ans.conf)});
    }
    const lk=$('.sans .lk',res);
    if(lk)lk.addEventListener('click',e=>{e.preventDefault();$(ans.go)?.scrollIntoView({behavior:RM?'auto':'smooth'});if(opts.onNavigate)opts.onNavigate()});
  }
  input.addEventListener('input',()=>{aiEl=null;render()});
  input.addEventListener('keydown',e=>{
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){
      e.preventDefault();
      if(!rows.length)return;
      active=(active+(e.key==='ArrowDown'?1:-1)+rows.length)%rows.length;
      rows.forEach((r,i)=>r.classList.toggle('act',i===active));
      rows[active].scrollIntoView({block:'nearest'});
    }else if(e.key==='Enter'){
      e.preventDefault();
      if(active>=0&&rows[active])rows[active].click();
      else askAI();
    }
  });
  render();
  return {focus:()=>input.focus()};
}
createSearch($('#searchInline'));
 $$('.ex-q .chip').forEach(c=>c.addEventListener('click',()=>{
  $$('.ex-q .chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');
}));
 $$('[data-ex]').forEach(c=>c.addEventListener('click',()=>{
  const inp=$('#searchInline input');
  inp.value=c.dataset.ex;inp.dispatchEvent(new Event('input'));
  inp.focus();
  // trigger the AI answer
  const ev=new KeyboardEvent('keydown',{key:'Enter'});
  setTimeout(()=>inp.dispatchEvent(ev),60);
}));

/* ⌘K overlay */
let cmdk=null,cmdkSearch=null;
function openCmdk(){
  if(cmdk){closeCmdk();return}
  cmdk=document.createElement('div');
  cmdk.className='overlay';cmdk.id='cmdk';
  cmdk.innerHTML=`<div class="cmdk" role="dialog" aria-modal="true" aria-label="Universal search"><div id="cmdkMount"></div></div>`;
  document.body.append(cmdk);
  document.body.style.overflow='hidden';
  cmdk.addEventListener('mousedown',e=>{if(e.target===cmdk)closeCmdk()});
  cmdkSearch=createSearch($('#cmdkMount',cmdk),{overlay:true,onNavigate:closeCmdk});
  setTimeout(()=>cmdkSearch.focus(),50);
}
function closeCmdk(){
  if(!cmdk)return;
  cmdk.remove();cmdk=null;document.body.style.overflow='';
}
addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){
    e.preventDefault();
    if(activeOverlay)closeModal();
    openCmdk();
  }else if(e.key==='Escape'){
    if(cmdk)closeCmdk();
    else if(activeOverlay)closeModal();
    else if(mm.classList.contains('open')){mm.classList.remove('open');mb.innerHTML=ic('menu',18)}
  }
});

/* init static icons */
initIcons();