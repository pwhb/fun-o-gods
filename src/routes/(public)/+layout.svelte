<script>
	import PublicNavbar from '$lib/components/layout/public_navbar.svelte';
	import MobileWrapper from '$lib/components/wrappers/mobile_wrapper.svelte';
</script>

<MobileWrapper>
	<PublicNavbar />
	<slot />

</MobileWrapper>
