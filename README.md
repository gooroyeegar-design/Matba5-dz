# MATBAK DZ

Algeria-first, worldwide recipe application. Recipe records are served from a backend and fetched with pagination; full recipe data is never bundled into the APK.

## Current structure

- `app/` — Android Kotlin host and WebView UI.
- `app/src/main/assets/` — lightweight HTML/JS presentation layer and enhancement scripts.
- `app/src/main/java/dz/matba5/app/` — `MainActivity`, WebView bridge, and SQLite offline cache.
- `app/src/main/res/` — Android resources, launcher icon and localized native strings.
- `backend/` — catalog contract and cuisine seed generator.
- `server/` — zero-dependency Node recipe API, pagination, filtering, fridge matching and substitute lookup.
- `.github/workflows/build-apk.yml` — Android build, APK validation and artifact upload.
- `docs/AI_RECIPE_BRAIN.md` — multilingual recipe-ranking and generation rules.
- Recipe data stays server-side; only favorites/recent recipes are cached locally for offline use.

## Languages

Arabic (RTL), French, English and Algerian Darija are supported. The first-launch language is stored in Android preferences; the selected language controls recipe titles and UI direction.

## Cuisine taxonomy

The first backend seed contains at least 10 recipe records for each of: Algerian, Kabyle, Chaoui, Italian, Turkish, Lebanese, Chinese, Indian, Mexican, Korean and French cuisine. The same schema can grow to 100k+ records without an APK rewrite.

## DZ filters

Backend records support cuisine, region, Ramadan, Eid, budget, quick (<30 min), no-oven, halal-safe, dietary labels, allergies, equipment, ingredients and estimated DZD cost. Allergies are hard exclusions in production ranking.

## API endpoints

Start the development server with `cd server && npm start`.

- `GET /health` — service health.
- `GET /cuisines` — available cuisine IDs.
- `GET /recipes?cursor=0&limit=20&cuisine=italian&meal=dinner&maxMinutes=30&maxCost=500&tag=quick&q=pasta` — paginated search/filter.
- `GET /recipes/:id` — one recipe.
- `GET /fridge` — best matches; send the user's ingredient JSON array in the `x-ingredients` request header.
- `GET /substitutes?ingredient=butter` — local substitution candidates.

The Android app can point to the deployed HTTPS API by setting `mdz_api_base` in its app configuration/runtime. If no backend URL is configured, the existing development catalog fallback remains available.

## Adding recipes

1. Add or import structured records through the backend ingestion pipeline; do not add a large recipe dataset to `app/src/main/assets`.
2. Required metadata includes `id`, title, cuisine, region, ingredients, steps, meal types, dietary labels, allergens, equipment, timings, servings and estimated DZD cost.
3. Keep canonical ingredient IDs/aliases so the same ingredient is not duplicated.
4. Attach a recipe-specific image only when the source/image license permits the intended distribution; retain source, license and attribution metadata.
5. Run duplicate detection before publishing.
6. Generated recipes must be marked generated and pass allergy, dietary, ingredient and cooking-sanity validation.

## Offline and cooking features

Favorites and last-viewed recipes are stored in SQLite through `MatbakBridge`. Cooking mode keeps the screen awake and provides large step-by-step instructions with a per-step timer. Ingredients can be added to the local shopping list and shared through WhatsApp or the Android share sheet.

## Performance rules

Use cursor pagination, server-side filtering, lazy-loaded images and small JSON payloads. Do not bundle 100k recipes or images into the APK. The GitHub Actions build validates the final APK and uploads `MATBAK-DZ-debug-apk`.

## Licensing

Only ingest recipes and images whose rights permit the intended distribution. Public availability alone is not proof of redistribution rights. Preserve attribution and license metadata for every imported source.
