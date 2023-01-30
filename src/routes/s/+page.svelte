<script lang="ts">
	import { token } from '$stores/auth.store';
	import fetcher from '$utils/fetcher';
	import { onMount } from 'svelte';
	import type { Account } from '../../types/auth.types';

	let users: Account[] = [];
	let query = '';
	let loading = false;

	const fetchUsers = async () => {
		if (!query) return;
		loading = true;
		const res = await fetcher($token, '/api/users?query=' + query, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		users = await res.data;
		loading = false;
	};
</script>

<div class="flex items-end gap-x-4">
	<input
		class="bg-transparent w-full py-1.5 px-3 border-b border-b-stone-600 focus:border-blue-500 transition-colors focus:outline-none"
		placeholder="username, name, email etc.."
		bind:value={query}
	/>
	<button on:click={() => fetchUsers()}>Search</button>
</div>

<div class="flex flex-col gap-y-3 mt-8">
	{#if loading}
		<p>Loading...</p>
	{/if}
	{#each users as user}
		<a
			href="/{user.userName}"
			class="flex gap-x-3 items-center bg-stone-900 w-full px-5 py-1.5 rounded-lg hover:bg-stone-800"
		>
			<img src={user.photoURL} class="w-8 h-8 rounded-full" alt="" />
			<div class="flex flex-col">
				<a href="/{user.userName}">@{user.userName}</a>
				<p class="text-stone-200">{user.displayName}</p>
			</div>
		</a>
	{/each}
</div>
