<script>
	export let value = false;
</script>

{#if value}
	<div class="badge badge-success badge-outline">{value}</div>
{:else}
	<div class="badge badge-error badge-outline">{value}</div>
{/if}
