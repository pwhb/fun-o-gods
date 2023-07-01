<script lang="ts">
	import { page } from '$app/stores';
	import LogoutButton from '../common/logout_button.svelte';
	import Icon from '@iconify/svelte';
	const { user, publicConfig, accessConfig } = $page.data;
	const menuItems = accessConfig.config.menuItems;
</script>

<div class="navbar bg-base-100 shadow-md">
	<div class="navbar-start">
		<div class="dropdown">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-ghost btn-circle">
				<Icon icon="lucide:menu" width={28} />
			</label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box gap-2"
			>
				{#each menuItems as { name, access, icon }, idx}
					{#if access.includes(user.role) || access.includes('all')}
						<li>
							<a href={`/admin/${name}`}>
								<Icon {icon} width={24} />
								<span class="capitalize text-lg">
									{name}
								</span>
							</a>
						</li>
					{/if}{/each}
			</ul>
		</div>
	</div>
	<div class="navbar-center">
		<a class="btn btn-ghost normal-case text-sm md:text-xl" href="/"
			>{publicConfig.config.site_name}</a
		>
	</div>
	<div class="navbar-end">
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
	</div>
</div>
