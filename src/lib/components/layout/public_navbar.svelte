<script lang="ts">
	import { page } from '$app/stores';
	import LogoutButton from '../common/logout_button.svelte';
	import Icon from '@iconify/svelte';
	const { user, publicConfig } = $page.data;
</script>

<div class="navbar bg-base-100 shadow-md rounded-lg">
	<div class="navbar-start">
		<a class="font-medium normal-case text-secondary text-sm md:text-xl px-2" href="/"
			>{publicConfig.config.site_name}</a
		>
	</div>
	<div class="navbar-end">
		{#if user}
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="avatar placeholder">
						<div class="bg-primary text-neutral-content rounded-full w-8">
							<span class="text-sm">K</span>
						</div>
					</div>
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-32"
				>
					<li>
						<a class="justify-between" href="/hello">
							{user.username}
							<span class="badge">{user.role}</span>
						</a>
					</li>
					<li><LogoutButton /></li>
				</ul>
			</div>
		{:else}
			<button class="btn btn-primary btn-xs">Log in</button>
		{/if}
	</div>
</div>
