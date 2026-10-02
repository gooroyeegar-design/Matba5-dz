# 5,000+ recipe expansion

The app must not fake a large catalog by repeating a handful of records. The catalog generator in `seed_5000_catalog.js` is a deterministic development scaffold only; production records must be populated from permitted sources or original authoring and then deduplicated and reviewed.

For every recipe, preserve `source`, `source_url`, `license`, `source_type`, and image provenance. Do not copy photos from YouTube, Reddit, TikTok, Instagram, blogs, or recipe sites unless the rights explicitly permit redistribution. Public availability is not a redistribution license.

A licensed provider can supply full recipe records and images. Edamam, for example, advertises a separately licensed recipe database with instructions, ingredients and images. url placeholder: replace with provider contract link before production deployment

The backend should expose paginated records, never embed the catalog in the APK.
