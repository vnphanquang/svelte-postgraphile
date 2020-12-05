import * as sapper from '@sapper/server';
import compression from 'compression';
import express, { NextFunction, Request, Response } from 'express';
import sirv from 'sirv';
import cookieParser from 'cookie-parser';
import jsonwebtoken from 'jsonwebtoken';

import { postgraphile } from '@services/postgraphile';
import apolloClient from '@services/graphql/apollo';
import { Authenticate } from '@services/graphql/generated/documents/auth';
import type {
  AuthenticateMutation,
  AuthenticateMutationVariables,
} from '@services/graphql/generated/types';

const PORT = process.env.PORT;
const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const JWTCookie = {
  name: 'dsv-tester-auth',
  config: {
    httpOnly: true,
  }
}

express()
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    cookieParser(),
  )
  .use('/graphql', (req: Request, _: Response, next: NextFunction) => {
    const token = req.cookies[JWTCookie.name];
    if (token) {
      req.headers.authorization = 'Bearer ' + token;
    }
    next();
  })
  .use(postgraphile)
  .post('/auth',
    express.json(),
    async (req: Request, res: Response) => {
      try {
        const { email, password } = req.body;

        let jwt = null;
        const { data } = await apolloClient.mutate<AuthenticateMutation, AuthenticateMutationVariables>({
          mutation: Authenticate,
          variables: {
            email,
            password,
          },
        });
        jwt = data && data.authenticate && data.authenticate.jwtToken;
        if (jwt) {
          res.cookie(JWTCookie.name, jwt, JWTCookie.config);
          res.status(200).json({
            claims: jsonwebtoken.decode(jwt),
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
  .delete('/auth', (_: Request, res: Response) => {
    try {
      res.clearCookie(JWTCookie.name);
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
    (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies[JWTCookie.name];
      const claims = token && jsonwebtoken.decode(token);
      return sapper.middleware({
        session: () => {
          return {
            claims,
          }
        }
      })(req, res, next)
    },
  )
  .listen(PORT, (err?: any) => {
    if (err) console.log('error', err);
  });
