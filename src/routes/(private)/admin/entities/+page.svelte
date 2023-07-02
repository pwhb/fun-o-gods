<script lang="ts">
	import { page } from '$app/stores';
	import { formatDate } from '$lib/helpers/format';
	import Icon from '@iconify/svelte';
	const { entities } = $page.data;
</script>

<div class="overflow-x-auto">
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<th />
				<th>Name</th>
				<th>Icon</th>
				<th>Config</th>
				<th>Created At</th>
				<th>Updated At</th>
				<td><a class="btn btn-xs btn-primary" href="/admin/entities/create">Add</a></td>
			</tr>
		</thead>
		<tbody>
			<!-- row 1 -->
			{#each entities as { _id, name, icon, config, createdAt, updatedAt }, idx}
				<tr>
					<th>{idx + 1}</th>
					<td>
						<a href={`/admin/${name}`}>
							{name}
						</a>
					</td>
					<td><Icon {icon} width={24} /></td>
					<td
						>{#each Object.entries(config.operations) as operation}
							<p>
								<span class="font-semibold">
									{operation[0]}:
								</span>
								<span class="text-primary">
									{operation[1]}
								</span>
							</p>
						{/each}</td
					>
					<td>{formatDate(createdAt)}</td>
					<td>{formatDate(updatedAt)}</td>
					<td><a class="btn btn-xs btn-neutral" href={`/admin/entities/${_id}`}>Edit</a></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
