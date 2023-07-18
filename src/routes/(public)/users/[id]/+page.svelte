<script lang="ts">
	import { page } from '$app/stores';

	import ProfileAvatar from '$lib/components/common/profile_avatar.svelte';
	import StoryCard from '$lib/components/public/story_card.svelte';
	import PlaceholderKeys from '$lib/consts/PlaceholderKeys';

	const { user } = $page.data;

	let editMode = false;
	let isUploading = false;

	let { username, avatar, bio } = $page.data.userInfo;
	let stories = $page.data.stories;

	$: {
		username = $page.data.userInfo.username;
		avatar = $page.data.userInfo.avatar;
		bio = $page.data.userInfo.bio;
		stories = $page.data.stories;
	}

	console.log(stories);
</script>

<div class="text-center my-2">
	<ProfileAvatar user={{ username, avatar }} loading={isUploading} />

	<div class="my-3">
		<a class="font-semibold text-sm" href={`/users/${username}`}>@{username}</a>
	</div>

	<div class="my-3">
		{#if editMode}
			<textarea
				placeholder={PlaceholderKeys.bio}
				rows="3"
				class="w-64 mx-auto textarea textarea-sm shadow-md text-sm p-3 bg-base-300"
				bind:value={bio}
			/>
		{:else}
			<div class="w-64 mx-auto border-2 shadow-md rounded-xl">
				<p class="text-sm p-5">
					{bio ? bio : '...'}
				</p>
			</div>
		{/if}
	</div>

	<div class="join">
		{#if $page.data.userInfo._id === user._id}
			<a class="btn btn-xs btn-secondary text-base-100 w-24 join-item" href="/create/stories"
				>create</a
			>
		{:else}
			<button class="btn btn-xs btn-success text-base-100 w-24 join-item">follow</button>
		{/if}
		{#if $page.data.userInfo._id === user._id}
			<a class={'btn btn-xs btn-neutral w-24 join-item'} href="/edit/profile">edit</a>
		{:else}
			<button class="btn btn-xs btn-info text-base-100 w-24 join-item">share</button>
		{/if}
	</div>
</div>

<div class="flex flex-col gap-2">
	{#each stories as story}
		<StoryCard {story} />
	{/each}
</div>
