
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
  SELECT f.family, f.sort_order, p.year
  FROM public.patents p
  CROSS JOIN families f
  WHERE p.year IS NOT NULL AND p.year <= EXTRACT(YEAR FROM now())::int
    AND ((p.title IS NOT NULL AND p.title ~* f.pattern) OR
         (p.abstract IS NOT NULL AND p.abstract ~* f.pattern))
),
agg AS (
  SELECT
    family, sort_order,
    COUNT(*)::int AS total,
    COUNT(*) FILTER (WHERE year >= EXTRACT(YEAR FROM now())::int - 4)::int AS recent,
    COUNT(*) FILTER (WHERE year <  EXTRACT(YEAR FROM now())::int - 4)::int AS older,
    MIN(year)::int AS first_year,
    MAX(year)::int AS last_year
  FROM matches
  GROUP BY family, sort_order
),
rated AS (
  SELECT
    *,
    (recent::numeric / 5) AS recent_rate,
    CASE WHEN (EXTRACT(YEAR FROM now())::int - 5 - first_year) > 0
         THEN older::numeric / (EXTRACT(YEAR FROM now())::int - 5 - first_year)
         ELSE NULL END AS historical_rate
  FROM agg
)
SELECT
  family, total, recent, older, first_year, last_year,
  ROUND(recent_rate, 1) AS recent_annual_rate,
  ROUND(historical_rate, 1) AS historical_annual_rate,
  ROUND(recent_rate / NULLIF(historical_rate, 0), 2) AS momentum,
  CASE
    WHEN total < 20 THEN 'Emerging'
    WHEN historical_rate IS NULL OR historical_rate = 0 THEN 'Emerging'
    WHEN (recent_rate / historical_rate) >= 2.0 THEN 'Growing'
    WHEN (recent_rate / historical_rate) >= 0.7 THEN 'Active'
    ELSE 'Saturated'
  END AS maturity
FROM rated
ORDER BY total DESC;

GRANT SELECT ON public.patent_families TO anon, authenticated;
