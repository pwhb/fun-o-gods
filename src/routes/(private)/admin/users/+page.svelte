<script lang="ts">
	import { page } from '$app/stores';
	import BooleanBadge from '$lib/components/common/boolean_badge.svelte';
	import { formatDate } from '$lib/helpers/format';
	const { users } = $page.data;
</script>

<div class="overflow-x-auto">
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<th />
				<th>Username</th>
				<th>Role</th>
				<th>Active</th>
				<th>Created At</th>
				<th>Updated At</th>
				<td><a class="btn btn-xs btn-primary" href="/admin/users/create">Add</a></td>
			</tr>
		</thead>
		<tbody>
			<!-- row 1 -->
			{#each users as { _id, username, role, active, createdAt, updatedAt }, idx}
				<tr>
					<th>{idx + 1}</th>
					<td>{username}</td>
					<td>{role}</td>
					<td
						><BooleanBadge value={active} /></td
					>
					<td>{formatDate(createdAt)}</td>
					<td>{formatDate(updatedAt)}</td>
					<td><a class="btn btn-xs btn-neutral" href={`/admin/users/${_id}`}>Edit</a></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
