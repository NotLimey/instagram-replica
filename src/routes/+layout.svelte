<script>
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onDestroy } from 'svelte';
	import '../app.css';
	import Login from '../components/Login.svelte';
	import { user } from '../stores/auth.store';

	const unsubscribe = onAuthStateChanged(auth, (u) => user.set(u));

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="my-12 mx-auto px-5 max-w-xl">
	{#if $user}
		<slot />
	{:else}
		<Login />
	{/if}
</div>
