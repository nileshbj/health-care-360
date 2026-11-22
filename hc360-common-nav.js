document.addEventListener('DOMContentLoaded',()=>{
 const nav=document.getElementById('hc360-main-nav'),toggle=document.querySelector('.hc360-menu-toggle');
 const dropdown=document.querySelector('.hc360-nav .service-dropdown'),trigger=dropdown?.querySelector('.service-trigger');
 let menuHistory=false;
 const backdrop=document.createElement('div');backdrop.className='hc360-menu-backdrop';document.body.appendChild(backdrop);
 const setClosed=()=>{if(!nav||!toggle)return;nav.classList.remove('is-open');backdrop.classList.remove('is-visible');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');toggle.textContent='☰';};
 const closeMenu=(back=true)=>{if(!nav||!toggle)return;const was=nav.classList.contains('is-open');setClosed();if(back&&menuHistory&&was){menuHistory=false;if(history.state?.hc360Menu)history.back();}};
 const openMenu=()=>{nav?.classList.add('is-open');backdrop.classList.add('is-visible');toggle?.setAttribute('aria-expanded','true');toggle?.setAttribute('aria-label','Close navigation');toggle.textContent='×';try{history.pushState({...history.state,hc360Menu:true},'','#menu');menuHistory=true;}catch(e){}};
 toggle?.addEventListener('click',()=>nav.classList.contains('is-open')?closeMenu():openMenu());
 backdrop.addEventListener('click',()=>closeMenu());
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{closeMenu();dropdown?.classList.remove('is-open');}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();dropdown?.classList.remove('is-open');}});
 window.addEventListener('popstate',()=>{if(nav?.classList.contains('is-open')){menuHistory=false;setClosed();}dropdown?.classList.remove('is-open');});
 trigger?.addEventListener('click',e=>{e.stopPropagation();const opened=!dropdown.classList.contains('is-open');dropdown.classList.toggle('is-open',opened);trigger.setAttribute('aria-expanded',String(opened));});
 document.addEventListener('pointerdown',e=>{if(dropdown&&!dropdown.contains(e.target))dropdown.classList.remove('is-open');});
 const lang=document.querySelector('.hc360-nav .langselect');
 if(lang){try{const saved=localStorage.getItem('hc360-language');if(saved&&['en','mr','hi'].includes(saved)){lang.value=saved;if(typeof setLang==='function')setLang(saved);else if(typeof changeLanguage==='function')changeLanguage(saved);}}catch(e){}}
 // Scroll progress indicator: sticky directly beneath the site navigation.
 const fill=document.getElementById('hc360-progress-fill');
 const siteHeader=document.querySelector('.hc360-site-header');
 let progressFrame=0;
 const measureHeader=()=>{
  if(!siteHeader)return;
  const headerHeight=Math.ceil(siteHeader.getBoundingClientRect().height);
  document.documentElement.style.setProperty('--hc360-header-height',headerHeight+'px');
 };
 const updateProgress=()=>{
  if(!fill)return;
  if(progressFrame)cancelAnimationFrame(progressFrame);
  progressFrame=requestAnimationFrame(()=>{
   measureHeader();
   const root=document.scrollingElement||document.documentElement;
   const pageHeight=Math.max(root.scrollHeight,document.body?.scrollHeight||0,document.documentElement.scrollHeight||0);
   const viewportHeight=window.innerHeight||document.documentElement.clientHeight;
   const maxScroll=Math.max(0,pageHeight-viewportHeight);
   const currentScroll=Math.max(0,window.scrollY||root.scrollTop||0);
   const ratio=maxScroll>0?Math.min(1,Math.max(0,currentScroll/maxScroll)):0;
   fill.style.width=(ratio*100).toFixed(2)+'%';
   fill.setAttribute('aria-valuenow',String(Math.round(ratio*100)));
  });
 };
 window.addEventListener('scroll',updateProgress,{passive:true});
 window.addEventListener('resize',updateProgress,{passive:true});
 window.addEventListener('load',updateProgress);
 window.addEventListener('pageshow',updateProgress);
 if('ResizeObserver'in window){
  const progressObserver=new ResizeObserver(updateProgress);
  if(document.body)progressObserver.observe(document.body);
  if(siteHeader)progressObserver.observe(siteHeader);
 }
 measureHeader();
 updateProgress();
 // Two-message hero carousel
 const title=document.getElementById('heroRotatorTitle'),progress=document.getElementById('heroSlideProgress'),dots=[...document.querySelectorAll('.hero-dot')];
 if(title&&dots.length){
  const slides=[{en:'Good decisions begin with good guidance.',mr:'चांगले निर्णय योग्य मार्गदर्शनातून सुरू होतात.',hi:'अच्छे फैसले सही मार्गदर्शन से शुरू होते हैं.'},{en:'Know your options. Choose with clarity.',mr:'तुमचे पर्याय जाणून घ्या. स्पष्टतेने निवडा.',hi:'अपने विकल्प जानें। स्पष्टता से चुनें.'}];
  let active=0,started=Date.now(),duration=5200,timer;
  const langNow=()=>document.querySelector('.hc360-nav .langselect')?.value||'en';
  const show=(i)=>{active=i;title.classList.add('is-changing');setTimeout(()=>{title.textContent=slides[active][langNow()]||slides[active].en;title.classList.remove('is-changing');},180);dots.forEach((d,j)=>d.classList.toggle('is-active',j===active));started=Date.now();};
  dots.forEach(d=>d.addEventListener('click',()=>{show(Number(d.dataset.slide));}));
  const tick=()=>{const elapsed=Date.now()-started;if(progress)progress.style.width=Math.min(100,elapsed/duration*100)+'%';if(elapsed>=duration)show((active+1)%2);};
  timer=setInterval(tick,80);show(0);
  document.querySelector('.hc360-nav .langselect')?.addEventListener('change',()=>show(active));
  document.addEventListener('visibilitychange',()=>{if(document.hidden){clearInterval(timer);}else{started=Date.now();timer=setInterval(tick,80);}});
 }
 // Make service tiles whole-card click targets while preserving their inner links
 document.querySelectorAll('.service[data-card-href]').forEach(card=>{
  const go=()=>{location.href=card.dataset.cardHref;};
  card.addEventListener('click',e=>{if(!e.target.closest('a,button'))go();});
  card.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target===card){e.preventDefault();go();}});
 });
});
