const ALLOWED_SOURCE_TYPES = new Set([
  'public_domain',
  'open_license',
  'licensed_feed',
  'user_submitted',
  'original',
  'ai_original'
]);

function validateRecipeForPublish(recipe) {
  const errors = [];
  if (!recipe || typeof recipe !== 'object') errors.push('recipe must be an object');
  if (!recipe?.title) errors.push('title is required');
  if (!Array.isArray(recipe?.ingredients) || recipe.ingredients.length === 0) errors.push('ingredients are required');
  if (!Array.isArray(recipe?.steps) || recipe.steps.length === 0) errors.push('steps are required');
  if (!recipe?.source) errors.push('source is required');
  if (!recipe?.license) errors.push('license is required');
  if (!ALLOWED_SOURCE_TYPES.has(recipe?.source_type)) errors.push('source_type is not redistributable by policy');
  if (recipe?.image_source_type && !ALLOWED_SOURCE_TYPES.has(recipe.image_source_type)) errors.push('image source is not redistributable by policy');
  return { valid: errors.length === 0, errors };
}

function normalizeRecipe(recipe) {
  return {
    ...recipe,
    title: String(recipe.title || '').trim(),
    ingredients: (recipe.ingredients || []).map(i => ({ ...i, name: String(i.name || '').trim() })),
    steps: (recipe.steps || []).map(s => String(s).trim()).filter(Boolean),
    source: String(recipe.source || '').trim(),
    source_url: recipe.source_url || null,
    license: String(recipe.license || '').trim(),
    image: recipe.image || null,
    image_source_type: recipe.image_source_type || null,
    imported_at: recipe.imported_at || new Date().toISOString()
  };
}

module.exports = { ALLOWED_SOURCE_TYPES, validateRecipeForPublish, normalizeRecipe };
