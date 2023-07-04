<script lang="ts">
	import { goto } from '$app/navigation';
	import FormInput from '$lib/components/form/form_input.svelte';
	import FormToggle from '$lib/components/form/form_toggle.svelte';
	import PlaceholderKeys from '$lib/consts/PlaceholderKeys';
	import { toast } from '@zerodevx/svelte-toast';
	import FormNumberInput from '../form/form_number_input.svelte';
	import type { IRoleForm } from '$lib/models/form';
	export let create = false;

	let submitLoading = false;
	export let formData: IRoleForm = {
		name: '',
		level: 1,
		active: false
	};

	let { name, level, active } = formData;

	const formError = {
		name: '',
		level: ''
	};

	async function onSubmit() {
		submitLoading = true;
		try {
			const url = `/api/v1/roles${create ? '' : `/${formData._id}`}`;
			const options = {
				method: create ? 'POST' : 'PATCH',
				body: JSON.stringify({
					name: name,
					level: level,
					active: active
				})
			};
			const res = await fetch(url, options);
			const data = await res.json();
			if (data.success) {
				toast.push(create ? 'Successfully Created!' : 'Successfully Updated!', {
					classes: ['info']
				});
				goto('/admin/roles');
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
			placeholder={PlaceholderKeys.roleName}
			errorMessage={formError.name}
		/>
		<FormNumberInput
			name="level"
			label="Level"
			bind:value={level}
			placeholder="10"
			errorMessage={formError.level}
		/>

		<FormToggle name="active" label="Active" bind:value={active} />

		<div class="h-5" />
		<button class="btn btn-primary btn-md w-full" disabled={submitLoading} type="submit"
			>{create ? 'Create' : 'Save'}</button
		>
	</form>
</div>
