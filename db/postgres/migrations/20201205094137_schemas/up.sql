create schema if not exists private;
create schema if not exists public;
create schema if not exists common;

------------------------
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

------------------------
create role anonymous;

create role "user";
grant anonymous to "user";

create role admin;
grant "user" to admin;

------------------------
grant usage on schema public to anonymous;

alter default privileges revoke execute on functions from public;
