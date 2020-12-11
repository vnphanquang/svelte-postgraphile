# Svelte Template

Fullstack Scaffolding template for a monolithic application built on top of [sapper] & [typescript], bundled with [rollup].

## Frontend

- [svelte] as main UI framework
- [tailwind] as main CSS framework
- [postcss] as CSS preprocessor

## Backend

- [express] as main backend server
- [postgraphile] as express middleware to server proxy [graphQL] server to [postgreSQL]

# Table of contents

- [Introduction](#svelte-template)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Development Setup](#development-setup)
  - [Prerequisites](#prerequisites)
  - [Secret Sharing](#secret-sharing)
    - [Request Secret Sharing - For New Team Member](#request-secret-sharing---for-new-team-member)
    - [Share Secrets - For Repo Admin](#share-secrets---for-repo-admin)
    - [Backup / Import GPG Key](#backup--import-gpg-key)
  - [Database](#database)
  - [Application Startup](#application-startup)
  - [Git Hooks](#git-hooks)
- [Code Generation Overview](#code-generation-overview)
- [Deployment](#deployment)

# Development Setup

## Prerequisites

- [node ^v12.18.4][node.get], recommended with [nvm][nvm.get]
- [yarn][yarn.get] 
- [rust][rust.get] and rust package [migrant][] for database migrations.
- [Docker][docker.get]
- [git-secret][git-secret.get] (might require to [install gpg][gnupg])
- [Datagrip] is recommended for more friendly extensive postgreSQL development experience

## Secret Sharing

See [git-secret][] documentation for use of unpacking or changing secrets!

### [Request Secret Sharing][git-secret.using-gpg] - For New Team Member

1. Generate gpg key locally: `gpg --gen-key`
2. Export gpg key: `gpg --export your_email@domain.com --armor > your_email.public.gpg`
3. Send to admin to add to repo config.

### Share Secrets - For Repo Admin

1. Import gpg public key: `gpg --import their_email.public.gpg`
2. Add to repo config: `git secret tell their_email@domain.com`
3. Re-encrypt secrets: `git secret reveal && git secret hide -d`
4. Commit and push to upstream.

### Backup / Import GPG Key

1. Find ID of your key: `gpg --list-secret-keys your_email@domain.com` (line right above uid your email ...)
2. Export key: `gpg --armor --export-secret-keys YOUR_ID_HERE > your_email.private.gpg`
3. Import key: `gpg --import your_email.private.gpg`

## Database

1. Run postgres locally using docker

    ```bash
    docker run -d --name sveltepost -p 5555:5432 \
    -e POSTGRES_PASSWORD="sveltepost" \
    -e POSTGRES_DB="sveltepost" \
    postgres
    ```

2. Setup `Migrant.toml` if not already

   - run `migrant init` **at root directory** to scaffold a `Migrant.toml`
   - edit config file to match the postgreSQL server in (1)

      ```toml
      # Required, do not edit
      database_type = "postgres"

      # Required database info
      database_name = "sveltepost"
      database_user = "postgres"
      database_password = "sveltepost"

      # Configurable database info
      database_host = "localhost"
      database_port = "5555"
      migration_location = "db/postgres/migrations"

      # Extra database connection parameters
      # with the format:
      # [database_params]
      # key = "value"
      [database_params]
      ```

    - this config file should be *gitignored* and add to secret with `git secret add Migrant.toml`

3. Connect & run migrations

    ```bash
    # setup
    git secret reveal       # unpack Migrant.toml file, if not already
    migrant setup           # setup connection

    # test connection
    migrant shell           # connect to postgres shell
    # if you can get to the postgres shell, connection is okay

    # migration
    migrant apply -a        # up
    migrant apply -a --down # down
    ```

## Application Startup

1. Install dependencies: `yarn` or `yarn install`
2. Run application: `yarn dev`
3. Application:
    - [Webapp](http:localhost:5252): http:localhost:5252
    - [Graphql API](http:localhost:5252/graphql): http:localhost:5252/graphql
    - [Graphiql](http:localhost:5252/graphiql): http:localhost:5252/graphiql

## Git Hooks

The project has some preset git hooks at `scripts/.githooks` folder and can be setup with:

```bash
# run at project root
bash ./scripts/setup.bash
```

- To enforce [Angular Commit Style Guide][angular.commit-style-guide], uncomment all of [commit-msg] file
- To enforce `svelte-check` on commit, uncomment the `lint & format` section in [pre-commit]

# Code Generation Overview

| Type | Manual Source | Source | Source Language | Generated | Generated Language | Config | Engine |
| ---- | ------------- | ------ | --------------- | --------- | ------------------ | ------ | ------ |
| Schema | Yes | Postgres Schema | Postgresql | [GRAPHQL_SCHEMA] | Graphql | [POSTGRAPHILE_CONFIG] | [postgraphile] |
| Schema | No  | [GRAPHQL_SCHEMA] | GraphQL | [SCHEMA_TYPES] | Typescript | [GRAPHQL_CODGEGEN] | [graphql-codegen] |
| Fragments | Yes | [FRAGMENTS_DIR] | GraphQL | [DOCUMENT_TYPES] | Typescript | [GRAPHQL_CODGEGEN] | [graphql-codegen]
| Documents | Yes | [DOCUMENTS_DIR] | GraphQL | [DOCUMENT_TYPES] | Typescript | [GRAPHQL_CODGEGEN] | [graphql-codegen]

**!!**  Each group of Fragments and Documents are joined and generated into single Document file, scoped based on business logic. See [GRAPHQL_CODGEGEN] yaml for full config.


# Deployment

Application can be deployed in various methods. One of the most simple way is:

1. Generate a production build: `yarn prod`
2. Transfer build to server machine
3. Set up docker & run postgreSQL as described in [Development Setup](#development-setup)
4. Setup [pm2] & start application server: `pm2 start yarn --interpreter bash --name sveltepost -- start`

# Todo Checklist

- [ ] Improve Error Handling
- [ ] Add JSDoc documentation
- [ ] Configure for compatibility of Svelte with `Nullish coalesce` and `Optional chaining`
- [ ] Self build RBAC (based on `@beyonk/sapper-rbac`)


[sapper]: https://sapper.svelte.dev/docs

[docker.get]: https://docs.docker.com/get-docker/

[git-secret]: https://git-secret.io
[git-secret.get]: https://git-secret.io/installation
[git-secret.using-gpg]: https://git-secret.io/#using-gpg

[gnupg]: https://gnupg.org/index.html

[rust.get]: https://www.rust-lang.org/tools/install
[migrant]: https://github.com/jaemk/migrant
[migrant.get]: https://github.com/jaemk/migrant#installation

[postgraphile]: https://www.graphile.org/postgraphile/
[graphql-codegen]: https://graphql-code-generator.com/

[svelte]: https://svelte.dev/docs
[tailwind]: https://tailwindcss.com/
[postcss]: https://postcss.org/
[express]: https://expressjs.com/
[typescript]: https://www.typescriptlang.org/
[rollup]: https://rollupjs.org/guide/en/
[apollo]: https://www.apollographql.com/docs/
[graphQL]: https://graphql.org/
[postgreSQL]: https://www.postgresql.org/
[node.get]: https://nodejs.org/en/download/
[nvm.get]: https://github.com/nvm-sh/nvm
[yarn.get]: https://classic.yarnpkg.com/en/docs/install/
[Datagrip]: https://www.jetbrains.com/datagrip/
[pm2]: https://pm2.keymetrics.io/
[angular.commit-style-guide]: https://github.com/angular/angular/blob/master/CONTRIBUTING.md

[GRAPHQL_SCHEMA]: ./src/services/graphql/generated/schema.graphql
[SCHEMA_TYPES]: ./src/services/graphql/generated/types.ts
[POSTGRAPHILE_CONFIG]: ./src/services/postgraphile/middleware.ts
[FRAGMENTS_DIR]: ./src/services/graphql/fragments
[DOCUMENTS_DIR]: ./src/services/graphql/documents
[GRAPHQL_CODGEGEN]: ./codegen.graphql.yaml
[DOCUMENT_TYPES]: ./src/services/graphql/generated/documents
[commit-msg]: ./scripts/.githooks/commit-msg
[pre-commit]: ./scripts/.githooks/pre-commit
