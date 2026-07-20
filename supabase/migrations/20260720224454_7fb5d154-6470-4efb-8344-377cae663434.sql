
ALTER VIEW public.patents_by_year         SET (security_invoker = true);
ALTER VIEW public.publications_by_year    SET (security_invoker = true);
ALTER VIEW public.patents_top_orgs        SET (security_invoker = true);
ALTER VIEW public.publications_top_orgs   SET (security_invoker = true);
ALTER VIEW public.patents_top_countries   SET (security_invoker = true);
ALTER VIEW public.publications_top_countries SET (security_invoker = true);
ALTER VIEW public.patents_themes          SET (security_invoker = true);
ALTER VIEW public.publications_themes     SET (security_invoker = true);
ALTER VIEW public.news_by_domain          SET (security_invoker = true);
ALTER VIEW public.news_by_country         SET (security_invoker = true);
ALTER VIEW public.corpus_summary          SET (security_invoker = true);
