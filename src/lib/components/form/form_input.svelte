<script lang="ts">
	export let errorMessage = '';
	export let label = '';
	export let value = '';
	export let name = '';
	export let placeholder = '';
	export let disabled = false;
</script>

<div class="form-control w-full">
	<label class="label" for={name}>
		<span class="label-text">{label}</span>
	</label>
	<input
		type="text"
		id={name}
		{name}
		{placeholder}
		class={`input input-bordered ${errorMessage ? 'input-error' : ''} ${
			disabled ? 'disabled' : ''
		}`}
		bind:value
		{disabled}
	/>
	{#if errorMessage}
		<p class="text-error my-2">{errorMessage}</p>
	{/if}
</div>
