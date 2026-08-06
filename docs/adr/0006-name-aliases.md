# Name Aliases for search and former labels

Citizens search with alternate, informal, and former government names that are not the curated Display Name. We add an optional typed `aliases` field on each Service (`name`, optional `lang`, optional `kind`), score all alias names in Instant Directory like tags, and show a muted “Formerly …” line on the Service Page only for `kind: former`. We rejected stuffing these into `tags` (tags stay free-form keywords) and rejected changing Service Slugs on rename (stable URLs; aliases absorb old labels). Display Name casing remains ADR-0005.
