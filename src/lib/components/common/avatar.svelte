<script lang="ts">
	export let user: any;
	export let width = 10;
	export let textSize = 'sm';
	export let loading = false;
	console.log(user);
</script>

{#if user.avatar}
	<div class="avatar">
		<div class={`w-${width} rounded-full`}>
			<img src={user.avatar} alt={user.username} />
		</div>
	</div>
{:else}
	<div class="avatar placeholder">
		<div class={`bg-info text-neutral-content rounded-full w-${width} ${loading ? 'loading' : ''}`}>
			<span class={`text-${textSize} uppercase`}>{user.username[0]}</span>
		</div>
	</div>
{/if}
