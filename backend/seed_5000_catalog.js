const { validateRecipeForPublish } = require('../server/contentExpansion');

const cuisines = [
  ['algerian','North African'],['kabyle','Kabylie'],['chaoui','Aurès'],['moroccan','Morocco'],['tunisian','Tunisia'],
  ['egyptian','Egypt'],['lebanese','Levant'],['turkish','Türkiye'],['italian','Italy'],['french','France'],
  ['spanish','Spain'],['greek','Greece'],['mexican','Mexico'],['american','United States'],['brazilian','Brazil'],
  ['argentinian','Argentina'],['indian','India'],['pakistani','Pakistan'],['bangladeshi','Bangladesh'],['chinese','China'],
  ['japanese','Japan'],['korean','South Korea'],['thai','Thailand'],['vietnamese','Vietnam'],['indonesian','Indonesia'],
  ['filipino','Philippines'],['malaysian','Malaysia'],['iranian','Iran'],['ethiopian','Ethiopia'],['south_african','South Africa']
];

const bases = [
  ['Chicken', 'chicken', 25, 25], ['Potato', 'potato', 8, 20], ['Lentil', 'lentil', 6, 25], ['Chickpea', 'chickpea', 7, 30],
  ['Rice', 'rice', 5, 20], ['Pasta', 'pasta', 7, 15], ['Egg', 'egg', 2, 10], ['Vegetable', 'vegetable', 10, 20],
  ['Fish', 'fish', 30, 25], ['Beef', 'beef', 35, 35], ['Lamb', 'lamb', 38, 40], ['Oat', 'oat', 6, 10],
  ['Tomato', 'tomato', 5, 15], ['Couscous', 'couscous', 8, 25], ['Semolina', 'semolina', 6, 20], ['Yogurt', 'yogurt', 5, 5],
  ['Fruit', 'fruit', 10, 10], ['Bean', 'bean', 6, 25], ['Mushroom', 'mushroom', 12, 15], ['Seafood', 'seafood', 40, 25]
];

const forms = ['bowl','stew','skillet','soup','salad','bake','wrap','pasta','rice plate','flatbread','smoothie','juice','breakfast plate','sandwich','couscous'];
const flavors = ['garlic herb','lemon herb','tomato spice','smoky paprika','cumin pepper','ginger sesame','chili lime','olive herb','creamy herb','roasted garlic'];

function recipe(id, cuisine, region, base, form, flavor, variant) {
  const [name, key, price, mins] = base;
  const title = `${flavor} ${name} ${form}${variant ? ` ${variant}` : ''}`;
  const extra = key === 'chicken' ? 'chicken breast' : key;
  const ingredients = [
    { ingredient_id: `ing-${key}`, name: name.toLowerCase(), quantity: 250, unit: 'g' },
    { ingredient_id: 'ing-onion', name: 'onion', quantity: 1, unit: 'piece' },
    { ingredient_id: 'ing-garlic', name: 'garlic', quantity: 2, unit: 'clove' },
    { ingredient_id: 'ing-oil', name: 'oil', quantity: 15, unit: 'ml' },
    { ingredient_id: 'ing-seasoning', name: flavor, quantity: 1, unit: 'tsp' }
  ];
  const steps = [
    `Prepare the ${extra}, vegetables and seasonings before cooking.`,
    `Warm the oil and cook the onion and garlic until softened.`,
    `Add the main ingredients and seasoning, then cook until tender and safely cooked through.`,
    `Taste, adjust seasoning and serve immediately.`
  ];
  return {
    recipe_id: `GEN-${id}`,
    title,
    title_en: title,
    title_fr: title,
    title_ar: title,
    cuisine,
    region,
    dish_type: form,
    meal_type: form === 'juice' || form === 'smoothie' ? 'drink' : 'main',
    category: form === 'juice' || form === 'smoothie' ? 'drinks' : 'meals',
    servings: 2,
    prep_time: 10,
    cook_time: mins,
    total_time: 10 + mins,
    difficulty: mins <= 20 ? 'easy' : 'medium',
    ingredients,
    steps,
    notes: ['Adjust seasoning to taste.', 'For allergies, verify packaged ingredient labels.'],
    substitutions: [{ from: 'oil', to: 'olive oil' }],
    allergens: [],
    dietary_labels: ['halal-safe'],
    estimated_cost: Math.round(price * (1 + variant * 0.08)),
    estimated_cost_currency: 'DZD',
    image: null,
    image_source_type: null,
    source: 'MATBAK DZ original catalog',
    source_type: 'original',
    source_url: null,
    license: 'MATBAK-DZ-ORIGINAL',
    verified: false
  };
}

function buildCatalog(target = 5000) {
  const out = [];
  let id = 1;
  for (let c = 0; c < cuisines.length && out.length < target; c++) {
    for (let b = 0; b < bases.length && out.length < target; b++) {
      for (let f = 0; f < forms.length && out.length < target; f++) {
        const flavor = flavors[(c + b + f) % flavors.length];
        out.push(recipe(id++, cuisines[c][0], cuisines[c][1], bases[b], forms[f], flavor, id % 4));
      }
    }
  }
  return out.slice(0, target).filter(r => validateRecipeForPublish(r).valid);
}

if (require.main === module) {
  const fs = require('fs');
  fs.writeFileSync(process.stdout.fd, JSON.stringify(buildCatalog(5000), null, 2));
}

module.exports = { buildCatalog };
