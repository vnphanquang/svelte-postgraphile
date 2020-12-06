import AppEnv from '@env';
import api, { ApiConfig } from './api';

interface ClientConfig extends AppEnv.App {
  api: ApiConfig,
}

const clientConfig: ClientConfig = {
  ...AppEnv.app,
  api,
}

export default clientConfig;

