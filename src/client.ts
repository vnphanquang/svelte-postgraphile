import * as sapper from '@sapper/app';
import { account } from '@stores/account';

sapper.start({
  target: document.getElementById('sapper'),
}).then(() => {
  // FIXME: security risk
  let cachedAccountJSON: string | null = localStorage.getItem('account');
  if (cachedAccountJSON) {
    account.set(JSON.parse(cachedAccountJSON));
  }
});
