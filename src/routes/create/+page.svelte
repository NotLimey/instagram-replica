<script lang="ts">
	import { storage } from '$lib/firebase';
	import { generateId } from '$lib/id/generateId';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import toast from 'svelte-french-toast';

	let file: File | null = null;
	let description: string = '';

	const onSubmit = async () => {
		if (!file) return toast.error('Please add an image');
		const storageRef = ref(storage, `images/${generateId()}_${file?.name}`);
		const uploadRef = await uploadBytes(storageRef, file as Blob);
		const url = await getDownloadURL(uploadRef.ref);

		const data = {
			description,
			url,
		};
	};
</script>

<h2 class="text-xl mb-8">Create new post</h2>

<div>
	<form on:submit|preventDefault={onSubmit} class="flex flex-col gap-y-6">
		{#if file}
			<div class="w-40">
				<!-- if file then show image -->
				<img
					src={file ? URL.createObjectURL(file) : ''}
					alt=""
					class="aspect-square object-cover rounded-md"
				/>
			</div>
		{/if}
		<input
			type="file"
			on:change={(e) => (file = e.currentTarget.files?.[0] || null)}
			accept="image/*"
		/>
		<div class="flex flex-col">
			<label for="content">Content</label>
			<textarea
				id="content"
				class="bg-transparent border border-gray-300 rounded-sm py-2 px-3 mt-1"
				rows="5"
				placeholder="Write something..."
				bind:value={description}
			/>
		</div>
		<div class="flex justify-end">
			<button
				type="submit"
				class="bg-blue-500 px-8 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
				>Submit</button
			>
		</div>
	</form>
</div>
