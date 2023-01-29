<script lang="ts">
	import PostComponent from '$components/PostComponent.svelte';
	import { token, user } from '$stores/auth.store';
	import { onMount } from 'svelte';
	import type { Post } from '../types/post.types';
	import fetcher from '../utils/fetcher';

	let posts: Post[] = [];

	onMount(async () => {
		const res = await fetcher($token, `/api/posts`);
		posts = await res.data;
	});
</script>

<div class="flex justify-end mb-4">
	<a href="/create" class="px-3 py-1.5 hover:bg-stone-900 rounded-lg"
		>Add post</a
	>
</div>
<div class="flex flex-col gap-y-8 mt-6">
	{#each posts as post}
		<PostComponent {post} />
	{/each}
</div>
