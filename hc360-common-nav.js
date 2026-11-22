/* Shared, accessible mobile navigation and service menu */
document.addEventListener('DOMContentLoaded',()=>{
 const nav=document.getElementById('hc360-main-nav');
 const toggle=document.querySelector('.hc360-menu-toggle');
 if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');toggle.textContent=open?'×':'☰';});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');if(toggle){toggle.textContent='☰';toggle.setAttribute('aria-label','Open navigation');}}));}
 const dd=document.querySelector('.hc360-nav .service-dropdown');const trigger=dd?.querySelector('.service-trigger');
 if(dd&&trigger){trigger.addEventListener('click',()=>{const open=dd.classList.toggle('is-open');trigger.setAttribute('aria-expanded',String(open));});document.addEventListener('click',e=>{if(!dd.contains(e.target)){dd.classList.remove('is-open');trigger.setAttribute('aria-expanded','false');}});}
 const lang=document.querySelector('.hc360-nav .langselect');if(lang){try{const saved=localStorage.getItem('hc360-language');if(saved&&['en','mr','hi'].includes(saved)){lang.value=saved;if(typeof setLang==='function')setLang(saved);}}catch(e){}lang.addEventListener('change',()=>{try{localStorage.setItem('hc360-language',lang.value)}catch(e){}});}
});
