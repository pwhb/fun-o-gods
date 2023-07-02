<script>
	import { page } from '$app/stores';
	const { publicConfig, user } = $page.data;
	const { config } = publicConfig;
</script>

<div class="hero min-h-[80vh]" style={`background-image: url(${config.home_page.hero_img});`}>
	<div class="hero-overlay bg-opacity-60" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md">
			<h1 class="mb-5 text-5xl font-bold">
				Hello {#if user}
					<span>{user.username}</span>
				{/if}
			</h1>
			<p class="mb-5">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
			<button class="btn btn-primary">Get Started</button>
		</div>
	</div>
</div>
