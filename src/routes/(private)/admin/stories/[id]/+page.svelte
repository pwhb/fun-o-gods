<script>
	import { page } from '$app/stores';
	import EditStories from '$lib/components/editors/edit_stories.svelte';
</script>

<EditStories formData={$page.data.doc} />
