create schema if not exists private;
create schema if not exists public;
create schema if not exists common;

------------------------
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

------------------------
create role "ANONYMOUS";

create role "USER";
grant "ANONYMOUS" to "USER";

create role "ADMIN";
grant "USER" to "ADMIN";

------------------------
grant usage on schema public to "ANONYMOUS";

alter default privileges revoke execute on functions from public;
