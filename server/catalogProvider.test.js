const assert=require('assert');
const {getCatalog,queryCatalog}=require('./catalogProvider');
const all=getCatalog();
assert.equal(all.length,5000);
assert.equal(new Set(all.map(r=>r.recipe_id)).size,5000);
assert.equal(queryCatalog({limit:100}).items.length,100);
assert.ok(queryCatalog({cuisine:'algerian'}).total>0);
assert.ok(queryCatalog({ingredient:'potato'}).total>0);
console.log('catalogProvider tests passed');
