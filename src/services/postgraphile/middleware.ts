import postgraphile, { PostGraphileOptions } from 'postgraphile';
import pgSimplifyInflector from '@graphile-contrib/pg-simplify-inflector';
import path from 'path';
import MigrantConfig from '@app/migrant';
import AppConfig from '@app/config';

const pgConfig = {
  user    : MigrantConfig.database_user,
  password: MigrantConfig.database_password,
  host    : MigrantConfig.database_host,
  database: MigrantConfig.database_name,
  port    : parseInt(MigrantConfig.database_port),
}

const postgraphileOptions: PostGraphileOptions = {
  appendPlugins: [
    pgSimplifyInflector,
  ],
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: false,
  showErrorStack: 'json',
  extendedErrors: ['hint', 'detail', 'errcode'],
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain(req) {
    // TODO: customize condition!
    return true;
  },
  enableQueryBatching: true,
  legacyRelations: 'omit',
  // pgSettings(req) {
  //   /* TODO */
  // },
  ...AppConfig.postgraphile.options,
  exportGqlSchemaPath: path.resolve(AppConfig.postgraphile.options.exportGqlSchemaPath as string),
}

export default postgraphile(
  pgConfig,
  AppConfig.postgraphile.schema,
  postgraphileOptions,
);
