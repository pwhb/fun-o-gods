<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import { upload } from '$lib/api/common';
	import ProfileAvatar from '$lib/components/common/profile_avatar.svelte';
	import PlaceholderKeys from '$lib/consts/PlaceholderKeys';
	import Icon from '@iconify/svelte';
	const { userInfo, user } = $page.data;
	let editMode = false;
	let isUploading = false;
	let isSaving = false;

	let { username, avatar, bio } = userInfo;

	async function onFileChange(event: any) {
		const file = event.target.files[0];
		isUploading = true;
		const data = await upload(file);
		isUploading = false;
		avatar = `${PUBLIC_BASE_URL}/api/v1/uploads/${data.data.insertedId}`;
	}

	async function toggleEditMode() {
		if (editMode) {
			isSaving = true;
			const url = `/api/v1/users/${user._id}`;
			const options = {
				method: 'PATCH',
				body: JSON.stringify({
					username: username,
					avatar: avatar,
					bio: bio
				})
			};
			const res = await fetch(url, options);
			const data = await res.json();
			isSaving = false;
		}
		editMode = !editMode;
	}
</script>

<!-- <div class="bg-base-200 shadow-md m-1 rounded-lg p-3"> -->
<div class="text-center my-2">
	<!-- <div class="flex flex-col items-center"> -->
	<ProfileAvatar user={{ username, avatar }} loading={isUploading} />
	{#if editMode}
		<div class={`relative bottom-4 left-8 -mb-6 ${isUploading ? 'hidden' : ''}`}>
			<label for="avatar-upload" class="btn btn-xs btn-circle bg-base-100">
				<Icon icon={'ic:baseline-plus'} />
			</label>
			<input type="file" class="hidden" id="avatar-upload" on:change={onFileChange} />
		</div>
	{/if}
	<div class="my-3">
		<!-- {#if editMode}
			<input
				type="text"
				placeholder={PlaceholderKeys.username}
				class="input input-xs input-bordered text-center text-sm bg-base-300"
				bind:value={username}
			/>
		{:else} -->
		<a class="font-semibold text-sm" href={`/users/${userInfo.username}`}>@{userInfo.username}</a>
		<!-- {/if} -->
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
		{#if userInfo._id === user._id}
			<button class="btn btn-xs btn-secondary text-base-100 w-24 join-item">create</button>
		{:else}
			<button class="btn btn-xs btn-success text-base-100 w-24 join-item">follow</button>
		{/if}
		{#if userInfo._id === user._id}
			<button
				class={`btn btn-xs ${editMode ? 'btn-primary' : 'btn-neutral'} ${
					isSaving ? 'loading' : ''
				} w-24 join-item`}
				on:click={toggleEditMode}>{editMode ? 'save' : 'edit'}</button
			>
		{:else}
			<button class="btn btn-xs btn-info text-base-100 w-24 join-item">share</button>
		{/if}
	</div>
	<!-- </div> -->
</div>
<!-- </div> -->
