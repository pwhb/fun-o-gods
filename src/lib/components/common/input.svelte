<script>
	export let label = 'label';
	export let name = 'name';
	export let value = 'value';
	export let placeholder = '';
</script>

<label class="label" for={name}>
	<span class="label-text">{label}</span>
</label>
<input type="text" id={name} {placeholder} bind:value class="input input-bordered" />
