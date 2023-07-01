<script lang="ts">
	import { page } from '$app/stores';
	import AdminNavbar from '$lib/components/layout/admin_navbar.svelte';
	import Breadcrumbs from '$lib/components/layout/breadcrumbs.svelte';
</script>

<AdminNavbar />
<div class="bg-base-100 md:mx-2 my-4 rounded-lg shadow-md">
	<div class="p-4 md:p-10">
		<Breadcrumbs />
		<slot />
	</div>
</div>
