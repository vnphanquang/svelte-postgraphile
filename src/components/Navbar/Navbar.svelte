<script lang="typescript">
  import { stores, goto } from '@sapper/app';
  import AuthApi from '@api/auth';
  import Icon from 'svelte-awesome';
  import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

  const { session, page } = stores();

  $: authenticated = $session && !!$session.claims;

  async function logout() {
    await AuthApi.logout();
    session.set(null);
    await goto('/login');
    location.reload();
  }

  async function goToHome() {
    await goto('/');
    location.reload();
  }

</script>

<style lang="postcss">
  nav {
    @apply bg-gray-500 text-white;
    backdrop-filter: blur(100px);
  }

</style>

<nav class="navbar px-10 py-3 flex items-center fixed w-full z-50">
  <img
    class="cursor-pointer active:bounce h-10 md:h-12"
    src="/images/logo.svg"
    alt="SveltePost Logo"
    on:click={goToHome}
  >
  <h1 class="hidden md:block font-bold text-xl ml-4">SveltePost</h1>
  <section class="flex-1 flex {authenticated ? 'justify-between' : 'justify-end'} md:justify-end items-center">
    {#if authenticated}
      <p class="text-md md:text-lg italic text-left ml-4">
        <span>Hello</span>
        <span>!</span>
      </p>
      {#if $page.path !== '/test'}
        <button class="md:ml-8 sign-out active:bounce hover:primary" on:click={logout}>
          <Icon data={faSignOutAlt} label="log-out" scale={1.5} />
        </button>
      {/if}
    {:else if $page.path !== '/login'}
      <button class="md:ml-8 active:bounce hover:primary" on:click={async () => await goto('/login')}>
        <Icon data={faSignInAlt} label="log-out" scale={1.5} />
      </button>
    {/if}
  </section>
</nav>
