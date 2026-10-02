# MATBAK DZ Recipe Growth Engine

The Android app intentionally does not bundle a large recipe corpus. The production architecture is a server-side catalog with indexed search/filtering, cursor pagination and a small device cache.

## Seed coverage

`seed_cuisines.js` provides 10 starter records for each of 11 cuisines: Algerian, Kabyle, Chaoui, Italian, Turkish, Lebanese, Chinese, Indian, Mexican, Korean and French. The seed is a development/editorial starter, not a claim that every generated seed record is a historically authoritative version of a traditional dish.

## Server API

`server/api.js` exposes `/health`, `/cuisines`, `/recipes`, `/recipes/:id`, `/fridge` and `/substitutes`. Filtering happens server-side before pagination. The API can resolve recipe-specific photographs through Openverse and retains source/license/attribution fields; production deployments must audit each returned image license before public redistribution.

## Scale target

The catalog schema is designed for 100,000+ recipes and 1,000,000+ long-term capacity. Add a real indexed database behind the same API contract when the catalog grows beyond the starter seed; do not move the catalog into the Android APK.

## Required recipe metadata

Keep canonical IDs, cuisine, region, meal types, category, ingredients and quantities, instructions, timings, servings, dietary labels, allergens, equipment, estimated DZD cost, source/license and image source/license. Use canonical ingredient aliases to power fridge matching, substitutions and allergy filtering.

## Safe ingestion policy

Only ingest a source after its data and image rights are verified for the intended distribution. A large public dataset is not automatically safe to republish commercially. Preserve attribution and license metadata per record and deduplicate before publication.

## On-demand growth

When a user asks for a combination that has no suitable stored recipe, the secure backend may generate a new recipe. It must pass ingredient validation, allergy/diet checks, budget calculation and basic cooking sanity checks before being saved. Generated recipes must be marked generated and never presented as verified traditional recipes.
