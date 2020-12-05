drop type if exists public.scope;
create type public.scope as enum (
    'visitor',      -- can visit site
    'manager'       -- can manage site
    );

-----------public.role-------------
drop type if exists public.role;
create type public.role as enum (
    'user',
    'admin'
    );

-----------public.role_scopes-------------
drop table if exists public.role_scopes;
create table public.role_scopes (
    role   public.role unique,
    scopes public.scope[]
);

insert into public.role_scopes (role, scopes)
values ('user'::public.role, array ['visitor']::public.scope[]),
      ('admin'::public.role, array ['visitor', 'manager']::public.scope[]);

grant update on public.role_scopes to admin;

-----------public.account-------------
drop table if exists public.account;
create table public.account (
    id              uuid        primary key     default uuid_generate_v1mc(),
    role            public.role                 default 'user',
    first_name      text        not null        check (char_length(first_name) < 100),
    last_name       text                        check (char_length(last_name) < 100),
    password_hash   varchar     not null,
    email           text        not null unique check (email ~* '^.+@.+\..+$'),
    phone           text        not null,
    created_at      timestamptz                 default now(),
    updated_at      timestamptz,
    deleted_at      timestamptz                 default null
);

comment on table public.account is E'@omit create\nA registered account';
comment on column public.account.password_hash is E'@omit';
comment on column public.account.id is E'@omit create,update\nId of account';
comment on column public.account.role is E'@omit create,update\nRole type associated with this account';
comment on column public.account.first_name is 'First name from an account';
comment on column public.account.last_name is 'Last name from an account';
comment on column public.account.email is 'Unique email of an account';
comment on column public.account.phone is 'Phone number of an account';
comment on column public.account.created_at is E'@omit create,update\nTimestamp of an account creation';
comment on column public.account.updated_at is E'@omit create,update\nTimestamp of an update to account';
comment on column public.account.deleted_at is E'@omit create\nTimestamp of the soft deletion of account';

drop trigger if exists account_updated_at on public.account;
create trigger account_updated_at
    before update of role, first_name, last_name, password_hash, email, phone
    on public.account
    for each row
execute procedure common.set_updated_at();

grant select on public.account to anonymous;
grant select, update, delete on public.account to "user";

alter table public.account enable row level security;

create policy select_account on public.account for select
    using (
        id = current_setting('jwt.claims.id', true)::uuid
        or current_setting('jwt.claims.role')::public.role = 'admin'
    );

create policy update_account on public.account for update
    using (
        id = current_setting('jwt.claims.id', true)::uuid
        or current_setting('jwt.claims.role')::public.role = 'admin'
    );

create policy delete_account on public.account for delete
    using (
        id = current_setting('jwt.claims.id', true)::uuid
        or current_setting('jwt.claims.role')::public.role = 'admin'
    );

-----------public.jwt_token-------------
create type public.jwt_token as (
    role public.role,
    scopes public.scope[],
    id uuid
);
----------public.register_account-------------
create function public.register_account(
    "$first_name"       text,
    "$email"            text,
    "$phone"            text,
    "$last_name"        text    default '',
    "$password"         text    default 'sveltepost'
) returns public.jwt_token as $$
    declare
        "$role"    public.role;
        "$scopes"  public.scope[];
        "$id"      uuid;
    begin
        perform from public.account where email = "$email";
        if found then
            raise exception 'Email % has already been registered', "$email";
        end if;
        insert into public.account(first_name, last_name, email, phone, password_hash) values
            (
                "$first_name",
                "$last_name",
                "$email",
                "$phone",
                crypt("$password", gen_salt('bf')) -- blowfish algorithm salt generation
            ) returning id, role into "$id", "$role";
        select scopes into "$scopes"
            from public.role_scopes
            where role = "$role";
        return ("$role", "$scopes", "$id")::public.jwt_token;
    end
$$ language plpgsql strict security definer;

comment on function public.register_account("$first_name" text, "$email" text, "$phone" text, "$last_name" text, "$password" text) is 'Register a single account';
grant execute on function public.register_account("$first_name" text, "$email" text, "$phone" text, "$last_name" text, "$password" text) to anonymous;

--------------public.authenticate----------
create function public.authenticate(
    "$email" text,
    "$password" text
) returns public.jwt_token as $$
    declare
        "$role"    public.role;
        "$scopes"  public.scope[];
        "$id"      uuid;
    begin
        select id, role into "$id", "$role"
            from public.account
            where email = "$email"
            and password_hash = crypt("$password", password_hash);
        if not found then
            raise exception 'No account found with such email or password';
        end if;
        select scopes into "$scopes"
            from public.role_scopes
            where role = "$role";
        return ("$role", "$scopes", "$id")::public.jwt_token;
    end
$$ language plpgsql strict security definer;

comment on function public.authenticate("$email" text, "$password" text) is 'Create a JWT for account identification and authorization with email & password';
grant execute on function public.authenticate("$email" text, "$password" text) to anonymous;

------------public.current_account------------
create function public.current_account() returns public.account as $$
    declare
        account public.account;
    begin
        select * into account
            from public.account
            where id = current_setting('jwt.claims.id', true)::uuid;
        if not found then
            raise exception 'Unauthenticated';
        end if;
        return account;
    end
$$ language plpgsql stable security definer;

comment on function public.current_account() is 'Get current logged-in account identified by JWT';
grant execute on function public.current_account() to "user";

-----------public.change_password-------------
create function public.change_password(current_password text, new_password text)
returns boolean as $$
    declare
        "$account" public.account;
    begin
        "$account" := public.current_account();
        if exists (
            select 1
            from public.account
            where id = "$account".id
            and password_hash = crypt(
              current_password, password_hash
            )
        )
        then
            update public.account
            set password_hash = crypt(
                    new_password,
                    gen_salt('bf')
                )
            where id = "$account".id;
        end if;
        return true;
    end
$$ language plpgsql strict security definer;

comment on function public.change_password(current_password text, new_password text) is 'Change password of an existing account';
grant execute on function public.change_password(current_password text, new_password text) to "user";
