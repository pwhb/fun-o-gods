<script>
	import { page } from '$app/stores';
	import EditRole from '$lib/components/editors/edit_role.svelte';
</script>

<EditRole formData={$page.data.doc} />
