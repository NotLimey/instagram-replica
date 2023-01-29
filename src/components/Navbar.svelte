<script lang="ts">
	import { account } from '$stores/auth.store';
	import { Icon, Search } from 'svelte-hero-icons';
</script>

<nav class="w-full max-w-5xl py-4 px-5 flex justify-between mx-auto">
	<div class="gap-x-12 flex items-center">
		<a href="/" class="hover:underline"> Limeyfy socials </a>
		<a href="/s" class="flex items-center gap-x-2 hover:underline"
			>Search<Icon src={Search} class="h-5 w-5" /></a
		>
	</div>
	<a href="/{$account?.userName}" class="flex items-center gap-x-4">
		<p>Hi, {$account?.displayName}</p>
		<img
			src={$account?.photoURL}
			alt=""
			class="bg-stone-900 w-10 h-10 rounded-full border-none"
		/>
	</a>
</nav>
