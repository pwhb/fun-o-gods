<script lang="ts">
	export let errorMessage = '';
	export let label = '';
	export let value = '';
	export let name = '';
	export let rows = 6;
	export let placeholder = '';
</script>

<div class="form-control w-full">
	<label class="label" for={name}>
		<span class="label-text">{label}</span>
	</label>
	<textarea
		id={name}
		{name}
		{placeholder}
		{rows}
		class={`textarea textarea-bordered ${errorMessage ? 'textarea-error' : ''}`}
		bind:value
	/>
	{#if errorMessage}
		<p class="text-error my-2">{errorMessage}</p>
	{/if}
</div>
