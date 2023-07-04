<script>
	import { page } from '$app/stores';
	import EditGenres from '$lib/components/editors/edit_genres.svelte';
</script>

<EditGenres formData={$page.data.doc} />
