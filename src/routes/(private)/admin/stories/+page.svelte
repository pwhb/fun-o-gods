<script lang="ts">
	import { page } from '$app/stores';
	import { formatDate } from '$lib/helpers/format';
	const { stories } = $page.data;
</script>

<div class="overflow-x-auto">
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<th />
				<th>Title</th>
				<th>Creator</th>
				<th>Editors</th>
				<th>Published</th>
				<th>Active</th>
				<th>Created At</th>
				<th>Updated At</th>
				<td><a class="btn btn-xs btn-primary" href="/admin/stories/create">Add</a></td>
			</tr>
		</thead>
		<tbody>
			<!-- row 1 -->
			{#each stories as { _id, title, creator, editors, published, active, createdAt, updatedAt }, idx}
				<tr>
					<th>{idx + 1}</th>
					<td>{title}</td>
					<td><a href={`/users/${creator.username}`}>{creator.username}</a></td>
					<td>{editors}</td>
					<td
						>{#if published}
							<div class="badge badge-success badge-outline">{published}</div>
						{:else}
							<div class="badge badge-error badge-outline">{published}</div>
						{/if}</td
					>
					<td
						>{#if active}
							<div class="badge badge-success badge-outline">{active}</div>
						{:else}
							<div class="badge badge-error badge-outline">{active}</div>
						{/if}</td
					>
					<td>{formatDate(createdAt)}</td>
					<td>{formatDate(updatedAt)}</td>
					<td><a class="btn btn-xs btn-neutral" href={`/admin/stories/${_id}`}>Edit</a></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
