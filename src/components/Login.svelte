<script lang="ts">
	import axios from 'axios';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { auth } from '../lib/firebase';

	const login = async () => {
		const user = await signInWithPopup(auth, new GoogleAuthProvider());
		await axios('/api/user', {
			method: 'POST',
			data: {
				displayName: user.user.displayName,
				email: user.user.email,
				photoURL: user.user.photoURL,
				uid: user.user.uid,
			},
		});
	};
</script>

<div class="min-h-[300px] flex justify-center items-center">
	<button on:click={login}> Login with google </button>
</div>
