<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Avatar from '$lib/components/common/avatar.svelte';
	import CardWrapper from '$lib/components/wrappers/card_wrapper.svelte';
	import type { IStoryForm } from '$lib/models/form';
	import { toast } from '@zerodevx/svelte-toast';
	import { MultiSelect } from 'svelte-multiselect';

	export let create = false;
	export let story: IStoryForm = {
		title: '',
		heroImage: '',
		description: '',
		published: false,
		root: '',
		genres: []
	};
	const { user } = $page.data;

	const genreOptions = $page.data.genres.map((genre: any) => ({
		label: genre.label,
		value: genre._id
	}));

	const key = (opt: any) => opt.value;

	let submitLoading = false;
	let { title, heroImage, description, published, active, root } = story;
	let genres: any = story.genres
		? story.genres.map((v: any) => ({ label: v.label, value: v._id }))
		: [];
	let editors: any = [];
	async function onSubmit() {
		submitLoading = true;
		try {
			const url = create ? `/api/v1/stories` : `/api/v1/stories/${story._id}`;

			const options = {
				method: create ? 'POST' : 'PATCH',
				body: JSON.stringify({
					title,
					editors,
					genres: genres.map((v: any) => v.value),
					heroImage,
					description,
					root,
					published
				})
			};
			const res = await fetch(url, options);
			const data = await res.json();
			if (data.success) {
				toast.push(create ? 'Successfully Created!' : 'Successfully Updated!', {
					classes: ['info']
				});
				goto(create ? `/stories/${data.data.insertedId}` : `/stories/${story._id}`);
			} else {
				toast.push(data.error && data.error.message ? data.error.message : 'Failed.', {
					classes: ['warn']
				});
			}
		} catch (e) {
			console.error(e);
		} finally {
			submitLoading = false;
		}
	}
</script>

<CardWrapper>
	<form on:submit={onSubmit}>
		<div class="flex flex-row gap-3">
			<a href={`/users/${user.username}`}>
				<Avatar user={{ username: user.username, avatar: user.avatar }} />
			</a>
			<div class="flex flex-col gap-2">
				<a class="font-semibold text-sm" href={`/users/${user.username}`}>@{user.username}</a>
				<div class="flex flex-row gap-2">
					<span class="font-medium">Genres: </span>
					<MultiSelect
						bind:selected={genres}
						inputClass="select select-xs"
						options={genreOptions}
						{key}
					/>
				</div>
			</div>
		</div>
		<div class="my-3">
			<input
				type="text"
				placeholder="Title *"
				class="input input-ghost input-sm w-full"
				bind:value={title}
				required
			/>
		</div>
		<textarea
			class="textarea textarea-ghost textarea-sm w-full"
			placeholder="Description"
			rows="3"
			bind:value={description}
		/>
		<div class="form-control w-full my-3">
			<label class="label cursor-pointer">
				<span class="label-text">Published</span>
				<input
					type="checkbox"
					class="toggle toggle-info"
					id="published"
					name="published"
					bind:checked={published}
				/>
			</label>
		</div>
		<button class="btn btn-success text-base-100 btn-sm w-full" type="submit"
			>{create ? 'create' : 'save'}</button
		>
	</form>
</CardWrapper>
