const http = require('node:http');
const { URL } = require('node:url');
const { seed } = require('./seed_cuisines');

const recipes = seed();
const imageCache = new Map();
const PORT = Number(process.env.PORT || 8787);
const allowedCuisines = [...new Set(recipes.map(r => r.cuisine))];

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {'content-type':'application/json; charset=utf-8','cache-control':'public, max-age=60'});
  res.end(payload);
}
function normalize(v=''){return v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();}
function contains(text,q){return normalize(text).includes(normalize(q));}
function allergySafe(recipe, allergies=[]){const blocked=new Set(allergies.map(normalize));return !recipe.allergens.some(a=>blocked.has(normalize(a)));}
function matches(recipe, p){
  if(p.cuisine && recipe.cuisine!==p.cuisine)return false;
  if(p.region && recipe.region!==p.region)return false;
  if(p.category && recipe.category!==p.category)return false;
  if(p.meal && !recipe.meal_types.includes(p.meal))return false;
  if(p.maxMinutes && recipe.prep_minutes+recipe.cook_minutes>Number(p.maxMinutes))return false;
  if(p.maxCost && recipe.estimated_cost_dzd>Number(p.maxCost))return false;
  if(p.tag && !recipe.tags.includes(p.tag))return false;
  if(p.equipment && !recipe.equipment.includes(p.equipment))return false;
  if(p.q){const hay=[recipe.title,recipe.cuisine,recipe.category,...recipe.ingredients.map(i=>i.name)].join(' ');if(!contains(hay,p.q))return false;}
  if(p.allergy && !allergySafe(recipe,p.allergy.split(',').filter(Boolean)))return false;
  return true;
}
function scoreFridge(recipe, items){const have=items.map(normalize).filter(Boolean);if(!have.length)return 0;return recipe.ingredients.reduce((n,i)=>n+(have.some(x=>normalize(i.name).includes(x)||x.includes(normalize(i.name)))?1:0),0);}
async function resolveImage(recipe){
  if(imageCache.has(recipe.id))return imageCache.get(recipe.id);
  const q=encodeURIComponent(`${recipe.title} food`);
  try{
    const r=await fetch(`https://api.openverse.org/v1/images/?q=${q}&license=cc0,by,by-sa&license_type=all&size=1`);
    if(r.ok){const data=await r.json();const hit=data.results?.[0];if(hit?.thumbnail){const image={url:hit.thumbnail,source:hit.creator||hit.source||'Openverse',license:hit.license||'unknown',attribution:hit.attribution||''};imageCache.set(recipe.id,image);return image;}}
  }catch{}
  return null;
}
async function decorate(recipe){const image=await resolveImage(recipe);return {...recipe,image_url:image?.url||null,image_source:image?.source||null,image_license:image?.license||null,image_attribution:image?.attribution||null};}

async function handle(req,res){
  const u=new URL(req.url,`http://${req.headers.host||'localhost'}`);
  if(u.pathname==='/health')return json(res,200,{ok:true,service:'matbak-dz-recipe-api'});
  if(u.pathname==='/cuisines')return json(res,200,{cuisines:allowedCuisines.map(c=>({id:c,label:c}))});
  if(u.pathname==='/recipes'){
    const p=Object.fromEntries(u.searchParams.entries());
    let rows=recipes.filter(r=>matches(r,p));
    const pageSize=Math.min(50,Math.max(1,Number(p.limit||20)));
    const cursor=Math.max(0,Number(p.cursor||0));
    rows=rows.slice(cursor,cursor+pageSize);
    const decorated=await Promise.all(rows.map(decorate));
    return json(res,200,{items:decorated,next_cursor:cursor+decorated.length<recipes.length?cursor+decorated.length:null,total:recipes.length});
  }
  if(u.pathname==='/fridge'){
    let items=[];try{items=JSON.parse(req.headers['x-ingredients']||'[]')}catch{}
    const ranked=recipes.map(r=>({...r,match_score:scoreFridge(r,items)})).filter(r=>r.match_score>0).sort((a,b)=>b.match_score-a.match_score||a.estimated_cost_dzd-b.estimated_cost_dzd).slice(0,30);
    return json(res,200,{items:await Promise.all(ranked.map(decorate))});
  }
  if(u.pathname==='/substitutes'){
    const q=normalize(u.searchParams.get('ingredient')||'');
    const map={butter:['olive oil','margarine'],milk:['unsweetened soy drink','oat drink'],cream:['plain yogurt','evaporated milk'],wheat flour:['oat flour','rice flour','corn flour'],parmesan:['aged hard cheese','nutritional yeast'],soy sauce:['tamari','salt + lemon'],lemon:['vinegar','citric acid water'],egg:['flax egg','aquafaba']};
    return json(res,200,{ingredient:q,substitutes:map[q]||[]});
  }
  const match=u.pathname.match(/^\/recipes\/([^/]+)$/);
  if(match){const recipe=recipes.find(r=>r.id===match[1]);if(!recipe)return json(res,404,{error:'recipe_not_found'});return json(res,200,await decorate(recipe));}
  return json(res,404,{error:'not_found'});
}

http.createServer((req,res)=>handle(req,res).catch(err=>json(res,500,{error:'server_error',detail:err.message}))).listen(PORT,()=>console.log(`MATBAK DZ API listening on ${PORT}`));
