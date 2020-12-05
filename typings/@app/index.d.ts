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

  interface Postgraphile {
    schema: string;
    options: Partial<import("postgraphile").PostGraphileOptions>;
  }

  interface Cookies {
    [name: string]: {
      name: string;
      options: import("express").CookieOptions
    }
  }
  
  export let api: Api;
  export let postgraphile: Postgraphile;
  export let cookies: Cookies;
}
