
-- Shared updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ============ PATENTS ============
CREATE TABLE public.patents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uid TEXT NOT NULL UNIQUE,
  title TEXT,
  abstract TEXT,
  year INTEGER,
  url TEXT,
  orgs TEXT[] DEFAULT ARRAY[]::TEXT[],
  countries TEXT[] DEFAULT ARRAY[]::TEXT[],
  citations INTEGER,
  publication_number TEXT,
  cpc_classes TEXT[] DEFAULT ARRAY[]::TEXT[],
  family_id TEXT,
  taxonomy_tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_patents_year ON public.patents(year);
CREATE INDEX idx_patents_family_id ON public.patents(family_id);
CREATE INDEX idx_patents_citations ON public.patents(citations DESC);
GRANT SELECT ON public.patents TO anon, authenticated;
GRANT ALL ON public.patents TO service_role;
ALTER TABLE public.patents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read patents" ON public.patents FOR SELECT USING (true);
CREATE TRIGGER trg_patents_updated_at BEFORE UPDATE ON public.patents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ PUBLICATIONS ============
CREATE TABLE public.publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uid TEXT NOT NULL UNIQUE,
  title TEXT,
  abstract TEXT,
  year INTEGER,
  doi TEXT,
  url TEXT,
  orgs TEXT[] DEFAULT ARRAY[]::TEXT[],
  countries TEXT[] DEFAULT ARRAY[]::TEXT[],
  citations INTEGER,
  source TEXT,
  taxonomy_tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_publications_year ON public.publications(year);
CREATE INDEX idx_publications_doi ON public.publications(doi);
CREATE INDEX idx_publications_citations ON public.publications(citations DESC);
GRANT SELECT ON public.publications TO anon, authenticated;
GRANT ALL ON public.publications TO service_role;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read publications" ON public.publications FOR SELECT USING (true);
CREATE TRIGGER trg_publications_updated_at BEFORE UPDATE ON public.publications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ NEWS (GDELT-shaped) ============
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uid TEXT NOT NULL UNIQUE,          -- sha1(url) or GDELT gkg id
  url TEXT NOT NULL,
  title TEXT,
  seen_date TIMESTAMPTZ,
  domain TEXT,
  language TEXT,
  source_country TEXT,
  tone NUMERIC,
  social_image TEXT,
  query TEXT,                        -- GDELT query that produced this hit
  taxonomy_tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  raw JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_news_seen_date ON public.news(seen_date DESC);
CREATE INDEX idx_news_domain ON public.news(domain);
CREATE INDEX idx_news_source_country ON public.news(source_country);
GRANT SELECT ON public.news TO anon, authenticated;
GRANT ALL ON public.news TO service_role;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read news" ON public.news FOR SELECT USING (true);
CREATE TRIGGER trg_news_updated_at BEFORE UPDATE ON public.news
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ PILOTS ============
CREATE TABLE public.pilots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT,
  country TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  partners TEXT[] DEFAULT ARRAY[]::TEXT[],
  power_kw NUMERIC,
  fleet_size INTEGER,
  status TEXT,
  v2x_type TEXT[] DEFAULT ARRAY[]::TEXT[],
  start_date DATE,
  end_date DATE,
  investment_usd NUMERIC,
  description TEXT,
  evidence_uid TEXT UNIQUE,
  failure_mode_count INTEGER DEFAULT 0,
  gap_categories TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_pilots_country ON public.pilots(country);
CREATE INDEX idx_pilots_status ON public.pilots(status);
GRANT SELECT ON public.pilots TO anon, authenticated;
GRANT ALL ON public.pilots TO service_role;
ALTER TABLE public.pilots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read pilots" ON public.pilots FOR SELECT USING (true);
CREATE TRIGGER trg_pilots_updated_at BEFORE UPDATE ON public.pilots
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ FAILURE MODES ============
CREATE TABLE public.failure_modes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pilot_id UUID REFERENCES public.pilots(id) ON DELETE CASCADE,
  category TEXT,
  severity TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_failure_modes_pilot ON public.failure_modes(pilot_id);
GRANT SELECT ON public.failure_modes TO anon, authenticated;
GRANT ALL ON public.failure_modes TO service_role;
ALTER TABLE public.failure_modes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read failure_modes" ON public.failure_modes FOR SELECT USING (true);
CREATE TRIGGER trg_failure_modes_updated_at BEFORE UPDATE ON public.failure_modes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
