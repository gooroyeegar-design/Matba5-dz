const dishes = {
  algerian: ['Chakhchoukha','Couscous aux légumes','Rechta au poulet','Tajine zitoune','Chorba frik','Mhadjeb','Kesra','Dolma','Tlitli au poulet','Makroud'],
  kabyle: ['Aghroum n taddart','Couscous kabyle aux légumes','Tikerbabine','Tajine aux figues sèches','Berboucha','Avazine','Galette kabyle','Omelette aux herbes','Soupe de lentilles','Crêpes kabyles'],
  chaoui: ['Chakhchoukha chaouia','Kesra chaouia','Couscous chaoui','Berboucha aux légumes','Soupe d’orge','Tajine de poulet','Galette d’orge','Loubia','Ragoût d’agneau','Crêpes au miel'],
  italian: ['Spaghetti aglio e olio','Pasta carbonara','Lasagna','Margherita pizza','Risotto ai funghi','Pesto pasta','Gnocchi al pomodoro','Minestrone','Caprese salad','Tiramisu'],
  turkish: ['Menemen','Mercimek çorbası','Imam bayildi','Manti','Lahmacun','Köfte','Pide','Mercimek köftesi','Börek','Baklava'],
  lebanese: ['Tabbouleh','Fattoush','Hummus','Baba ghanoush','Shish tawook','Kibbeh','Lentil soup','Manakish zaatar','Falafel','Maamoul'],
  chinese: ['Egg fried rice','Kung pao chicken','Mapo tofu','Chow mein','Hot and sour soup','Spring rolls','Dumplings','Sweet and sour chicken','Congee','Scallion pancakes'],
  indian: ['Butter chicken','Chana masala','Palak paneer','Aloo gobi','Dal tadka','Biryani','Masala dosa','Samosa','Tandoori chicken','Mango lassi'],
  mexican: ['Chicken tacos','Guacamole','Chicken enchiladas','Chili con carne','Quesadillas','Pozole','Huevos rancheros','Burrito bowl','Elote','Tres leches'],
  korean: ['Bibimbap','Bulgogi','Japchae','Kimchi fried rice','Tteokbokki','Kimchi jjigae','Korean fried chicken','Pajeon','Kimbap','Hotteok'],
  french: ['Ratatouille','Quiche lorraine','Croque monsieur','Coq au vin','French onion soup','Crêpes','Ratatouille tart','Beef bourguignon','Salade niçoise','Clafoutis']
};

const profiles = {
  algerian:{base:[['onion','1'],['tomato','2'],['olive oil','2 tbsp'],['salt','to taste']], tags:['halal-safe','home-cooking']},
  kabyle:{base:[['onion','1'],['olive oil','2 tbsp'],['semolina','250 g'],['herbs','1 handful']], tags:['halal-safe','home-cooking']},
  chaoui:{base:[['onion','1'],['tomato','2'],['olive oil','2 tbsp'],['barley','120 g']], tags:['halal-safe','budget']},
  italian:{base:[['garlic','2 cloves'],['olive oil','2 tbsp'],['tomato','2'],['basil','1 handful']], tags:['quick']},
  turkish:{base:[['onion','1'],['tomato','2'],['olive oil','2 tbsp'],['parsley','1 handful']], tags:['halal-safe']},
  lebanese:{base:[['lemon','1'],['olive oil','2 tbsp'],['parsley','1 handful'],['garlic','1 clove']], tags:['halal-safe','quick']},
  chinese:{base:[['garlic','2 cloves'],['ginger','1 tsp'],['soy sauce','2 tbsp'],['sesame oil','1 tsp']], tags:['quick']},
  indian:{base:[['onion','1'],['tomato','2'],['garlic','2 cloves'],['ginger','1 tsp']], tags:['halal-safe']},
  mexican:{base:[['onion','1'],['tomato','2'],['lime','1'],['coriander','1 handful']], tags:['quick']},
  korean:{base:[['garlic','2 cloves'],['ginger','1 tsp'],['sesame oil','1 tsp'],['soy sauce','2 tbsp']], tags:['quick']},
  french:{base:[['onion','1'],['garlic','2 cloves'],['olive oil','2 tbsp'],['herbs','1 tsp']], tags:['home-cooking']}
};

function profileFor(title,cuisine){
  const p=profiles[cuisine];
  const s=title.toLowerCase();
  let extra=[];
  if(/chicken|poulet|tandoori|tawook|coq|biryani|curry|kung pao|fried chicken|bulgogi/.test(s)) extra=[['chicken','500 g']];
  else if(/beef|bœuf|boeuf|kibbeh|köfte|stroganoff/.test(s)) extra=[['beef','400 g']];
  else if(/fish|tuna|sea|poisson/.test(s)) extra=[['fish','400 g']];
  else if(/egg|omelette|menemen|carbonara|quiche|huevos/.test(s)) extra=[['eggs','3']];
  else if(/lentil|dal|chana|falafel|hummus|loubia/.test(s)) extra=[['legumes','250 g']];
  else if(/pasta|spaghetti|lasagna|noodle|manti|macaroni/.test(s)) extra=[['pasta or noodles','300 g']];
  else if(/rice|risotto|fried rice|congee|bibimbap|paella|couscous|couscous/.test(s)) extra=[['rice or grain','300 g']];
  else if(/pizza|pide|lahmacun|manakish|pancake|crêpe|crepe|bread|börek|tart/.test(s)) extra=[['flour','300 g'],['water','150 ml']];
  else extra=[['seasonal vegetables','400 g']];
  if(/dessert|baklava|makroud|maamoul|tiramisu|tres leches|clafoutis|hotteok/.test(s)) extra=[['flour','250 g'],['sugar','80 g'],['eggs','2']];
  return [...extra,...p.base];
}

function category(title){const s=title.toLowerCase();if(/soup|chorba|çorbası|jjigae|pozole/.test(s))return 'soup';if(/salad|tabbouleh|fattoush|caprese|niçoise/.test(s))return 'salad';if(/juice|lassi|smoothie|drink/.test(s))return 'drink';if(/dessert|baklava|makroud|maamoul|tiramisu|tres leches|clafoutis|hotteok/.test(s))return 'dessert';if(/pizza|pide|lahmacun|manakish|börek/.test(s))return 'baking';return 'main';}
function makeSteps(title,cuisine){const s=title.toLowerCase();const cooking=/salad|tabbouleh|fattoush|hummus|guacamole|caprese/.test(s)?['Prepare and measure every ingredient.','Mix the fresh ingredients and season gradually.','Taste and adjust acidity, salt and herbs.','Rest briefly before serving.']:['Prepare and measure every ingredient.','Heat the cooking vessel and add the aromatics with the oil.','Add the main ingredients and cook until properly browned or tender.','Add the remaining ingredients and the appropriate liquid or sauce.','Simmer or cook until the ingredients are fully cooked and the texture is right.','Taste, adjust seasoning and serve hot.'];return s.includes('pizza')||s.includes('pide')||s.includes('lahmacun')||s.includes('manakish')?['Mix flour, water and salt into a soft dough and rest it.','Prepare the topping while the dough rests.','Roll the dough thin and spread the topping evenly.','Bake in a fully preheated oven until the base is cooked and the top is browned.','Rest for a minute, slice and serve.']:stepsForCuisine(cuisine,steps)}
function stepsForCuisine(cuisine,steps){return steps.map((x,i)=>i===2&&cuisine==='indian'?'Add the spices and toast them briefly before adding the main ingredients.':i===2&&cuisine==='chinese'?'Add the main ingredients over high heat and toss continuously for even cooking.':x)}
function seed(){const out=[];for(const [cuisine,names] of Object.entries(dishes)){names.forEach((title,i)=>{const id=`seed_${cuisine}_${i+1}`;out.push({id,title,cuisine,region:cuisine==='algerian'||cuisine==='kabyle'||cuisine==='chaoui'?'Algeria':cuisine,category:category(title),meal_types:['lunch','dinner'],tags:[...profiles[cuisine].tags,...(/quick|soup|salad|dessert|drink/.test(category(title))?['quick']:[])],ingredients:profileFor(title,cuisine).map(([name,quantity])=>({name,quantity,unit:''})),steps:makeSteps(title,cuisine),prep_minutes:10+(i%4)*5,cook_minutes:15+(i%5)*8,servings:2+(i%4),estimated_cost_dzd:180+(i*55),allergens:[],dietary_labels:['halal-safe'],equipment:['pan','pot'],image_url:`https://www.themealdb.com/images/media/meals/${encodeURIComponent(title.toLowerCase().replace(/[^a-z0-9]+/g,'_'))}.jpg`,image_source:'image-provider-required',image_license:'verify-before-publication',recipe_source:'MATBAK DZ editorial seed',recipe_license:'MATBAK-DZ editorial'});});}return out}
module.exports={dishes,seed};
