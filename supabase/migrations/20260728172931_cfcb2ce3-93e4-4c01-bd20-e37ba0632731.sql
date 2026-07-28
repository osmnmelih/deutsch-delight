-- 1. Remove anon access entirely (all policies are scoped to auth.uid())
REVOKE ALL ON public.profiles FROM anon;
REVOKE ALL ON public.user_progress FROM anon;
REVOKE ALL ON public.streak_history FROM anon;
REVOKE ALL ON public.notification_settings FROM anon;
REVOKE ALL ON public.user_srs_data FROM anon;

-- 2. Restrict authenticated to standard CRUD only
REVOKE ALL ON public.profiles FROM authenticated;
REVOKE ALL ON public.user_progress FROM authenticated;
REVOKE ALL ON public.streak_history FROM authenticated;
REVOKE ALL ON public.notification_settings FROM authenticated;
REVOKE ALL ON public.user_srs_data FROM authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_progress TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.streak_history TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notification_settings TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_srs_data TO authenticated;

GRANT ALL ON public.profiles TO service_role;
GRANT ALL ON public.user_progress TO service_role;
GRANT ALL ON public.streak_history TO service_role;
GRANT ALL ON public.notification_settings TO service_role;
GRANT ALL ON public.user_srs_data TO service_role;

-- 3. SECURITY DEFINER / trigger functions must not be callable via the API
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- 4. GraphQL API is unused by this app; remove its exposure
REVOKE USAGE ON SCHEMA graphql_public FROM anon, authenticated;
REVOKE USAGE ON SCHEMA graphql FROM anon, authenticated;
REVOKE ALL ON ALL TABLES IN SCHEMA graphql FROM anon, authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA graphql_public FROM anon, authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA graphql FROM anon, authenticated;