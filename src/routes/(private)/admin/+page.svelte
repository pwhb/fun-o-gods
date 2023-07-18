<script>
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	const { user, menuItems } = $page.data;
</script>

<div class="grid grid-cols-2 gap-4">
	{#each menuItems as { name, access, icon }, idx}
		{#if access.includes(user.role) || access.includes('all')}
			<div class="bg-base-200 rounded-lg shadow-md p-4">
				<a class="font-medium" href={`/admin/${name}`}>
					<div class="flex flex-col items-center gap-2">
						<Icon {icon} width={32} />
						<p class="text-neutral-500 capitalize text-xl">
							{name}
						</p>
						<p class="text-neutral-500 text-xs">
							({access.join(', ')})
						</p>
					</div>
				</a>
			</div>
		{/if}
	{/each}
</div>
