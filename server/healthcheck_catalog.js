const { getCatalog } = require('./catalogProvider');
const rows=getCatalog();
if(rows.length!==5000) throw new Error(`Expected 5000 catalog records, got ${rows.length}`);
const ids=new Set(rows.map(r=>r.recipe_id));
if(ids.size!==5000) throw new Error('Recipe IDs are not unique');
for(const r of rows){
  if(!r.title||!r.ingredients?.length||!r.steps?.length||!r.source||!r.license) throw new Error(`Incomplete recipe ${r.recipe_id}`);
}
console.log(`Catalog OK: ${rows.length} recipes`);
