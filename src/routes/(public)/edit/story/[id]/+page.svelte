<script>
	import { page } from '$app/stores';
	import StoryEditor from '$lib/components/public/story_editor.svelte';
	const { story } = $page.data;
	console.log(story);
</script>

<StoryEditor {story} />
