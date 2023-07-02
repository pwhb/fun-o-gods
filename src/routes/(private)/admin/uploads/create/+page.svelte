<script>
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import Dropzone from '$lib/components/common/dropzone.svelte';
	import UrlCopyButton from '$lib/components/common/url_copy_button.svelte';
	let id = '';
</script>

{#if id}
	<div class="text-center my-8">
		<img src={`${PUBLIC_BASE_URL}/api/v1/uploads/${id}`} alt="" class="mx-auto max-w-xs mb-5" />
		<a href={`${PUBLIC_BASE_URL}/api/v1/uploads/${id}`} class="text-primary"
			>{`${PUBLIC_BASE_URL}/api/v1/uploads/${id}`}</a
		>
		<br />
		<UrlCopyButton url={`${PUBLIC_BASE_URL}/api/v1/uploads/${id}`} />
	</div>
{/if}
<Dropzone
	handleUpdateUrls={(data) => {
		id = data.insertedId;
	}}
/>
