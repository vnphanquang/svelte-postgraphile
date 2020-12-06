declare module '@migrant' {
  // map to toml config file at Migrant.toml
  // for database config
  export let database_user: string;
  export let database_password: string;
  export let database_host: string;
  export let database_name: string;
  export let database_port: string;
  export let database_type: string;
  export let migration_location: string;
}

declare module '@env' {
  // map to toml env file at src/config/env/env.[mode].toml
  // for variables that are sensitive (secrets) or
  // change based on environment (development, production, ...)

  interface App {
    host: string;
    port: string;
  }

  export let jwt_secret: string;
  export let app: App;
}
