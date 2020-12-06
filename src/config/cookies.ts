import type { CookieOptions } from 'express';

export interface CookieConfig {
  [cookie: string]: {
    name: string;
    options: CookieOptions;
  };
}

const cookieConfig: CookieConfig = {
  jwt: {
    name: 'sveltepost-auth',
    options: {
      httpOnly: true,
    }
  }
}

export default cookieConfig;
