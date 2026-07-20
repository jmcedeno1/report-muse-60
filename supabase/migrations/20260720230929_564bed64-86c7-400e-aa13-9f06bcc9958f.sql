
DROP VIEW IF EXISTS public.patent_families;

CREATE VIEW public.patent_families
WITH (security_invoker = true) AS
WITH families(family, pattern, sort_order) AS (
  VALUES
    ('Vehicle-to-Grid (V2G)',        '(vehicle[- ]to[- ]grid|\bV2G\b|grid support|ancillary service|grid service)', 1),
    ('Vehicle-to-Home / Building',   '(vehicle[- ]to[- ]home|vehicle[- ]to[- ]building|\bV2H\b|\bV2B\b|backup power|home energy)', 2),
    ('Vehicle-to-Load (V2L)',        '(\bV2L\b|vehicle[- ]to[- ]load|portable power)', 3),
    ('Vehicle-to-Vehicle (V2V)',     '(\bV2V\b|vehicle[- ]to[- ]vehicle charg|peer[- ]to[- ]peer charg)', 4),
    ('Wireless / Inductive Transfer','(wireless.*charg|inductive|resonant|contactless.*energy|contactless.*power)', 5),
    ('Bidirectional Converter / Inverter','(bidirectional|bi[- ]directional|onboard charger|\bOBC\b|dual.*active bridge|reverse power)', 6),
    ('Battery Management & Degradation','(battery management|\bBMS\b|state of charge|state of health|battery degrad|battery aging|battery ageing)', 7),
    ('Charging Communication & Protocols','(ISO ?15118|\bOCPP\b|plug and charge|charging protocol|communication protocol.*charg)', 8),
    ('Smart Charging & Scheduling',  '(smart charg|scheduling|load balancing|demand response|charg.*optimiz|charging management)', 9),
    ('Cybersecurity & Authentication','(cybersecurity|authentication.*charg|encryption.*charg|cross[- ]certificate|secure.*charg)', 10)
),
matches AS (
  SELECT
    f.family,
    f.sort_order,
    p.year
  FROM public.patents p
  CROSS JOIN families f
  WHERE p.year IS NOT NULL
    AND (
      (p.title    IS NOT NULL AND p.title    ~* f.pattern) OR
      (p.abstract IS NOT NULL AND p.abstract ~* f.pattern)
    )
),
agg AS (
  SELECT
    family,
    sort_order,
    COUNT(*)::int AS total,
    COUNT(*) FILTER (WHERE year >= EXTRACT(YEAR FROM now())::int - 3)::int AS recent,
    COUNT(*) FILTER (WHERE year <  EXTRACT(YEAR FROM now())::int - 3)::int AS older,
    MIN(year)::int AS first_year,
    MAX(year)::int AS last_year
  FROM matches
  GROUP BY family, sort_order
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
    WHEN (100.0 * recent / NULLIF(total, 0)) >= 35 THEN 'Growing'
    WHEN (100.0 * recent / NULLIF(total, 0)) >= 15 THEN 'Active'
    ELSE 'Saturated'
  END AS maturity
FROM agg
ORDER BY total DESC;

GRANT SELECT ON public.patent_families TO anon, authenticated;
