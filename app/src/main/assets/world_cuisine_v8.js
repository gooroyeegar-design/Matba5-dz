(function(){
'use strict';
const b=window.Matbak;
if(!b)return;
try{
  const favorites=JSON.parse(b.getFavorites()||'[]');
  const recent=JSON.parse(b.getRecent()||'[]');
  const map=new Map((A.recipes||[]).map(r=>[r.id,r]));
  [...favorites,...recent].forEach(r=>map.set(r.id,r));
  A.recipes=[...map.values()];
  A.saved=[...new Set(favorites.map(r=>r.id))];
  localStorage.setItem('mdz_saved_v4',JSON.stringify(A.saved));
  saveCache();
}catch{}
if(typeof render==='function')render();
})();
