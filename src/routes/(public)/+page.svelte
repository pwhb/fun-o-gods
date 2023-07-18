<script>
	import { page } from '$app/stores';
	import Hero from '$lib/components/layout/hero.svelte';
	import MobileWrapper from '$lib/components/wrappers/mobile_wrapper.svelte';
	const { user } = $page.data;
</script>

<MobileWrapper>
	<Hero />
</MobileWrapper>
