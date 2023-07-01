<script lang="ts">
	import { page } from '$app/stores';
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
						>{#if active}
							<div class="badge badge-success badge-outline">{active}</div>
						{:else}
							<div class="badge badge-error badge-outline">{active}</div>
						{/if}</td
					>
					<td>{formatDate(createdAt)}</td>
					<td>{formatDate(updatedAt)}</td>
					<td><a class="btn btn-xs btn-neutral" href={`/admin/users/${_id}`}>Edit</a></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
