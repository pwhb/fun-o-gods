<script lang="ts">
	export let label = '';
	export let value = false;
	export let name = '';
</script>

<div class="form-control w-full my-3">
	<label class="label cursor-pointer">
		<span class="label-text">{label}</span>
		<input type="checkbox" class="toggle" id={name} {name} bind:checked={value} />
	</label>
</div>
