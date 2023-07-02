<script lang="ts">
	import { goto } from '$app/navigation';
	import FormInput from '$lib/components/form/form_input.svelte';
	import FormToggle from '$lib/components/form/form_toggle.svelte';
	import PlaceholderKeys from '$lib/consts/PlaceholderKeys';
	import { toast } from '@zerodevx/svelte-toast';
	import type { IGenresForm } from '$lib/models/form';
	import FormTextarea from '../form/form_textarea.svelte';
	import { slugify } from '$lib/helpers/format';
	export let create = false;

	let submitLoading = false;
	export let formData: IGenresForm = {
		label: '',
		value: '',
		description: '',
		active: false
	};

	let { label, value, description, active } = formData;

	$: {
		label = label.toLowerCase();
		value = slugify(label);
	}

	const formError = {
		label: '',
		value: '',
		description: ''
	};

	async function onSubmit() {
		submitLoading = true;
		try {
			console.log({ formData, data: 'hello' });
			const url = `/api/v1/genres${create ? '' : `/${formData._id}`}`;
			const options = {
				method: create ? 'POST' : 'PUT',
				body: JSON.stringify({
					label: label,
					value: value,
					description: description,
					active: active
				})
			};
			const res = await fetch(url, options);
			const data = await res.json();
			if (data.success) {
				toast.push(create ? 'Successfully Created!' : 'Successfully Updated!', {
					classes: ['info']
				});
				goto('/admin/genres');
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

<div class="md:mx-40">
	<form on:submit={onSubmit}>
		<FormInput
			label="label"
			name="label"
			bind:value={label}
			placeholder={PlaceholderKeys.genres}
			errorMessage={formError.label}
		/>
		<FormInput
			label="value"
			name="value"
			bind:value
			placeholder={PlaceholderKeys.genres}
			errorMessage={formError.value}
		/>
		<FormTextarea
			label="description"
			name="description"
			bind:value={description}
			placeholder={PlaceholderKeys.genresDescription}
			errorMessage={formError.description}
		/>

		<FormToggle label="active" name="Active" bind:value={active} />

		<div class="h-5" />
		<button class="btn btn-primary btn-md w-full" disabled={submitLoading} type="submit"
			>{create ? 'Create' : 'Save'}</button
		>
	</form>
</div>
