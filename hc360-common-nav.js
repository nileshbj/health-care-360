/* Shared responsive navigation: close on selection, outside tap, Escape and browser Back */
document.addEventListener('DOMContentLoaded',()=>{
 const nav=document.getElementById('hc360-main-nav');
 const toggle=document.querySelector('.hc360-menu-toggle');
 const dropdown=document.querySelector('.hc360-nav .service-dropdown');
 const trigger=dropdown?.querySelector('.service-trigger');
 let menuHistoryState=false;
 const closeMenu=()=>{
   if(!nav||!toggle)return;
   nav.classList.remove('is-open');
   toggle.setAttribute('aria-expanded','false');
   toggle.setAttribute('aria-label','Open navigation');
   toggle.textContent='☰';
   if(menuHistoryState){menuHistoryState=false; if(history.state?.hc360Menu){history.back();}}
 };
 const closeDropdown=()=>{dropdown?.classList.remove('is-open');trigger?.setAttribute('aria-expanded','false');};
 if(nav&&toggle){
   toggle.addEventListener('click',()=>{
     const open=!nav.classList.contains('is-open');
     if(open){nav.classList.add('is-open');toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Close navigation');toggle.textContent='×';
       try{history.pushState({...(history.state||{}),hc360Menu:true},'','#menu');menuHistoryState=true;}catch(e){}
     }else closeMenu();
   });
   nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{closeMenu();closeDropdown();}));
   document.addEventListener('pointerdown',e=>{if(nav.classList.contains('is-open')&&!nav.contains(e.target)&&!toggle.contains(e.target)){closeMenu();closeDropdown();}});
   document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeDropdown();}});
   window.addEventListener('popstate',()=>{if(nav.classList.contains('is-open')){menuHistoryState=false;nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');toggle.textContent='☰';}closeDropdown();});
 }
 if(dropdown&&trigger){
   trigger.addEventListener('click',e=>{e.stopPropagation();const open=!dropdown.classList.contains('is-open');dropdown.classList.toggle('is-open',open);trigger.setAttribute('aria-expanded',String(open));});
   dropdown.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeDropdown));
   document.addEventListener('pointerdown',e=>{if(!dropdown.contains(e.target))closeDropdown();});
 }
 const lang=document.querySelector('.hc360-nav .langselect');
 if(lang){try{const saved=localStorage.getItem('hc360-language');if(saved&&['en','mr','hi'].includes(saved)){lang.value=saved;if(typeof setLang==='function')setLang(saved);else if(typeof changeLanguage==='function')changeLanguage(saved);}}catch(e){}lang.addEventListener('change',()=>{try{localStorage.setItem('hc360-language',lang.value)}catch(e){}});}
});
