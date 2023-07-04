<script lang="ts">
	export let user: any;
</script>

{#if user.avatar}
	<div class="avatar">
		<div class={`w-10 rounded-full`}>
			<img src={user.avatar} alt={user.username} />
		</div>
	</div>
{:else}
	<div class="avatar placeholder">
		<div class={`bg-info text-neutral-content rounded-full w-10`}>
			<span class={`text-sm uppercase`}>{user.username[0]}</span>
		</div>
	</div>
{/if}
