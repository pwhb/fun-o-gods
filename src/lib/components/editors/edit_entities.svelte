<script lang="ts">
	import { goto } from '$app/navigation';
	import FormInput from '$lib/components/form/form_input.svelte';
	import PlaceholderKeys from '$lib/consts/PlaceholderKeys';
	import { toast } from '@zerodevx/svelte-toast';
	import type { IEntityForm } from '$lib/models/form';
	import FormJsonEditor from '../form/form_json_editor.svelte';
	import Icon from '@iconify/svelte';
	export let create = false;

	let submitLoading = false;
	export let formData: IEntityForm = {
		name: '',
		config: {
			operations: {
				create: ['root'],
				read: ['root'],
				update: ['root']
			}
		},
		icon: ''
	};

	let { name, config, icon } = formData;

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
			const url = `/api/v1/entities${create ? '' : `/${formData._id}`}`;
			const options = {
				method: create ? 'POST' : 'PATCH',
				body: JSON.stringify({
					name: name,
					icon: icon,
					config: content.json ? content.json : JSON.parse(content.text as any)
				})
			};
			const res = await fetch(url, options);
			const data = await res.json();
			if (data.success) {
				toast.push(create ? 'Successfully Created!' : 'Successfully Updated!', {
					classes: ['info']
				});
				goto('/admin/entities');
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
			placeholder={PlaceholderKeys.entityName}
			errorMessage={formError.name}
		/>
		{#if icon}
			<div class="my-3">
				<Icon {icon} width={64} class="mx-auto" />
			</div>
		{/if}
		<FormInput
			name="icon"
			label="Icon"
			bind:value={icon}
			placeholder={PlaceholderKeys.entityIcon}
			errorMessage={formError.name}
		/>
		<FormJsonEditor name="data" label={'Config'} bind:content />

		<div class="h-5" />
		<button class="btn btn-primary btn-md w-full" disabled={submitLoading} type="submit"
			>{create ? 'Create' : 'Save'}</button
		>
	</form>
</div>
