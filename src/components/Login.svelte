<script lang="ts">
	import axios from 'axios';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { auth } from '../lib/firebase';

	const login = async () => {
		const user = await signInWithPopup(auth, new GoogleAuthProvider());
		await axios('/api/user/login', {
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

<div class="flex justify-center items-center flex-col mb-12">
	<h2 class="w-full mb-2 text-xl">Login</h2>
	<button on:click={login} class="border border-stone-900 w-full py-1.5 px-2">
		Login with google
	</button>
</div>
