<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import { upload } from '$lib/api/common';
	import ProfileAvatar from '$lib/components/common/profile_avatar.svelte';
	import PlaceholderKeys from '$lib/consts/PlaceholderKeys';
	import Icon from '@iconify/svelte';
	import { toast } from '@zerodevx/svelte-toast';

	let isUploading = false;
	let isSaving = false;

	let { username, avatar, bio } = $page.data.userInfo;

	async function onFileChange(event: any) {
		const file = event.target.files[0];
		isUploading = true;
		const res = await upload(file);
		isUploading = false;
		avatar = `${PUBLIC_BASE_URL}/api/v1/uploads/${res.data.insertedId}`;
	}
	async function save() {
		isSaving = true;
		const url = `/api/v1/users/${$page.data.user._id}`;
		const options = {
			method: 'PATCH',
			body: JSON.stringify({
				avatar: avatar,
				bio: bio
			})
		};
		const res = await fetch(url, options);
		const data = await res.json();
		toast.push('Successfully Updated!', {
			classes: ['info']
		});
		goto(`/users/${$page.data.user.username}`);
		isSaving = false;
	}
</script>

<div class="text-center my-2">
	<ProfileAvatar user={{ username, avatar: avatar }} loading={isUploading} />

	<div class={`relative bottom-4 left-8 -mb-6 ${isUploading ? 'hidden' : ''}`}>
		<label for="avatar-upload" class="btn btn-xs btn-circle bg-base-100">
			<Icon icon={'ic:baseline-plus'} />
		</label>
		<input type="file" class="hidden" id="avatar-upload" on:change={onFileChange} />
	</div>

	<div class="my-3">
		<a class="font-semibold text-sm" href={`/users/${username}`}>@{username}</a>
	</div>

	<div class="my-3">
		<textarea
			placeholder={PlaceholderKeys.bio}
			rows="3"
			class="w-64 mx-auto textarea textarea-sm shadow-md text-sm p-3 bg-base-300"
			bind:value={bio}
		/>
	</div>
	<div class="join">
		<button class="btn btn-xs btn-success text-base-100 w-48 join-item" on:click={save}>save</button
		>
	</div>
</div>
