<script>
	import '../app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	// Optionally set default options here
	const options = {};
</script>

<main data-theme="cupcake" class="h-screen bg-base-300">
	<slot />
	<SvelteToast {options} />
</main>
