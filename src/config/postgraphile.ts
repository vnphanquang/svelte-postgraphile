import type { PostGraphileOptions } from "postgraphile";
import Env from '@env';
import path from 'path';

export interface PostgraphileConfig {
  schema: string;
  options: Partial<PostGraphileOptions>;
}

const dev = process.env.NODE_ENV === 'development';

const postgraphileConfig: PostgraphileConfig = {
  schema: 'public',
  options: {
    watchPg: !!dev,
    graphiql: !!dev,
    enhanceGraphiql: !!dev,
    showErrorStack: !!dev && 'json',
    extendedErrors: ['hint', 'detail', 'errcode'],
    exportGqlSchemaPath: path.resolve('src/services/graphql/generated/schema.graphql'),
    pgDefaultRole: 'ANONYMOUS',
    jwtPgTypeIdentifier: 'public.jwt_token',
    jwtSecret: Env.jwt_secret,
  },
}

export default postgraphileConfig;
