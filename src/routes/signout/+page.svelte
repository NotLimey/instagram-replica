<script>
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase';

	onMount(async () => {
		auth.signOut();
		window.location.href = '/';
	});
</script>
