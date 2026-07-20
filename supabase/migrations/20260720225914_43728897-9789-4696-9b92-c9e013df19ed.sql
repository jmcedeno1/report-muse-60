
CREATE TABLE public.market_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  country TEXT NOT NULL,
  region TEXT,
  year INTEGER NOT NULL,
  metric TEXT NOT NULL,
  value NUMERIC NOT NULL,
  unit TEXT,
  category TEXT,
  source TEXT NOT NULL DEFAULT 'IEA',
  raw JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (country, year, metric, category, source)
);
GRANT SELECT ON public.market_stats TO anon, authenticated;
GRANT ALL ON public.market_stats TO service_role;
ALTER TABLE public.market_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read market_stats" ON public.market_stats FOR SELECT USING (true);

CREATE TABLE public.standards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  status TEXT,
  year INTEGER,
  scope TEXT,
  url TEXT,
  region TEXT,
  taxonomy_tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (code, organization)
);
GRANT SELECT ON public.standards TO anon, authenticated;
GRANT ALL ON public.standards TO service_role;
ALTER TABLE public.standards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read standards" ON public.standards FOR SELECT USING (true);

CREATE TABLE public.regulations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  uid TEXT NOT NULL UNIQUE,
  jurisdiction TEXT NOT NULL,
  title TEXT NOT NULL,
  agency TEXT,
  doc_type TEXT,
  publication_date DATE,
  url TEXT,
  summary TEXT,
  source TEXT NOT NULL,
  raw JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.regulations TO anon, authenticated;
GRANT ALL ON public.regulations TO service_role;
ALTER TABLE public.regulations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read regulations" ON public.regulations FOR SELECT USING (true);

CREATE TRIGGER update_market_stats_updated_at BEFORE UPDATE ON public.market_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_standards_updated_at BEFORE UPDATE ON public.standards
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_regulations_updated_at BEFORE UPDATE ON public.regulations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
