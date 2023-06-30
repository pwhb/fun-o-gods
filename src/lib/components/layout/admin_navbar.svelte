<script lang="ts">
	import { page } from '$app/stores';

	const { user } = $page.data;
</script>

<p>logged in as {user.username}</p>
