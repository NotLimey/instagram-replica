<script lang="ts">
	import { user } from '$stores/auth.store';
	import type { Account } from '../../types/auth.types';
	import type { Post } from '../../types/post.types';

	export let data: {
		user: Account;
		posts: Post[];
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
		{#if $user?.uid === data.user.uid}
			<a
				href="/signout"
				class="bg-red-500/20 px-1 py-0.5 rounded-md mt-4 block text-center text-red-500 text-xs"
				>Signout</a
			>
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
