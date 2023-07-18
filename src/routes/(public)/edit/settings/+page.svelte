<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SaveButton from '$lib/components/common/save_button.svelte';
	import FormInput from '$lib/components/form/form_input.svelte';
	import CardWrapper from '$lib/components/wrappers/card_wrapper.svelte';
	import TitleWrapper from '$lib/components/wrappers/title_wrapper.svelte';
	import PlaceholderKeys from '$lib/consts/PlaceholderKeys';
	import { toast } from '@zerodevx/svelte-toast';

	let { username, avatar, bio, email } = $page.data.userInfo;

	async function save() {
		const url = `/api/v1/users/${$page.data.user._id}`;
		const options = {
			method: 'PATCH',
			body: JSON.stringify({
				email: email
			})
		};
		const res = await fetch(url, options);
		const data = await res.json();
		toast.push('Successfully Updated!', {
			classes: ['info']
		});
		goto(`/users/${$page.data.user.username}`);
	}
</script>

<CardWrapper>
	<TitleWrapper>Edit Setting</TitleWrapper>
	<FormInput name="email" label="Email" bind:value={email} placeholder={PlaceholderKeys.email} />
	<a class="btn btn-sm my-3" href="/auth/change-password">change password</a>
	<div class="text-center mt-5">
		<SaveButton {save} />
	</div>
</CardWrapper>
