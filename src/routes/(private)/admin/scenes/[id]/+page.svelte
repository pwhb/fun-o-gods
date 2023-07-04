<script>
	import { page } from '$app/stores';
	import EditScenes from '$lib/components/editors/edit_scenes.svelte';
</script>

<EditScenes formData={$page.data.doc} />
