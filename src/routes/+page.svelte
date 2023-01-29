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

<p>Hi Martin!</p>

<div class="flex flex-col gap-y-4 mt-6">
	{#each posts as post}
		<PostComponent {post} />
	{/each}
</div>
