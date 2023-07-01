<script>
	import { JSONEditor } from 'svelte-jsoneditor';

	export let name = '';
	export let label = '';
	export let content = {
		text: null,
		json: {}
	};
</script>

<div class="form-control">
	<label class="label" for={name}>
		<span class="label-text">{label}</span>
	</label>
	<JSONEditor bind:content />
</div>
