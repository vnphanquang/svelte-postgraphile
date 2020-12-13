<script context="module">
	export const preload = () => {};
</script>

<script>
	import { stores } from "@sapper/app";
  import Navbar from "@components/Navbar";

	// You may not want to use `segment`, but it is passed for the time being and will
	// create a warning if not expected: https://github.com/sveltejs/sapper-template/issues/210
	// https://github.com/sveltejs/sapper/issues/824
	export let segment: string = "";
	// Silence unused export property warning
  if (segment) {};
  
	const { page } = stores();
</script>

<svelte:head>
	<title>
    {$page.path} | Title Here
	</title>
</svelte:head>

<Navbar />

<div id="sapper-content" class="flex-1 flex flex-col mt-16">
  <slot />
</div>
