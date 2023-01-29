<script lang="ts">
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { auth } from '../lib/firebase';

	const login = async () => {
		await signInWithPopup(auth, new GoogleAuthProvider());
	};
</script>

<div class="min-h-[300px] flex justify-center items-center">
	<button on:click={login}> Login with google </button>
</div>
