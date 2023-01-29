<script lang="ts">
	import { user } from '$stores/auth.store';
	import { Chat, Icon, Heart } from 'svelte-hero-icons';
	import type { Post } from '../types/post.types';

	export let post: Post;

	const like = async () => {
		await fetch(`/api/posts/like?postId=${post._id}&uid=${$user?.uid}`, {
			method: post.liked ? 'DELETE' : 'POST',
		});
		post.likes = post.likes + (post.liked ? -1 : 1);
		post.liked = !post.liked;
	};

	const getTimeSincePost = () => {
		const seconds = Math.floor(
			(new Date().getTime() - new Date(post.addedAt).getTime()) / 1000
		);

		let interval = Math.floor(seconds / 31536000);

		if (interval > 1) {
			return interval + ' years';
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + ' months';
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + ' days';
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + ' hours';
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + ' minutes';
		}
		return Math.floor(seconds) + ' seconds';
	};
</script>

<div>
	<div class="flex items-center gap-x-2 mb-2">
		<p class="text-xl">Martin Myhre</p>
		<span class="w-1 h-1 bg-gray-100 rounded-full" />
		<p class="text-gray-200">{getTimeSincePost()}</p>
	</div>
	<img
		src={post.url}
		alt=""
		class="aspect-square object-cover rounded-md min-w-full"
	/>
	<div class="py-2 flex items-center gap-x-2">
		<Icon
			src={Chat}
			class="w-6 h-6 hover:fill-white/10 cursor-pointer transition-colors"
		/>
		<button on:click={like}>
			<Icon
				src={Heart}
				class="w-6 h-6 hover:fill-red-500 hover:stroke-red-500 {post.liked
					? 'fill-red-500 stroke-red-500'
					: ''} cursor-pointer transition-colors"
			/>
		</button>
		<p>{post.likes} Likes</p>
	</div>
	<p class="text-stone-300">
		{post.description}
	</p>
</div>
