<script>
	import { page } from '$app/stores';
	import EditEntities from '$lib/components/editors/edit_entities.svelte';
</script>

<EditEntities formData={$page.data.doc} />
