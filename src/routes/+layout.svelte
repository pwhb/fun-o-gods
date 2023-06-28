<script>
	import '../app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	// Optionally set default options here
	const options = {};
</script>

<slot />
<SvelteToast {options} />
