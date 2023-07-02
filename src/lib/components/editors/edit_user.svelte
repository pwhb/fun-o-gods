<script lang="ts">
	import { goto } from '$app/navigation';
	import FormInput from '$lib/components/form/form_input.svelte';
	import FormToggle from '$lib/components/form/form_toggle.svelte';
	import PlaceholderKeys from '$lib/consts/PlaceholderKeys';
	import { toast } from '@zerodevx/svelte-toast';

	import type { IUserForm } from '$lib/models/form';
	import FormSelect from '../form/form_select.svelte';
	export let create = false;

	let submitLoading = false;
	export let formData: IUserForm = {
		username: '',
		role: 'user',
		active: false
	};

	export let roleOptions: any;

	let { username, role, active } = formData;

	const formError = {
		username: '',
		role: ''
	};

	async function onSubmit() {
		submitLoading = true;
		try {
			console.log({ formData, data: 'hello' });
			const url = `/api/v1/users${create ? '' : `/${formData._id}`}`;
			const options = {
				method: create ? 'POST' : 'PATCH',
				body: JSON.stringify({
					username: username,
					role: role,
					active: active
				})
			};
			const res = await fetch(url, options);
			const data = await res.json();
			if (data.success) {
				toast.push(create ? 'Successfully Created!' : 'Successfully Updated!', {
					classes: ['info']
				});
				goto('/admin/users');
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
			name="username"
			label="Username"
			bind:value={username}
			placeholder={PlaceholderKeys.username}
			errorMessage={formError.username}
		/>
		<FormSelect name="role" label="Role" bind:value={role} options={roleOptions} />

		<FormToggle name="active" label="Active" bind:value={active} />

		<div class="h-5" />
		<button class="btn btn-primary btn-md w-full" disabled={submitLoading} type="submit"
			>{create ? 'Create' : 'Save'}</button
		>
	</form>
</div>
