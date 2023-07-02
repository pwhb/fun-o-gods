<script>
	import NavProgress from '$lib/components/common/nav_progress.svelte';
	import '../app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	// Optionally set default options here
	const options = { classes: ['log'] };
</script>

<main data-theme="cupcake" class="h-screen bg-base-300">
	<slot />
	<SvelteToast {options} />
	<NavProgress />
</main>

<style>
	:global(.log.info) {
		--toastBackground: #36d399;
	}
	:global(.log.warn) {
		--toastBackground: #f87272;
	}
</style>
