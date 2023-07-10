<script lang="ts">
	import { page } from '$app/stores';
	import Avatar from '../common/avatar.svelte';
	import LogoutButton from '../common/logout_button.svelte';
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
					<Avatar {user} />
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box"
				>
					<li>
						<a class="justify-between" href={`/users/${user.username}`}>
							<span class="font-semibold">
								@{user.username}
							</span>
							<span class="badge">{user.role}</span>
						</a>
					</li>
					<li>
						<a href={`/edit/settings`}> Setting </a>
					</li>
					<li><LogoutButton /></li>
				</ul>
			</div>
		{:else}
			<a class="btn btn-primary btn-xs" href="/auth/login">Log in</a>
		{/if}
	</div>
</div>
