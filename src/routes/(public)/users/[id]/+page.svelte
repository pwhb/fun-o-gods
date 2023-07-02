<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import { upload } from '$lib/api/common';
	import Avatar from '$lib/components/common/avatar.svelte';
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
		console.log({ data });
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

<div class="bg-base-200 shadow-md m-1 rounded-lg p-3">
	<div class="text-center my-3">
		<!-- <div class="flex flex-col items-center"> -->
		<Avatar user={{ username, avatar }} width={24} textSize={'2xl'} loading={isUploading} />
		{#if editMode}
			<div class={`relative bottom-4 left-8 -mb-6 ${isUploading ? 'hidden' : ''}`}>
				<label for="avatar-upload" class="btn btn-xs btn-circle bg-base-100">
					<Icon icon={'ic:baseline-plus'} />
				</label>
				<input type="file" class="hidden" id="avatar-upload" on:change={onFileChange} />
			</div>
		{/if}
		<div class="my-3">
			{#if editMode}
				<input
					type="text"
					placeholder={PlaceholderKeys.username}
					class="input input-xs text-center text-sm"
					bind:value={username}
				/>
			{:else}
				<p class="font-semibold text-sm">{userInfo.username}</p>
			{/if}
		</div>

		<div class="my-3">
			<div class="w-64 mx-auto border-2 shadow-md rounded-xl p-5">
				{#if editMode}
					<input
						type="text"
						placeholder={PlaceholderKeys.bio}
						class="textarea textarea-xs textarea-ghost text-center text-sm"
						bind:value={bio}
					/>
				{:else}
					<p class="text-sm">
						{bio ? bio : '...'}
					</p>
				{/if}
			</div>
		</div>
		{#if userInfo._id === user._id}
			<button
				class={`btn btn-xs btn-${editMode ? 'primary' : 'neutral'} ${isSaving ? 'loading' : ''}`}
				on:click={toggleEditMode}>{editMode ? 'Save' : 'Edit'}</button
			>
		{/if}
		<!-- </div> -->
	</div>
</div>
