<script>
	import { page } from '$app/stores';
	import Avatar from '../common/avatar.svelte';
	import CardWrapper from '../wrappers/card_wrapper.svelte';
	export let story;

	const { creator, genres, title, description } = story;
</script>

<CardWrapper>
	<div class="flex flex-row gap-3">
		<a href={`/users/${creator.username}`}>
			<Avatar user={{ username: creator.username, avatar: creator.avatar }} />
		</a>
		<div class="flex flex-col gap-2">
			<a class="font-semibold text-sm" href={`/users/${creator.username}`}>@{creator.username}</a>
			<div class="flex flex-row gap-2">
				{#each genres as { label }}
					<div class="badge badge-neutral badge-sm">{label}</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="my-3">
		<p class="font-medium">{title}</p>
	</div>
	<p>{description}</p>
</CardWrapper>
