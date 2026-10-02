// MATBAK DZ server-side AI example.
// IMPORTANT: set OPENAI_API_KEY in the server environment. Never put it in the APK.
// This example uses the Responses API. The mobile app should call your own HTTPS endpoint.

import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const BRAIN = `You are MATBAK DZ's multilingual recipe intelligence engine.
Understand Algerian Darija, Arabic, French, English and mixed-language input.
Canonicalize ingredient aliases instead of duplicating ingredients.
Hard-filter allergies first. Then dietary constraints, equipment, time, budget, available ingredients, meal type, user preferences and history.
Recipes are worldwide and may only be returned from lawful/licensed application sources or clearly marked AI-generated recipes.
Do not expose dish nationality unless explicitly requested.
Do not claim uncertain allergen safety. Distinguish dairy-free from lactose-free and milk-protein allergy safety; distinguish gluten-free from uncertain gluten status.
Never fabricate a source, license, certification or traditional-authenticity claim.
Return only the requested meal types. Preserve variety. Costs are estimates unless backed by current ingredient-price data.`;

export async function buildPlan({ profile, candidates }) {
  // candidates should already be fetched from the indexed 200k+/1M+ recipe database.
  // Keep this list small so the model is fast; do not send the whole database.
  const input = JSON.stringify({ profile, candidates });

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || 'gpt-6-luna',
    instructions: BRAIN,
    input: `Rank these pre-filtered recipe candidates for the user and return a compact meal plan.\n${input}`,
    text: {
      format: {
        type: 'json_schema',
        name: 'matbak_plan',
        strict: true,
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            meals: {
              type: 'array',
              items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                  recipe_id: { type: 'string' },
                  meal: { type: 'string' },
                  reason: { type: 'string' },
                  estimated_cost_dzd: { type: ['number', 'null'] }
                },
                required: ['recipe_id', 'meal', 'reason', 'estimated_cost_dzd']
              }
            }
          },
          required: ['meals']
        }
      }
    }
  });

  return JSON.parse(response.output_text);
}

// Production endpoint design:
// POST /plan
// 1. Parse request locally/server-side.
// 2. Query indexed recipe candidates.
// 3. Apply hard allergy/diet/equipment filters.
// 4. Call buildPlan() only on the small candidate set.
// 5. Return recipe IDs; fetch full records separately with pagination/cache.
// This keeps the APK fast and keeps the secret server-side.
