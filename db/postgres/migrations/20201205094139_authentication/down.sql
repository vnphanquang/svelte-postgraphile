------------PUBLIC------------
drop function if exists public.change_password(current_password text, new_password text);
drop function if exists public.current_account();
drop function if exists public.authenticate("$email" text, "$password" text);
drop function if exists public.register_account("$first_name" text, "$email" text, "$phone" text, "$last_name "text, "$password" text);
-- drop view if exists public.personal_account;
drop type if exists public.jwt_token;
drop policy if exists select_account on public.account;
drop policy if exists update_account on public.account;
drop policy if exists delete_account on public.account;
drop trigger if exists account_updated_at on public.account;
alter table public.account disable row level security;
drop table if exists public.account;

drop table if exists public.role_scopes;
drop type if exists public.role;
drop type if exists public.scope;
