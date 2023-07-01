<script>
	import { page } from '$app/stores';
	import EditConfig from '$lib/components/editors/edit_config.svelte';
</script>

<EditConfig formData={$page.data.doc} />
