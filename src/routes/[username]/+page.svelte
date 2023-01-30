<script lang="ts">
	import { token, user } from '$stores/auth.store';
	import fetcher from '$utils/fetcher';
	import { onMount } from 'svelte';
	import type { DetailedAccount } from '../../types/auth.types';
	import type { Post } from '../../types/post.types';

	export let data: {
		user: DetailedAccount;
		posts: Post[];
	};

	let follows: null | boolean = null;
	let loading = true;

	onMount(async () => {
		const res = await fetcher($token, `/api/users/follow?uid=${data.user.uid}`);
		follows = await res.data.follows;
		loading = false;
	});

	const follow = async () => {
		if (loading) return;
		loading = true;
		const f = follows;
		follows = !follows;
		data.user.followers += follows ? 1 : -1;
		await fetcher($token, `/api/users/follow?uid=${data.user.uid}`, {
			method: f ? 'DELETE' : 'POST',
		});
		loading = false;
	};
</script>

<div class="flex gap-x-6 mb-12">
	<img
		src={data.user.photoURL}
		class="w-28 h-28 object-cover rounded-full"
		alt=""
	/>
	<div>
		<p class="text-lg text-stone-200">@{data.user.userName}</p>
		<p class="text-lg text-stone-100">{data.user.displayName}</p>
		<div class="flex gap-x-4 text-sm mt-2">
			<p class="text-lg text-stone-100">
				<span class="font-medium">{data.user.followers}</span> followers
			</p>
			<p class="text-lg text-stone-100">
				<span class="font-medium">{data.user.following}</span> following
			</p>
		</div>
		{#if $user?.uid === data.user.uid}
			<a
				href="/signout"
				class="bg-red-500/20 px-1 py-0.5 rounded-md mt-4 block text-center text-red-500 text-xs"
				>Signout</a
			>
		{:else if follows !== null}
			<div class="flex justify-start gap-x-3 mt-4">
				<button
					on:click={follow}
					class="bg-stone-900 px-3 py-1 rounded-lg hover:bg-stone-800"
				>
					{follows ? 'Unfollow' : 'Follow'}
				</button>
			</div>
		{/if}
	</div>
</div>

<div class="grid grid-cols-3 gap-4">
	{#each data.posts as post}
		<a
			href="/posts/{post._id}"
			class="w-full aspect-square overflow-hidden rounded-md"
		>
			<img
				class="w-full h-full object-cover hover:scale-105 transition-transform"
				src={post.url}
				alt=""
			/>
		</a>
	{/each}
</div>
