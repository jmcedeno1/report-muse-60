CREATE OR REPLACE VIEW public.patent_family_full AS
WITH families(family, pattern) AS (
  VALUES
    ('Vehicle-to-Grid (V2G)','(vehicle[- ]to[- ]grid|\yV2G\y|grid support|ancillary service|grid service)'),
    ('Vehicle-to-Home / Building','(vehicle[- ]to[- ]home|vehicle[- ]to[- ]building|\yV2H\y|\yV2B\y|backup power|home energy)'),
    ('Vehicle-to-Load (V2L)','(\yV2L\y|vehicle[- ]to[- ]load|portable power)'),
    ('Vehicle-to-Vehicle (V2V)','(\yV2V\y|vehicle[- ]to[- ]vehicle charg|peer[- ]to[- ]peer charg)'),
    ('Wireless / Inductive Transfer','(wireless.*charg|inductive|resonant|contactless.*energy|contactless.*power)'),
    ('Bidirectional Converter / Inverter','(bidirectional|bi[- ]directional|onboard charger|\yOBC\y|dual.*active bridge|reverse power)'),
    ('Battery Management & Degradation','(battery management|\yBMS\y|state of charge|state of health|battery degrad|battery aging|battery ageing)'),
    ('Charging Communication & Protocols','(ISO ?15118|\yOCPP\y|plug and charge|charging protocol|communication protocol.*charg)'),
    ('Smart Charging & Scheduling','(smart charg|scheduling|load balancing|demand response|charg.*optimiz|charging management)'),
    ('Cybersecurity & Authentication','(cybersecurity|authentication.*charg|encryption.*charg|cross[- ]certificate|secure.*charg)')
)
SELECT
  f.family,
  p.id AS patent_id,
  p.year,
  p.orgs,
  p.title,
  p.abstract,
  p.url
FROM public.patents p
JOIN families f
  ON (p.title ~* f.pattern OR p.abstract ~* f.pattern);

GRANT SELECT ON public.patent_family_full TO anon, authenticated;
GRANT ALL ON public.patent_family_full TO service_role;