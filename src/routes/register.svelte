<script context="module">

	export async function preload(this: any, _: any, session: any) {
    try {
      const { claims } = session;
      if (claims) {
        return this.redirect(302, '/');
      }
    } catch (e) {
      console.error(e)
      this.error(500, e);
    }
  };
</script>

<script lang="typescript">
  import { goto, stores } from '@sapper/app';
  import AccountApi from '@api/account';
  import AuthApi from '@api/auth';
  import { debounce, validateEmail } from '@utils/index';
  import Icon from 'svelte-awesome';
  import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

  let firstName: string = '';
  let lastName: string = '';
  let email: string = '';
  let password: string = '';
  let error: string = '';
  let revealPassword = false;

  const { session } = stores();

  $: isValidEmail = email.length && validateEmail(email);

  const submit = debounce(async () => {
    try {
      // register account
      const account = await AccountApi.register({
        firstName,
        email,
        ...(lastName && { lastName }),
        ...(password && { password }),
      });
      if (account) {
        // automatically log in
        const auth = await AuthApi.login(email, password);
        auth && session.set(auth);
        await goto('/');
      }
    } catch (e) {
      error = e.message;
      console.error(e);
    }
  }, 500);

  function togglePasswordRevelation() {
    revealPassword = !revealPassword;
  }

  function onPasswordChange(e: any) {
    password = e.target.value;
  }
</script>


<style lang="postcss">
  .register__inputs {
    & label {
      @apply text-lg;
    }
    flex-direction: column;

    grid-template-columns: 30% 70%;
    grid-template-rows: auto;
    row-gap: 20px;
  }

  .input-group {
    @apply flex flex-col w-full;

    & .input-group__hint {
      @apply text-xs mt-2;
    }
  }

</style>

<section class="container w-11/12 sm:w-8/12 lg:w-6/12 flex-1 flex items-center justify-items-center">
  <form class="pb-16 w-full" on:submit|preventDefault={submit}>
    <header class="text-3xl my-8 text-center">Register your account...</header>
    <div class="register__inputs flex items-start md:grid md:items-center">
      <label for="register__firstName">First name (*)</label>
      <input
        class="input mb-4 md:mb-0"
        id="register__firstName"
        name="firstName"
        type="text"
        bind:value={firstName}
        placeholder="Ex: Stephen"
      />
      <label for="register__lastName">Last name</label>
      <input
        class="input mb-4 md:mb-0"
        id="register__lastName"
        name="lastName"
        type="text"
        bind:value={lastName}
        placeholder="Ex: Colbert"
      />
      <label for="register__email">Email (*)</label>
      <div class="input-group mb-4 md:mb-0">
        <input
          class="input{email.length && !isValidEmail ? ' invalid' : ''}"
          id="register__email"
          name="email"
          type="email"
          bind:value={email}
          placeholder="Ex: stephen.colbert@gmail.com"
        />
        {#if email.length && !isValidEmail}
          <p class="input-group__hint text-red-500">
            <em>
              Email is not of valid format.
            </em>
          </p>
        {/if}
      </div>
      <label for="register__password">Password</label>
      <div class="password-group relative flex items-center gap-2 w-full">
        <input
          class="input"
          id="register__password"
          name="password"
          type={revealPassword ? 'text' : 'password'}
          value={revealPassword ? password : '*'.repeat(password.length)}
          placeholder="Default is 'sveltepost'"
          on:change={onPasswordChange}
          on:copy|preventDefault
        />
        <span on:click={togglePasswordRevelation}>
          <Icon data={revealPassword ? faEye : faEyeSlash} scale={1.5} />
        </span>
      </div>
    </div>

    <p class="text-sm mt-4">* This field is required.</p>

    {#if error}
      <p class="w-full text-red-500 mt-4">
        {error}
      </p>
    {/if}

    <button
      type="submit"
      class="btn:primary mt-8 w-full text-lg font-bold"
      disabled={!isValidEmail || !firstName.length}
    >
      Register
    </button>
  </form>
</section>
