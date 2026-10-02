(function(){
'use strict';
const emoji=/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu;
function clean(){
 document.documentElement.classList.add('mdz-no-emoji');
 document.querySelectorAll('.option-icon,.food-emoji,.emoji,[data-emoji]').forEach(e=>e.remove());
 document.querySelectorAll('img').forEach(img=>{if(emoji.test(img.alt||''))img.alt='';emoji.lastIndex=0;});
}
function boot(){
 clean();
 new MutationObserver(clean).observe(document.body,{childList:true,subtree:true});
 if(window.A&&Array.isArray(A.recipes)&&A.recipes.length===0){try{if(typeof loadMore==='function')loadMore();}catch(e){}}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
