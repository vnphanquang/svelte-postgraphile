revoke usage on schema public from anonymous;

drop role if exists "ADMIN";
drop role if exists "USER";
drop role if exists "ANONYMOUS";

drop extension if exists "uuid-ossp";
drop extension if exists "pgcrypto";

drop schema if exists common;
drop schema if exists private;
