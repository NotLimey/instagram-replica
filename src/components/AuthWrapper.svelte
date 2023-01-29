<script lang="ts">
	import { auth } from '$lib/firebase';
	import { account, loading, token, user } from '$stores/auth.store';
	import fetcher from '$utils/fetcher';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onDestroy } from 'svelte';
	import Login from './Login.svelte';
	import Navbar from './Navbar.svelte';
	import Register from './Register.svelte';

	const unsubscribe = onAuthStateChanged(auth, async (u) => {
		user.set(u);
		if (!u) {
			return loading.set(false);
		}
		const t = await u.getIdToken();
		token.set(t);
		const _account = await fetcher(t, '/api/user');

		console.log(_account);

		account.set(_account.data);
		loading.set(false);
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

{#if $loading}
	<div>
		<p>..Loading</p>
	</div>
{:else if $user}
	<Navbar />
	<main class="my-12 mx-auto px-5 max-w-xl"><slot /></main>
{:else}
	<main class="my-12 mx-auto px-5 max-w-xl">
		<Login />
		<Register />
	</main>
{/if}
