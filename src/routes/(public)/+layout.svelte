<script>
	import { page } from '$app/stores';
	import LogoutButton from '$lib/components/common/logout_button.svelte';
	import PublicNavbar from '$lib/components/layout/public_navbar.svelte';
	import MobileWrapper from '$lib/components/wrappers/mobile_wrapper.svelte';
</script>

<MobileWrapper>
	<PublicNavbar />
	<slot />
</MobileWrapper>
