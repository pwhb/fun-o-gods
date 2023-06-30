<script lang="ts">
	import AuthWrapper from '$lib/components/wrappers/auth_wrapper.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;

	let showPassword = false;
</script>

<AuthWrapper>
	<form method="POST">
		<p class="text-center my-3 font-semibold text-primary text-2xl">Log in</p>
		<label class="label" for="username">
			<span class="label-text">Username</span>
		</label>
		<input
			type="text"
			id="username"
			name="username"
			placeholder="anakin"
			class={`input input-bordered ${form?.invalid?.username ? 'input-error' : ''}`}
			value={form?.previous?.username || ''}
		/>
		{#if form?.invalid?.username}
			<p class="text-error my-2">{form.invalid.username}</p>
		{/if}

		<label class="label" for="password">
			<span class="label-text">Password</span>
		</label>
		<input
			type={showPassword ? 'text' : 'password'}
			id="password"
			name="password"
			placeholder=""
			class={`input input-bordered ${form?.invalid?.password ? 'input-error' : ''}`}
		/>
		{#if form?.invalid?.password}
			<p class="text-error my-2">{form.invalid.password}</p>
		{/if}

		<div class="form-control">
			<label class="cursor-pointer label">
				<span class="label-text">Show Password</span>
				<input type="checkbox" bind:checked={showPassword} class="checkbox checkbox-secondary" />
			</label>
		</div>
		<div class="card-body p-0 items-center text-center my-4">
			<a href="/auth/register" id="login-link" class="label-text-alt link link-hover"
				>Don't have an account? Create one!</a
			>
		</div>
		<div class="form-control mt-6">
			<button class="btn btn-primary" type="submit">Login</button>
		</div>
	</form>
</AuthWrapper>
