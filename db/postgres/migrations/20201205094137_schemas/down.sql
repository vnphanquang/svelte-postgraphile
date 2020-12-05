revoke usage on schema public from anonymous;

drop role if exists admin;
drop role if exists anonymous;

drop extension if exists "uuid-ossp";
drop extension if exists "pgcrypto";

drop schema if exists common;
drop schema if exists private;
