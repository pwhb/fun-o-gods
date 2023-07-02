<script>
	import { toast } from '@zerodevx/svelte-toast';
	export let url = '';
</script>

<button
	class="btn btn-xs btn-secondary"
	on:click={() => {
		navigator.clipboard.writeText(url);
		toast.push('Copied to the clipboard!', {
			classes: ['info']
		});
	}}
>
	Copy
</button>
