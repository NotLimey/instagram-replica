<script lang="ts">
	import { auth } from '$lib/firebase';
	import { account } from '$stores/auth.store';
</script>

<nav class="w-full max-w-5xl py-4 px-5 flex justify-between mx-auto">
	<a href="/"> Limeyfy socials </a>
	<a href="/{$account?.userName}" class="flex items-center gap-x-4">
		<p>Hi, {$account?.displayName}</p>
		<img
			src={$account?.photoURL}
			alt=""
			class="bg-stone-900 w-10 h-10 rounded-full border-none"
		/>
	</a>
</nav>
