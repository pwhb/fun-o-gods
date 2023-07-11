<script lang="ts">
	import CardWrapper from '$lib/components/wrappers/card_wrapper.svelte';
	import TitleWrapper from '$lib/components/wrappers/title_wrapper.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;

	let showPassword = false;
</script>

<CardWrapper>
	<form method="POST">
		<TitleWrapper>Change Password</TitleWrapper>

		<label class="label" for="password">
			<span class="label-text">Old Password</span>
		</label>
		<input
			type={showPassword ? 'text' : 'password'}
			id="password"
			name="password"
			placeholder=""
			class={`input input-bordered w-full ${form?.invalid?.password ? 'input-error' : ''}`}
		/>
		{#if form?.invalid?.password}
			<p class="text-error my-2">{form.invalid.password}</p>
		{/if}

		<label class="label" for="password">
			<span class="label-text">New Password</span>
		</label>
		<input
			type={showPassword ? 'text' : 'password'}
			id="password"
			name="newPassword"
			placeholder=""
			class={`input input-bordered w-full ${form?.invalid?.newPassword ? 'input-error' : ''}`}
		/>
		{#if form?.invalid?.newPassword}
			<p class="text-error my-2">{form.invalid.newPassword}</p>
		{/if}

		<label class="label" for="password">
			<span class="label-text">Confirm Password</span>
		</label>
		<input
			type={showPassword ? 'text' : 'password'}
			id="password"
			name="confirmPassword"
			placeholder=""
			class={`input input-bordered w-full ${form?.invalid?.confirmPassword ? 'input-error' : ''}`}
		/>
		{#if form?.invalid?.confirmPassword}
			<p class="text-error my-2">{form.invalid.confirmPassword}</p>
		{/if}

		<div class="form-control">
			<label class="cursor-pointer label">
				<span class="label-text">Show Password</span>
				<input type="checkbox" bind:checked={showPassword} class="checkbox checkbox-secondary" />
			</label>
		</div>
		<div class="form-control mt-6">
			<button class="btn btn-accent text-base-100" type="submit">Submit</button>
		</div>
	</form>
</CardWrapper>
