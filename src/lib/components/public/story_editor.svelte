<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Avatar from '$lib/components/common/avatar.svelte';
	import CardWrapper from '$lib/components/wrappers/card_wrapper.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { MultiSelect } from 'svelte-multiselect';

	// export let create = false;
	const { user } = $page.data;

	const genreOptions = $page.data.genres.map((genre: any) => ({
		label: genre.label,
		value: genre._id
	}));

	const key = (opt: any) => opt.value;

	let submitLoading = false;
	let genres: any = [];
	let title = '';
	let editors: any = [];
	let heroImage = '';
	let description = '';
	let root = '';
	let published = false;
	let active = false;

	async function onSubmit() {
		submitLoading = true;
		try {
			const url = `/api/v1/stories`;

			const options = {
				method: 'POST',
				body: JSON.stringify({
					title,
					editors,
					genres: genres.map((v: any) => v.value),
					heroImage,
					description,
					root,
					published,
					active
				})
			};
			const res = await fetch(url, options);
			const data = await res.json();
			if (data.success) {
				toast.push('Successfully Created!', {
					classes: ['info']
				});
				goto(`/stories/${data.data.insertedId}`);
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
				<span class="label-text">Active</span>
				<input
					type="checkbox"
					class="toggle toggle-info"
					id="active"
					name="active"
					bind:checked={active}
				/>
			</label>
		</div>
		<button class="btn btn-success text-base-100 btn-sm w-full" type="submit">Create</button>
	</form>
</CardWrapper>
