import AppConfig from '@app/config';
import { RequestInit } from '@repos/base';

class AuthRepo {
  static BASE_URL: string = `${AppConfig.api.root}${AppConfig.api.auth}`

  static async loginWithEmail(email: string):Promise<any> {
    try {
      const response: Response = await fetch(`${AuthRepo.BASE_URL}/?byEmail=true`, {
        ...RequestInit, 
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      if (response.ok && response.status === 200) {
        const auth: any = await response.json();
        // FIXME: auth: { authenticated: boolean, claims: JwtToken }
        return auth;
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
