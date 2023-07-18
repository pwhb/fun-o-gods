<script>
	import { page } from '$app/stores';
	import StoryCard from '$lib/components/public/story_card.svelte';
	const { story } = $page.data;
</script>

<StoryCard {story} />
