<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import UrlCopyButton from '$lib/components/common/url_copy_button.svelte';
	import { formatDate } from '$lib/helpers/format';
	const { uploads } = $page.data;
</script>

<div class="overflow-x-auto">
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<th />
				<th>Key</th>
				<th>Preview</th>
				<th>Content Type</th>
				<th>Active</th>
				<th>Created At</th>
				<th>Updated At</th>
				<td><a class="btn btn-xs btn-primary" href="/admin/uploads/create">Add</a></td>
			</tr>
		</thead>
		<tbody>
			<!-- row 1 -->
			{#each uploads as { _id, Key, ContentType, active, createdAt, updatedAt }, idx}
				<tr>
					<th>{idx + 1}</th>
					<td>
						<a href={`${PUBLIC_BASE_URL}/api/v1/uploads/${_id}`}>
							{Key.slice(0, 8)}...
						</a>
					</td>
					<td>
						{#if ContentType.includes('image')}
							<img src={`${PUBLIC_BASE_URL}/api/v1/uploads/${_id}`} alt={Key} />
						{:else}
							<p class="text-center">Not Image</p>
						{/if}
					</td>
					<td>
						{ContentType}
					</td>
					<td
						>{#if active}
							<div class="badge badge-success badge-outline">{active}</div>
						{:else}
							<div class="badge badge-error badge-outline">{active}</div>
						{/if}</td
					>
					<td>{formatDate(createdAt)}</td>
					<td>{formatDate(updatedAt)}</td>
					<td>
						<UrlCopyButton url={`${PUBLIC_BASE_URL}/api/v1/uploads/${_id}`} />
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
