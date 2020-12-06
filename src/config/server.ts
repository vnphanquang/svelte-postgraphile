import AppEnv from '@env';
import AppMigrant from '@migrant';
import type { ClientConfig } from 'pg';
import cookies, { CookieConfig } from './cookies';
import postgraphile, { PostgraphileConfig } from './postgraphile';
import api, { ApiConfig } from './api';

interface ServerConfig extends AppEnv.App {
  migrant: ClientConfig,
  postgraphile: PostgraphileConfig,
  api: ApiConfig,
  cookies: CookieConfig,
}

const serverConfig: ServerConfig = {
  ...AppEnv.app,
  migrant: {
    user    : AppMigrant.database_user,
    password: AppMigrant.database_password,
    host    : AppMigrant.database_host,
    database: AppMigrant.database_name,
    port    : parseInt(AppMigrant.database_port),
  },
  postgraphile,
  api,
  cookies,
}

export default serverConfig;
