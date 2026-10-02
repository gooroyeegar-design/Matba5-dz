# MATBAK DZ Recipe Growth Engine

The Android app is intentionally not a 100k-record bundle. The production architecture is a server-side catalog with pagination and a device cache.

## Goal

- 100,000+ recipe records
- 1,000,000+ long-term capacity
- Arabic, French and English metadata
- worldwide dishes plus drinks, juices, smoothies, desserts, baking and snacks
- canonical ingredients and aliases
- strict allergy exclusions
- budget/time/equipment/meal filtering
- one source-bound image per recipe
- source + recipe license + image license retained per record

## Safe ingestion policy

Only ingest a source after its data and image rights are verified for the intended distribution. A large public dataset is not automatically safe to republish commercially. For example, RecipeNLG reports more than 2.2M recipes, but its repository does not establish that those aggregated source recipes are cleared for commercial redistribution; it should therefore be treated as a research/reference source, not blindly copied into the app. See the source audit before enabling any adapter.

## Current open inputs

- UniTools: 501 recipes from 127 countries, CC BY-SA 4.0, with per-recipe photo author/license metadata.
- TheMealDB: useful API/catalog for development; production app distribution requires the appropriate supporter/API arrangement.

The goal is to add additional explicitly licensed/authorized sources until the normalized server catalog reaches 100k. Do not manufacture fake counts by duplicating records.

## On-demand growth

When a user asks for a combination that has no suitable stored recipe, the secure backend may generate a new recipe. It must pass ingredient validation, allergy/diet checks, budget calculation and basic cooking sanity checks before being saved. Generated recipes must be marked as generated and never presented as verified traditional recipes.
