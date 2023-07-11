<script lang="ts">
	import { MultiSelect } from 'svelte-multiselect';

	export let label = '';
	export let values: any = [];
	export let name = '';
	export let options = [
		{
			label: 'label',
			value: 'value'
		}
	];
	export let key = (opt: any) => opt.value;
</script>

<div class="form-control w-full">
	<label class="label" for={name}>
		<span class="label-text">{label}</span>
	</label>
	<MultiSelect bind:selected={values} inputClass="select select-bordered" {options} {key} />
</div>
