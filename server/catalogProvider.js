const { buildCatalog } = require('../backend/seed_5000_catalog');

let catalog;
function getCatalog(){
  if(!catalog) catalog=buildCatalog(5000);
  return catalog;
}
function queryCatalog({page=1,limit=24,cuisine,region,meal_type,search,ingredient}={}){
  const safePage=Math.max(1,Number(page)||1);
  const safeLimit=Math.min(100,Math.max(1,Number(limit)||24));
  const q=String(search||'').trim().toLowerCase();
  const ing=String(ingredient||'').trim().toLowerCase();
  let rows=getCatalog();
  if(cuisine) rows=rows.filter(r=>r.cuisine===cuisine);
  if(region) rows=rows.filter(r=>r.region===region);
  if(meal_type) rows=rows.filter(r=>r.meal_type===meal_type);
  if(q) rows=rows.filter(r=>`${r.title} ${r.cuisine} ${r.region}`.toLowerCase().includes(q));
  if(ing) rows=rows.filter(r=>r.ingredients.some(i=>i.name.toLowerCase().includes(ing)));
  const total=rows.length;
  const start=(safePage-1)*safeLimit;
  return {items:rows.slice(start,start+safeLimit),page:safePage,limit:safeLimit,total,has_more:start+safeLimit<total};
}
module.exports={getCatalog,queryCatalog};
