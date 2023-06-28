<script>
	import Dropzone from '$lib/components/common/dropzone.svelte';
</script>

<Dropzone
	handleUpdateUrls={(data) => {
		console.log('data', data);
	}}
/>
