<script lang="ts">
	import { goto } from '$app/navigation';
	import FormInput from '$lib/components/form/form_input.svelte';
	import PlaceholderKeys from '$lib/consts/PlaceholderKeys';
	import { toast } from '@zerodevx/svelte-toast';
	import type { IConfigForm } from '$lib/models/form';
	import FormJsonEditor from '../form/form_json_editor.svelte';
	export let create = false;

	let submitLoading = false;
	export let formData: IConfigForm = {
		name: '',
		config: {}
	};

	let { name, config } = formData;

	let content = {
		text: undefined,
		json: { ...config }
	};

	const formError = {
		name: '',
		level: ''
	};

	async function onSubmit() {
		submitLoading = true;
		try {
			const url = `/api/v1/configs${create ? '' : `/${formData._id}`}`;
			const options = {
				method: create ? 'POST' : 'PATCH',
				body: JSON.stringify({
					name: name,
					config: content.json ? content.json : JSON.parse(content.text as any)
				})
			};
			const res = await fetch(url, options);
			const data = await res.json();
			if (data.success) {
				toast.push(create ? 'Successfully Created!' : 'Successfully Updated!', {
					classes: ['info']
				});
				goto('/admin/configs');
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
			name="name"
			label="Name"
			bind:value={name}
			placeholder={PlaceholderKeys.configName}
			errorMessage={formError.name}
		/>
		<FormJsonEditor name="data" label={'Config'} bind:content />

		<div class="h-5" />
		<button class="btn btn-primary btn-md w-full" disabled={submitLoading} type="submit"
			>{create ? 'Create' : 'Save'}</button
		>
	</form>
</div>
