<script lang="ts">
	export let label = '';
	export let value = '';
	export let name = '';
	export let options = [
		{
			label: 'label',
			value: 'value'
		}
	];
</script>

<div class="form-control w-full">
	<label class="label" for={name}>
		<span class="label-text">{label}</span>
	</label>
	<select class="select select-bordered" bind:value>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</div>
