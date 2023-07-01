<script lang="ts">
	import { page } from '$app/stores';
	import EditUser from '$lib/components/editors/edit_user.svelte';
	const { roles } = $page.data;
	const roleOptions = roles.map((role: { name: any }) => ({
		label: role.name,
		value: role.name
	}));
</script>

<EditUser formData={$page.data.doc} {roleOptions} />
