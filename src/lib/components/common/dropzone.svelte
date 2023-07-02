<script lang="ts">
	import FileDrop from 'filedrop-svelte';
	import type { Files } from 'filedrop-svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { upload } from '$lib/api/common';
	let files: Files;
	export let label = 'Upload files';
	export let loading = false;

	export let handleUpdateUrls = (urls: any) => {};

	let urls: any = [];
	const handleUpload = async (file: any) => {
		loading = true;
		const data = await upload(file);
		loading = false;
		return data;
	};

	const handleDrop = async (e: any) => {
		files = e.detail.files;
		const file = files.accepted[0];
		if (file) {
			const { success, data } = await handleUpload(file);
			if (success) {
				toast.push('Successfully Uploaded!', {
					classes: ['success']
				});
				handleUpdateUrls(data);
			}
		}
	};
</script>

<div class="max-w-xs mx-auto">
	{#if loading}
		<p>Loading...</p>
	{:else}
		<FileDrop on:filedrop={handleDrop}>
			<div class="p-5 border-2 border-dashed border-primary shadow-md rounded-xl bg-base-500">
				<div class="flex flex-col items-center gap-5">
					<img src="https://www.svgrepo.com/show/449957/upload.svg" class="w-10" alt="" />
					<span class="font-light text-gray-400">{label}</span>
				</div>
			</div>
		</FileDrop>
	{/if}
</div>
