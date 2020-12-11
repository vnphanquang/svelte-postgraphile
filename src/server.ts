import * as sapper from '@sapper/server';
import compression from 'compression';
import express, { NextFunction, Request, Response } from 'express';
import sirv from 'sirv';
import cookieParser from 'cookie-parser';
import jsonwebtoken from 'jsonwebtoken';
import { guard } from '@beyonk/sapper-rbac';

import { postgraphile } from '@services/postgraphile';
import rbacRoutes from '@services/rbac';
import ServerConfig from '@config/server';
import type { JWTClaims } from '@models/Session';
import AuthRepo from '@repos/auth';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

if (dev) {
  // print out app config
  console.log('---------SERVER CONFIG-----------');
  console.log(JSON.stringify(ServerConfig, null, 2));
  console.log('---------------------------------');
}

express()
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    cookieParser(),
  )
  .use(ServerConfig.api.routes.graphql, (req: Request, _: Response, next: NextFunction) => {
    const token = req.cookies[ServerConfig.cookies.jwt.name];
    if (token) {
      req.headers.authorization = 'Bearer ' + token;
    }
    next();
  })
  .use(postgraphile)
  .post(ServerConfig.api.routes.auth,
    express.json(),
    async (req: Request, res: Response) => {
      try {
        const { email, password } = req.body;

        const jwt = await AuthRepo.authenticate(email, password);
        if (jwt) {
          // set auth cookie
          const { name, options } = ServerConfig.cookies.jwt;
          res.cookie(name, jwt, options);

          // decode claims for json return (used for svelte session store)
          const claims = jsonwebtoken.decode(jwt) as JWTClaims;

          // get scope by this account role
          const scopes = await AuthRepo.getScopes(claims.role);

          res.status(200).json({
            claims: jsonwebtoken.decode(jwt),
            scopes,
          });
        } else {
          res.status(401).json({
            error: "Invalid Credentials",
            jwtToken: null
          });
        }
      } catch (e) {
        if (e.graphQLErrors && e.graphQLErrors[0]) {
          res.status(500).json({
            error: e.graphQLErrors[0].message,
          });
        } else {
          res.status(500).json({
            error: e.message,
          });
        }
      }
    },
  )
  .delete(ServerConfig.api.routes.auth, (_: Request, res: Response) => {
    try {
      res.clearCookie(ServerConfig.cookies.jwt.name);
      res.status(200).end();
    } catch (e) {
      if (e.graphQLErrors && e.graphQLErrors[0]) {
        res.status(500).json({
          error: e.graphQLErrors[0].message,
        });
      } else {
        res.status(500).json({
          error: e.message,
        });
      }
    }
  })
  .use(
    async (req: Request, res: any, next: NextFunction) => {
      const token = req.cookies[ServerConfig.cookies.jwt.name];
      if (token) {
        const claims = jsonwebtoken.decode(token) as JWTClaims;
        
        const scopes = await AuthRepo.getScopes(claims.role);
        // set scopes for @beyonk/sapper-rbac;
        res.user = {
          scope: scopes,
        };
      }
      next();
    },
    (req: Request, res: any, next: NextFunction) => {
      const token = req.cookies[ServerConfig.cookies.jwt.name];
      const claims = token && jsonwebtoken.decode(token);
      const options = {
        routes: rbacRoutes,
        deny: () => {
          res.writeHead(302, { Location: '/login' });
          return res.end();
        },
        grant: () => {
          return sapper.middleware({
            session: () => ({
              claims,
              scopes: res.user,
            }),
          })(req, res, next);
        },
      };
      return guard(req.path, res.user, options);
    },
  )
  .listen(ServerConfig.port, (err?: any) => {
    if (err) console.log('error', err);
  });
