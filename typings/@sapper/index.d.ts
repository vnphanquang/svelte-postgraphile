declare module '@sapper/app';
declare module '@sapper/server';
declare module '@sapper/service-worker';
declare module '*.toml';
declare module 'cookie-parser';

declare module '@app/migrant' {
  // map to toml config file at Migrant.toml
  export let database_user: string;
  export let database_password: string;
  export let database_host: string;
  export let database_name: string;
  export let database_port: string;
  export let database_type: string;
  export let migration_location: string;
}

declare module '@app/config' {
  // map to toml config file at config/config.[env].toml
  interface Api {
    [route: string]: string;
  }
  
  export let api: Api;
}
