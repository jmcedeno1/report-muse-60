
CREATE OR REPLACE VIEW public.patent_families AS
WITH exploded AS (
  SELECT unnest(taxonomy_tags) AS family, year
  FROM public.patents
  WHERE taxonomy_tags IS NOT NULL AND array_length(taxonomy_tags, 1) > 0 AND year IS NOT NULL
),
agg AS (
  SELECT
    family,
    COUNT(*)::int AS total,
    COUNT(*) FILTER (WHERE year >= EXTRACT(YEAR FROM now())::int - 3)::int AS recent,
    COUNT(*) FILTER (WHERE year <  EXTRACT(YEAR FROM now())::int - 3)::int AS older,
    MIN(year)::int AS first_year,
    MAX(year)::int AS last_year
  FROM exploded
  GROUP BY family
)
SELECT
  family,
  total,
  recent,
  older,
  first_year,
  last_year,
  ROUND(100.0 * recent / NULLIF(total, 0), 1)::numeric AS recent_share,
  CASE
    WHEN total < 20 THEN 'Emerging'
    WHEN (100.0 * recent / NULLIF(total, 0)) >= 40 THEN 'Growing'
    WHEN (100.0 * recent / NULLIF(total, 0)) >= 15 THEN 'Active'
    ELSE 'Saturated'
  END AS maturity
FROM agg
ORDER BY total DESC;

GRANT SELECT ON public.patent_families TO anon, authenticated;
