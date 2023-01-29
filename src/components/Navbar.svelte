<script lang="ts">
	import { auth } from '$lib/firebase';
	import { user } from '$stores/auth.store';

	const logout = async () => {
		await auth.signOut();
	};
</script>

<nav class="w-full max-w-5xl py-4 px-5 flex justify-between mx-auto">
	<div>
		<button on:click={logout}>Logout</button>
	</div>
	<a href="/" class="flex items-center gap-x-4">
		<p>Hi, {$user?.displayName}</p>
		<img
			src={$user?.photoURL}
			alt=""
			class="bg-stone-900 w-10 h-10 rounded-full border-none"
		/>
	</a>
</nav>
