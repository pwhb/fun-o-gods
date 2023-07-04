<script lang="ts">
	import { goto } from '$app/navigation';
	import FormInput from '$lib/components/form/form_input.svelte';
	import FormToggle from '$lib/components/form/form_toggle.svelte';
	import PlaceholderKeys from '$lib/consts/PlaceholderKeys';
	import { toast } from '@zerodevx/svelte-toast';
	import type { IGenreForm, ISceneForm } from '$lib/models/form';
	import FormTextarea from '../form/form_textarea.svelte';
	import { slugify } from '$lib/helpers/format';
	import { page } from '$app/stores';
	import Dropzone from '../common/dropzone.svelte';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import FormSelect from '../form/form_select.svelte';
	export let create = false;
	const { user, stories } = $page.data;

	const storyOptions = stories.map((story: any) => ({ label: story.title, value: story._id }));
	let submitLoading = false;
	export let formData: ISceneForm = {
		title: '',
		story: undefined,
		creator: user,
		editors: [],
		heroImage: '',
		body: '',
		endpoints: [],
		published: false,
		active: false
	};

	let { title, story, creator, editors, heroImage, body, endpoints, published, active } = formData;

	const formError = {
		title: '',
		body: ''
	};

	async function onSubmit() {
		submitLoading = true;
		try {
			const url = `/api/v1/scenes${create ? '' : `/${formData._id}`}`;
			const options = {
				method: create ? 'POST' : 'PATCH',
				body: JSON.stringify({
					title: title, // done
					story: story,
					editors: editors,
					heroImage: heroImage, // done
					body: body, // done
					endpoints: endpoints,
					published: published, // done
					active: active // done
				})
			};
			const res = await fetch(url, options);
			const data = await res.json();
			if (data.success) {
				toast.push(create ? 'Successfully Created!' : 'Successfully Updated!', {
					classes: ['info']
				});
				goto('/admin/scenes');
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
		<FormSelect label="Story" name="story" bind:value={story} options={storyOptions} />
		<FormInput
			label="Title"
			name="title"
			bind:value={title}
			placeholder={PlaceholderKeys.sceneTitle}
		/>
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
			label="Body"
			name="body"
			rows={12}
			bind:value={body}
			placeholder={PlaceholderKeys.sceneBody}
		/>

		<FormToggle label="Published" name="published" bind:value={published} />
		<FormToggle label="Active" name="active" bind:value={active} />

		<div class="h-5" />
		<button class="btn btn-primary btn-md w-full" disabled={submitLoading} type="submit"
			>{create ? 'Create' : 'Save'}</button
		>
	</form>
</div>
