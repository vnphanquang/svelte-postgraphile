import { RequestInit } from '@repos/base';
import ClientConfig from '@config/client';
import type Session from '@models/Session';

class AuthRepo {
  static BASE_URL: string = `${ClientConfig.api.url}${ClientConfig.api.routes.auth}`

  static async login(email: string, password: string):Promise<any> {
    try {
      const response: Response = await fetch(`${AuthRepo.BASE_URL}`, {
        ...RequestInit, 
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (response.ok && response.status === 200) {
        const session: Session = await response.json();
        return session;
      } else {
        console.error(`response.ok? ${response.ok}, response.status? ${response.status}`)
        const body = await response.json();
        throw new Error(body.error);
      }
    } catch (e) {
      console.error('Repo*Auth*loginWithEmail', e);
      throw e;
    }
  }

  static async logout():Promise<true> {
    try {
      const response: Response = await fetch(`${AuthRepo.BASE_URL}`, {
        ...RequestInit, 
        method: 'DELETE',
      });
      if (response.ok && response.status === 200) {
        return true;
      } else {
        console.error(`response.ok? ${response.ok}, response.status? ${response.status}`)
        const body = await response.json();
        throw new Error(body.error);
      }
      } catch (e) {
      console.error('Repo*Auth*logout', e);
      throw e;
    }
  }
}

export default AuthRepo;
