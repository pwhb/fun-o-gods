<script lang="ts">
	export let user: any;
	export let loading = false;
</script>

{#if user.avatar}
	<div class="avatar">
		<div class={`w-24 rounded-full`}>
			<img src={user.avatar} alt={user.username} />
		</div>
	</div>
{:else}
	<div class="avatar placeholder">
		<div class={`bg-info text-neutral-content rounded-full w-24 ${loading ? 'loading' : ''}`}>
			<span class={`text-2xl uppercase`}>{user.username[0]}</span>
		</div>
	</div>
{/if}
