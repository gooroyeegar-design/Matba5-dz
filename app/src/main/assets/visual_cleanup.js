(function(){
'use strict';
function boot(){
  document.documentElement.classList.add('mdz-no-emoji');
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href='no_emoji_visuals.css';
  document.head.appendChild(link);
  const emoji=/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu;
  document.querySelectorAll('*').forEach(el=>{
    if(el.children.length===0 && emoji.test(el.textContent||'')) el.textContent=(el.textContent||'').replace(emoji,'').trim();
    emoji.lastIndex=0;
  });
  window.addEventListener('error',()=>{},true);
  if(window.A&&Array.isArray(A.recipes)&&A.recipes.length===0){
    try{ if(typeof loadMore==='function') loadMore(); }catch(e){}
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
