drop type if exists public.scope;
create type public.scope as enum (
    'VISITOR',      -- can visit site
    'MANAGER'       -- can manage site
    );

-----------public.role-------------
drop type if exists public.role;
create type public.role as enum (
    'USER',
    'ADMIN'
    );

-----------public.role_scopes-------------
drop table if exists public.role_scopes;
create table public.role_scopes (
    role   public.role unique,
    scopes public.scope[]
);

comment on table public.role_scopes is E'@omit create,delete\nMapping of role to scopes';
comment on column public.role_scopes.role is 'Role of a registered account';
comment on column public.role_scopes.scopes is 'Array of scopes bound to account';

insert into public.role_scopes (role, scopes)
values ('USER'::public.role, array ['VISITOR']::public.scope[]),
      ('ADMIN'::public.role, array ['VISITOR', 'MANAGER']::public.scope[]);

grant select on public.role_scopes to "ANONYMOUS";
grant update on public.role_scopes to "ADMIN";

-----------public.account-------------
drop table if exists public.account;
create table public.account (
    id              uuid        primary key     default uuid_generate_v1mc(),
    role            public.role                 default 'USER'::public.role,
    first_name      text        not null        check (char_length(first_name) < 100),
    last_name       text                        check (char_length(last_name) < 100),
    password_hash   varchar     not null,
    email           text        not null unique check (email ~* '^.+@.+\..+$'),
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
comment on column public.account.created_at is E'@omit create,update\nTimestamp of an account creation';
comment on column public.account.updated_at is E'@omit create,update\nTimestamp of an update to account';
comment on column public.account.deleted_at is E'@omit create\nTimestamp of the soft deletion of account';

drop trigger if exists account_updated_at on public.account;
create trigger account_updated_at
    before update of role, first_name, last_name, password_hash, email
    on public.account
    for each row
execute procedure common.set_updated_at();

grant select on public.account to "ANONYMOUS";
grant select, update, delete on public.account to "USER";

alter table public.account enable row level security;

create policy select_account on public.account for select
    using (
        id = current_setting('jwt.claims.id', true)::uuid
        or current_setting('jwt.claims.role')::public.role = 'ADMIN'
    );

create policy update_account on public.account for update
    using (
        id = current_setting('jwt.claims.id', true)::uuid
        or current_setting('jwt.claims.role')::public.role = 'ADMIN'
    );

create policy delete_account on public.account for delete
    using (
        id = current_setting('jwt.claims.id', true)::uuid
        or current_setting('jwt.claims.role')::public.role = 'ADMIN'
    );

-----------public.jwt_token-------------
drop type if exists public.jwt_token;
create type public.jwt_token as (
    role    public.role,
    id      uuid,
    name    text,
    exp     integer,
    iss     text
);
----------public.register_account-------------
create or replace function public.register_account(
    "$first_name"       text,
    "$email"            text,
    "$last_name"        text    default '',
    "$password"         text    default 'sveltepost'
) returns public.account as $$
    declare
        "$account" public.account%rowtype;
    begin
        perform from public.account where email = "$email";
        if found then
            raise exception 'Email % has already been registered', "$email";
        end if;
        insert into public.account(first_name, last_name, email, password_hash) values
            (
                "$first_name",
                "$last_name",
                "$email",
                crypt("$password", gen_salt('bf')) -- blowfish algorithm salt generation
            ) returning * into "$account";
        return "$account";
    end
$$ language plpgsql strict security definer;

comment on function public.register_account("$first_name" text, "$email" text, "$last_name" text, "$password" text) is 'Register a single account';
grant execute on function public.register_account("$first_name" text, "$email" text, "$last_name" text, "$password" text) to "ANONYMOUS";

--------------public.authenticate----------
create or replace function public.authenticate(
    "$email" text,
    "$password" text
) returns public.jwt_token as $$
    declare
        "$role" public.role;
        "$id"   uuid;
        "$name" text;
    begin
        select id, role, first_name into "$id", "$role", "$name"
            from public.account
            where email = "$email"
            and password_hash = crypt("$password", password_hash);
        if not found then
            raise exception 'No account found with such email or password';
        end if;
        return (
            "$role",
            "$id",
            "$name",
            extract(epoch from now() + interval '7 days'),
            'sveltepost'
        )::public.jwt_token;
    end
$$ language plpgsql strict security definer;

comment on function public.authenticate("$email" text, "$password" text) is 'Create a JWT for account identification and authorization with email & password';
grant execute on function public.authenticate("$email" text, "$password" text) to "ANONYMOUS";

------------public.current_account------------
create or replace function public.current_account() returns public.account as $$
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
grant execute on function public.current_account() to "USER";

-----------public.change_password-------------
create or replace function public.change_password(current_password text, new_password text)
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
grant execute on function public.change_password(current_password text, new_password text) to "USER";
