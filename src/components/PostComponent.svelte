<script lang="ts">
	import { token, user } from '$stores/auth.store';
	import fetcher from '$utils/fetcher';
	import getTimeSincePost from '$utils/getTimeSincePost';
	import { Chat, Icon, Heart } from 'svelte-hero-icons';
	import type { Post } from '../types/post.types';

	export let post: Post;

	const like = async () => {
		await fetcher(
			$token,
			`/api/posts/like?postId=${post._id}&uid=${$user?.uid}`,
			{
				method: post.liked ? 'DELETE' : 'POST',
			}
		);
		post.likes = post.likes + (post.liked ? -1 : 1);
		post.liked = !post.liked;
	};
</script>

<div>
	<div class="flex items-center gap-x-2 mb-2">
		<p class="text-xl">{post.user.displayName}</p>
		<span class="w-1 h-1 bg-gray-100 rounded-full" />
		<p class="text-gray-200">{getTimeSincePost(post)}</p>
	</div>
	<a href="/post/{post._id}">
		<img
			src={post.url}
			alt=""
			class="aspect-square object-cover rounded-md min-w-full"
		/>
	</a>
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
		<a href="/{post.user.userName}" class="font-bold mr-2 text-white"
			>@{post.user.userName}
		</a>{post.description}
	</p>
</div>
