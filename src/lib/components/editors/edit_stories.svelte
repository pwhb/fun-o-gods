<script lang="ts">
	import { goto } from '$app/navigation';
	import FormInput from '$lib/components/form/form_input.svelte';
	import FormToggle from '$lib/components/form/form_toggle.svelte';
	import PlaceholderKeys from '$lib/consts/PlaceholderKeys';
	import { toast } from '@zerodevx/svelte-toast';
	import type { IGenreForm, IStoryForm } from '$lib/models/form';
	import FormTextarea from '../form/form_textarea.svelte';
	import MultiSelect from 'svelte-multiselect';
	import { slugify } from '$lib/helpers/format';
	import { page } from '$app/stores';
	import FormMultiselect from '../form/form_multiselect.svelte';
	import Dropzone from '../common/dropzone.svelte';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import FormSelect from '../form/form_select.svelte';

	const { user, scenes } = $page.data;
	const options = $page.data.genres.map((genre: any) => ({
		label: genre.label,
		value: genre.value
	}));

	export let create = false;

	let sceneOptions: any;
	if (!create) {
		sceneOptions = scenes.map((scene: any) => ({ label: scene.title, value: scene._id }));
	}

	let submitLoading = false;
	export let formData: IStoryForm = {
		title: '',
		creator: user,
		editors: [],
		genres: [],
		heroImage: '',
		description: '',
		root: '',
		published: false,
		active: false
	};

	let { title, creator, editors, genres, heroImage, description, root, published, active } =
		formData;

	const formError = {
		title: '',
		value: '',
		description: ''
	};

	async function onSubmit() {
		submitLoading = true;
		try {
			const url = `/api/v1/stories${create ? '' : `/${formData._id}`}`;
			const options = {
				method: create ? 'POST' : 'PATCH',
				body: JSON.stringify({
					title,
					editors,
					genres,
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
				toast.push(create ? 'Successfully Created!' : 'Successfully Updated!', {
					classes: ['info']
				});
				goto('/admin/stories');
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

<div class="md:max-w-2xl mx-auto">
	<form on:submit={onSubmit}>
		<FormInput
			label="Title"
			name="title"
			bind:value={title}
			placeholder={PlaceholderKeys.storyTitle}
			errorMessage={formError.title}
		/>

		<FormMultiselect label="Genres" name="genres" bind:values={genres} {options} />
		<div class="my-5">
			{#if heroImage}
				<div class="m-5">
					<img src={heroImage} alt="hero" class="p-3 shadow-md rounded-md bg-neutral-200" />
				</div>
			{/if}
			<Dropzone
				handleUpdateUrls={(data) => {
					heroImage = `${PUBLIC_BASE_URL}/api/v1/uploads/${data.insertedId}`;
					console.log({ data, heroImage });
				}}
			/>
		</div>
		<FormTextarea
			label="Description"
			name="description"
			bind:value={description}
			placeholder={''}
			errorMessage={formError.description}
		/>
		{#if !create}
			<FormSelect label="Root Scene" name="root" bind:value={root} options={sceneOptions} />
			<FormToggle label="Published" name="published" bind:value={published} />
		{/if}
		<FormToggle label="Active" name="active" bind:value={active} />

		<div class="h-5" />
		<button class="btn btn-primary btn-md w-full" disabled={submitLoading} type="submit"
			>{create ? 'Create' : 'Save'}</button
		>
	</form>
</div>
