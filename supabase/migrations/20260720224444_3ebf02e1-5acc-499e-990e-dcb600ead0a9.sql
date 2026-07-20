
CREATE OR REPLACE VIEW public.patents_by_year AS
  SELECT year, count(*)::int AS count
  FROM public.patents WHERE year IS NOT NULL
  GROUP BY year ORDER BY year;

CREATE OR REPLACE VIEW public.publications_by_year AS
  SELECT year, count(*)::int AS count
  FROM public.publications WHERE year IS NOT NULL
  GROUP BY year ORDER BY year;

CREATE OR REPLACE VIEW public.patents_top_orgs AS
  SELECT org AS name, count(*)::int AS count
  FROM public.patents, unnest(orgs) AS org
  WHERE org IS NOT NULL AND org <> ''
  GROUP BY org ORDER BY count DESC LIMIT 25;

CREATE OR REPLACE VIEW public.publications_top_orgs AS
  SELECT org AS name, count(*)::int AS count
  FROM public.publications, unnest(orgs) AS org
  WHERE org IS NOT NULL AND org <> ''
  GROUP BY org ORDER BY count DESC LIMIT 25;

CREATE OR REPLACE VIEW public.patents_top_countries AS
  SELECT c AS country, count(*)::int AS count
  FROM public.patents, unnest(countries) c
  WHERE c IS NOT NULL AND c <> ''
  GROUP BY c ORDER BY count DESC LIMIT 20;

CREATE OR REPLACE VIEW public.publications_top_countries AS
  SELECT c AS country, count(*)::int AS count
  FROM public.publications, unnest(countries) c
  WHERE c IS NOT NULL AND c <> ''
  GROUP BY c ORDER BY count DESC LIMIT 20;

CREATE OR REPLACE VIEW public.patents_themes AS
  SELECT tag AS theme, count(*)::int AS count
  FROM public.patents, unnest(taxonomy_tags) AS tag
  WHERE tag IS NOT NULL AND tag <> ''
  GROUP BY tag ORDER BY count DESC;

CREATE OR REPLACE VIEW public.publications_themes AS
  SELECT tag AS theme, count(*)::int AS count
  FROM public.publications, unnest(taxonomy_tags) AS tag
  WHERE tag IS NOT NULL AND tag <> ''
  GROUP BY tag ORDER BY count DESC;

CREATE OR REPLACE VIEW public.news_by_domain AS
  SELECT domain, count(*)::int AS count
  FROM public.news WHERE domain IS NOT NULL
  GROUP BY domain ORDER BY count DESC LIMIT 25;

CREATE OR REPLACE VIEW public.news_by_country AS
  SELECT source_country AS country, count(*)::int AS count
  FROM public.news WHERE source_country IS NOT NULL AND source_country <> ''
  GROUP BY source_country ORDER BY count DESC LIMIT 25;

CREATE OR REPLACE VIEW public.corpus_summary AS
  SELECT
    (SELECT count(*) FROM public.patents)::int      AS patents,
    (SELECT count(*) FROM public.publications)::int AS publications,
    (SELECT count(*) FROM public.pilots)::int       AS pilots,
    (SELECT count(*) FROM public.failure_modes)::int AS failure_modes,
    (SELECT count(*) FROM public.news)::int         AS news;

GRANT SELECT ON
  public.patents_by_year,
  public.publications_by_year,
  public.patents_top_orgs,
  public.publications_top_orgs,
  public.patents_top_countries,
  public.publications_top_countries,
  public.patents_themes,
  public.publications_themes,
  public.news_by_domain,
  public.news_by_country,
  public.corpus_summary
TO anon, authenticated;
