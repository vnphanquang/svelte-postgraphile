import { Router } from '@beyonk/sapper-rbac';
import { Scope } from '@services/graphql/generated/types';

const routes = new Router()
  .restrict('/admin.*', [Scope.Manager])
  .unrestrict('.*')
  .build()

export default routes;
