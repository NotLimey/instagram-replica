<script lang="ts">
	import PostComponent from '$components/PostComponent.svelte';
	import { account, token, user } from '$stores/auth.store';
	import fetcher from '$utils/fetcher';
	import type { Post } from '../../../types/post.types';

	export let data: Post;
	export let message: string = '';

	const comment = async () => {
		if (!data) return;
		await fetcher($token, `/api/posts/comments?postId=${data._id}`, {
			method: 'POST',
			data: { message },
		});
		data.comments.push({ message, uid: $user!.uid, user: $account! });
		message = '';
	};

	token.subscribe(async (t) => {
		if (!t) return;
		const res = await fetcher(t, `/api/posts/like?postId=${data._id}`);
		data.liked = res.data.liked || false;
	});
</script>

<PostComponent post={data} />

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
		<div class="flex gap-x-2">
			<img src={comment.user.photoURL} class="w-12 h-12 rounded-full" alt="" />
			<div>
				<div class="flex gap-x-1.5">
					<p class="text-sm text-stone-100 mb-1">
						<a href="/{comment.user.userName}" class="font-bold mr-2 text-white"
							>@{comment.user.userName}</a
						>
					</p>
				</div>
				<p class="text-stone-300">{comment.message}</p>
			</div>
		</div>
	{/each}
</div>
