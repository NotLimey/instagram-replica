<script lang="ts">
	import PostComponent from '$components/PostComponent.svelte';
	import { Icon, Heart, Chat } from 'svelte-hero-icons';
	import type { Post } from '../types/post.types';

	export let data: {
		posts: Post[];
	};
</script>

<p>Hi Martin!</p>

<div class="flex flex-col gap-y-4 mt-6">
	{#each data.posts as post}
		<PostComponent {post} />
	{/each}
</div>
