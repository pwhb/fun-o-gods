<script>
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import Avatar from '../common/avatar.svelte';
	import CardWrapper from '../wrappers/card_wrapper.svelte';
	export let story;

	const { _id, creator, genres, title, description, active, published } = story;
	const { user } = $page.data;
</script>

<CardWrapper>
	<div class="flex flex-row gap-3">
		<a href={`/users/${creator.username}`}>
			<Avatar user={{ username: creator.username, avatar: creator.avatar }} />
		</a>
		<div class="flex flex-col gap-2 flex-1">
			<a class="font-semibold text-sm" href={`/users/${creator.username}`}>@{creator.username}</a>
			<div class="flex flex-row gap-2 flex-wrap">
				{#if published}
					<div class="badge badge-success badge-sm">published</div>
				{:else}
					<div class="badge badge-error badge-sm">unpublished</div>
				{/if}
				{#each genres as { label }}
					<div class="badge badge-neutral badge-sm">{label}</div>
				{/each}
			</div>
		</div>
		<div>
			{#if creator._id === user._id}
				<a class="btn btn-outline btn-xs btn-circle" href={`/edit/story/${_id}`}>
					<Icon icon="material-symbols:edit" width={12} />
				</a>
			{/if}
		</div>
	</div>
	<div class="my-3">
		<p class="font-medium">{title}</p>
	</div>
	<p>{description}</p>
</CardWrapper>
