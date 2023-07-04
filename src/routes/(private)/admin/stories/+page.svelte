<script lang="ts">
	import { page } from '$app/stores';
	import BooleanBadge from '$lib/components/common/boolean_badge.svelte';
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
				<th>Root Scene</th>
				<th>Published</th>
				<th>Active</th>
				<th>Created At</th>
				<th>Updated At</th>
				<td><a class="btn btn-xs btn-primary" href="/admin/stories/create">Add</a></td>
			</tr>
		</thead>
		<tbody>
			<!-- row 1 -->
			{#each stories as { _id, title, creator, editors, root, published, active, createdAt, updatedAt }, idx}
				<tr>
					<th>{idx + 1}</th>
					<td>{title}</td>
					<td><a href={`/users/${creator.username}`}>{creator.username}</a></td>
					<td>{editors}</td>
					<td>{root ? root.title : ''}</td>
					<td><BooleanBadge value={published} /></td>
					<td><BooleanBadge value={active} /></td>
					<td>{formatDate(createdAt)}</td>
					<td>{formatDate(updatedAt)}</td>
					<td><a class="btn btn-xs btn-neutral" href={`/admin/stories/${_id}`}>Edit</a></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
