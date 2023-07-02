<script lang="ts">
	import { page } from '$app/stores';
	// import Icon from '@iconify/svelte';
	export const getBreadcrumbs = (pathname: string) => {
		const split = pathname.split('/').slice(1);
		const breadcrumbs = split.map((val, idx) => {
			return {
				label: idx === 0 ? 'edit' : val,
				href: '/' + split.slice(0, idx + 1).join('/')
			};
		});
		return breadcrumbs;
	};
</script>

<div class="text-2xl font-medium capitalize breadcrumbs">
	<ul>
		<!-- <button class="mr-6">
			<Icon icon="icon-park-solid:back" />
		</button> -->
		{#each getBreadcrumbs($page.url.pathname) as breadcrumb}
			<li><a href={breadcrumb.href}>{breadcrumb.label}</a></li>
		{/each}
	</ul>
</div>
