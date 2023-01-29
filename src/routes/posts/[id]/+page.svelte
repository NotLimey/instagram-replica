<script lang="ts">
	import { token, user } from '$stores/auth.store';
	import fetcher from '$utils/fetcher';
	import getTimeSincePost from '$utils/getTimeSincePost';
	import { Chat, Heart, Icon } from 'svelte-hero-icons';
	import type { Post } from '../../../types/post.types';

	export let data: Post;
	export let message: string = '';

	const like = async () => {
		await fetcher($token, `/api/posts/like?postId=${data._id}`, {
			method: data.liked ? 'DELETE' : 'data',
		});
		data.likes = data.likes + (data.liked ? -1 : 1);
		data.liked = !data.liked;
	};

	const comment = async () => {
		await fetcher($token, `/api/posts/comments?postId=${data._id}`, {
			method: 'POST',
			data: { message },
		});
		data.comments.push({ message, uid: $user!.uid });
		message = '';
	};
</script>

<div class="flex items-center gap-x-2 mb-2">
	<p class="text-xl">Martin Myhre</p>
	<span class="w-1 h-1 bg-gray-100 rounded-full" />
	<p class="text-gray-200">{getTimeSincePost(data)}</p>
</div>
<img
	src={data.url}
	alt=""
	class="aspect-square object-cover rounded-md min-w-full"
/>
<div class="py-2 flex items-center gap-x-2">
	<button on:click={like}>
		<Icon
			src={Heart}
			class="w-6 h-6 hover:fill-red-500 hover:stroke-red-500 {data.liked
				? 'fill-red-500 stroke-red-500'
				: ''} cursor-pointer transition-colors"
		/>
	</button>
	<p>{data.likes} Likes</p>
</div>
<p class="text-stone-300">
	{data.description}
</p>

<div class="mt-4">
	<textarea
		bind:value={message}
		class="w-full bg-transparent px-3 py-2 border-b focus:outline-none"
		placeholder="Write a comment..."
		rows="3"
	/>
	<div class="flex justify-end mt-2">
		<button
			on:click={comment}
			class="bg-blue-500 px-3 py-1.5 rounded-md text-sm hover:bg-blue-400 transition-colors"
			>Comment</button
		>
	</div>
</div>

<div class="flex flex-col gap-y-2 mt-6">
	<h2 class="mb-2">Comments</h2>
	{#each data.comments as comment}
		<div>
			<p class="text-xs text-stone-300 mb-1">{comment.uid}</p>
			<p>{comment.message}</p>
		</div>
	{/each}
</div>
