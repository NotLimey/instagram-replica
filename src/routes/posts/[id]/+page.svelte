<script lang="ts">
	import { token } from '$stores/auth.store';
	import fetcher from '$utils/fetcher';
	import getTimeSincePost from '$utils/getTimeSincePost';
	import { Chat, Heart, Icon } from 'svelte-hero-icons';
	import type { Post } from '../../../types/post.types';

	export let data: Post;

	const like = async () => {
		await fetcher($token, `/api/posts/like?postId=${data._id}`, {
			method: data.liked ? 'DELETE' : 'data',
		});
		data.likes = data.likes + (data.liked ? -1 : 1);
		data.liked = !data.liked;
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
	<Icon
		src={Chat}
		class="w-6 h-6 hover:fill-white/10 cursor-pointer transition-colors"
	/>
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
