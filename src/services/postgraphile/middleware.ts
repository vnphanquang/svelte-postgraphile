import postgraphile, { PostGraphileOptions } from 'postgraphile';
import pgSimplifyInflector from '@graphile-contrib/pg-simplify-inflector';
import path from 'path';
import MigrantConfig from '@app/migrant';

const JWT_SECRET = 'DSV_TESTER_JWT';
const EXPORT_SCHEMA_PATH = 'src/services/graphql/generated/schema.graphql';

const pgConfig = {
  user    : MigrantConfig.database_user,
  password: MigrantConfig.database_password,
  host    : MigrantConfig.database_host,
  database: MigrantConfig.database_name,
  port    : parseInt(MigrantConfig.database_port),
}

// const ownerConnectionString = `postgres://${MigrantConfig.database_user}:${MigrantConfig.database_password}@${pgConfig.host}:${pgConfig.port}/${pgConfig.database}`

const postgraphileOptions: PostGraphileOptions = {
  // ownerConnectionString,
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
  exportGqlSchemaPath: path.resolve(EXPORT_SCHEMA_PATH),
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
  jwtPgTypeIdentifier: 'public.jwt_token',
  jwtSecret: JWT_SECRET,
  pgDefaultRole: 'anonymous',
}

const schemaName: string = 'public';

export default postgraphile(
  pgConfig,
  schemaName,
  postgraphileOptions,
);
