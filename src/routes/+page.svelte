<script lang="ts">
	import PostComponent from '$components/PostComponent.svelte';
	import { user } from '$stores/auth.store';
	import { onMount } from 'svelte';
	import type { Post } from '../types/post.types';

	let posts: Post[] = [];

	onMount(async () => {
		const res = await fetch(`/api/posts?uid=${$user?.uid}`);
		posts = await res.json();
	});
</script>

<div class="flex justify-end mb-4">
	<a href="/create" class="px-3 py-1.5 hover:bg-stone-900 rounded-lg"
		>Add post</a
	>
</div>
<div class="flex flex-col gap-y-4 mt-6">
	{#each posts as post}
		<PostComponent {post} />
	{/each}
</div>
