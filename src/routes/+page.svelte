<script lang="ts">
	import { Icon, Heart, Chat } from 'svelte-hero-icons';
</script>

<p>Hi Martin!</p>

<div class="flex flex-col gap-y-4 mt-6">
	<div>
		<div class="flex items-center gap-x-2 mb-2">
			<p class="text-xl">Martin Myhre</p>
			<span class="w-1 h-1 bg-gray-100 rounded-full" />
			<p class="text-gray-200">2 hours</p>
		</div>
		<img
			src="/alvin-web/IMG_1745.webp"
			alt=""
			class="aspect-square object-cover rounded-md"
		/>
		<div class="py-2 flex items-center gap-x-2">
			<Icon
				src={Chat}
				class="w-6 h-6 hover:fill-white/10 cursor-pointer transition-colors"
			/>
			<Icon
				src={Heart}
				class="w-6 h-6 hover:fill-red-500 hover:stroke-red-500 cursor-pointer transition-colors"
			/>
			<p>0 Likes</p>
		</div>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quod.
			Voluptas distinctio cumque unde officiis ipsum incidunt. In, dignissimos
			veritatis!
		</p>
	</div>
</div>
