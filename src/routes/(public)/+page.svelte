<script>
	import { page } from '$app/stores';
	import MobileWrapper from '$lib/components/wrappers/mobile_wrapper.svelte';
	const { user } = $page.data;
</script>

<MobileWrapper>
	{#if user}
		<p>Hello, {user.username}</p>
	{/if}
</MobileWrapper>
