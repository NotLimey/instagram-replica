<script>
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onDestroy } from 'svelte';
	import '../app.css';
	import Login from '../components/Login.svelte';
	import { user } from '../stores/auth.store';
	import { Toaster } from 'svelte-french-toast';
	import Navbar from '$components/Navbar.svelte';

	const unsubscribe = onAuthStateChanged(auth, (u) => user.set(u));

	onDestroy(() => {
		unsubscribe();
	});
</script>

<Toaster
	toastOptions={{
		className: 'bg-gray-800 text-white',
	}}
/>
<div>
	{#if $user}
		<Navbar />
		<main class="my-12 mx-auto px-5 max-w-xl"><slot /></main>
	{:else}
		<main class="my-12 mx-auto px-5 max-w-xl">
			<Login />
		</main>
	{/if}
</div>
