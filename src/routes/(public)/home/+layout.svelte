<script>
	import { page } from '$app/stores';
	import LogoutButton from '$lib/components/common/logout_button.svelte';
	import MobileWrapper from '$lib/components/wrappers/mobile_wrapper.svelte';
</script>

<MobileWrapper>
	{#if $page.data.user}
		<LogoutButton />
	{/if}
	<slot />
</MobileWrapper>
