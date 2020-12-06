import postgraphile, { PostGraphileOptions } from 'postgraphile';
import pgSimplifyInflector from '@graphile-contrib/pg-simplify-inflector';
import ServerConfig from '@config/server';

const postgraphileOptions: PostGraphileOptions = {
  appendPlugins: [
    pgSimplifyInflector,
  ],
  subscriptions: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: false,
  allowExplain(req) {
    // TODO: customize condition!
    return true;
  },
  enableQueryBatching: true,
  legacyRelations: 'omit',
  // pgSettings(req) {
  //   /* TODO */
  // },
  ...ServerConfig.postgraphile.options,
}

export default postgraphile(
  ServerConfig.migrant,
  ServerConfig.postgraphile.schema,
  postgraphileOptions,
);
