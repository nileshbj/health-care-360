async function loadHC360Header(){
 const mount=document.getElementById('hc360-shared-header');
 if(!mount)return;
 try{
  const response=await fetch('hc360-header.html',{cache:'no-cache'});
  if(!response.ok)throw new Error('Header component request failed: '+response.status);
  mount.innerHTML=await response.text();
  const holder=document.getElementById('hc360-language-holder');
  const select=holder?.querySelector('.langselect');
  const target=document.getElementById('hc360-language-target');
  if(select&&target)target.appendChild(select);
  initHC360Header();
 }catch(error){console.error('Health & Care 360 shared header could not load.',error);mount.innerHTML='<div class="hc360-component-error">Navigation could not load. Please refresh the page.</div>';}
}
function initHC360Header(){

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
 const currentPage=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 document.querySelectorAll('.hc360-quicknav a').forEach(a=>{const target=(a.getAttribute('href')||'').toLowerCase();if(target===currentPage)a.setAttribute('aria-current','page');});
 const lang=document.querySelector('.hc360-nav .langselect');
 if(lang){try{const saved=localStorage.getItem('hc360-language');if(saved&&['en','mr','hi'].includes(saved)){lang.value=saved;if(typeof setLang==='function')setLang(saved);else if(typeof changeLanguage==='function')changeLanguage(saved);}}catch(e){}}
 // Shared scroll progress indicator: ensure it exists on every page.
 let progressBar=document.querySelector('.hc360-progress');
 if(!progressBar){
  progressBar=document.createElement('div');
  progressBar.className='hc360-progress';
  progressBar.setAttribute('role','progressbar');
  progressBar.setAttribute('aria-label','Page reading progress');
  progressBar.setAttribute('aria-valuemin','0');
  progressBar.setAttribute('aria-valuemax','100');
  progressBar.setAttribute('aria-valuenow','0');
  progressBar.innerHTML='<span id=\"hc360-progress-fill\"></span>';
  document.body.appendChild(progressBar);
 }
 const fill=progressBar.querySelector('#hc360-progress-fill')||progressBar.querySelector('span');
 let progressFrame=0;
 const updateProgress=()=>{
  if(progressFrame)cancelAnimationFrame(progressFrame);
  progressFrame=requestAnimationFrame(()=>{
   // Keep the thin reading indicator at the viewport edge. The page can open
   // directly at #home, where the sticky header may already be above the fold;
   // offsetting by its height would place the bar over hero content.
   document.documentElement.style.setProperty('--hc360-progress-top','0px');
   const root=document.scrollingElement||document.documentElement;
   const pageHeight=Math.max(root.scrollHeight,document.body.scrollHeight,document.documentElement.scrollHeight);
   const viewportHeight=window.innerHeight||document.documentElement.clientHeight;
   const maxScroll=Math.max(0,pageHeight-viewportHeight);
   const currentScroll=Math.max(0,window.scrollY||root.scrollTop||0);
   const ratio=maxScroll>0?Math.min(1,Math.max(0,currentScroll/maxScroll)):0;
   if(fill)fill.style.width=(ratio*100).toFixed(2)+'%';
   progressBar.setAttribute('aria-valuenow',String(Math.round(ratio*100)));
  });
 };
 window.addEventListener('scroll',updateProgress,{passive:true});
 window.addEventListener('resize',updateProgress,{passive:true});
 window.addEventListener('load',updateProgress);
 window.addEventListener('pageshow',updateProgress);
 if('ResizeObserver'in window){const observer=new ResizeObserver(updateProgress);observer.observe(document.body);}
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

}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadHC360Header,{once:true});
else loadHC360Header();
