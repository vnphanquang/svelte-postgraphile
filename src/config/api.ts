import AppEnv from "@env";

export interface ApiConfig {
  url: string;
  routes: {
    [endpoint: string]: string;
  }
}

const apiConfig: ApiConfig = {
  url: `${AppEnv.app.host}:${AppEnv.app.port}/`,
  routes: {
    graphql: '/graphql',
    auth: '/auth',
  },
}

export default apiConfig;
