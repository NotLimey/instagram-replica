<script>
	import { auth } from '$lib/firebase';
	import fetcher from '$utils/fetcher';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import toast from 'svelte-french-toast';

	export let userName = '';

	const register = async () => {
		if (!userName) return toast.error('Please enter a username');
		const user = await signInWithPopup(auth, new GoogleAuthProvider());
		const res = await fetcher(null, '/api/user/register', {
			method: 'POST',
			data: {
				displayName: user.user.displayName,
				email: user.user.email,
				photoURL: user.user.photoURL,
				uid: user.user.uid,
				userName: userName,
			},
		});
		if (res.status === 201) return;

		toast.error(`Something went wrong (${res.status}))`);
	};
</script>

<div class="flex gap-y-1 flex-col">
	<h2 class="text-xl mb-2">
		<span class="text-stone-200 text-sm">or, </span> register with google
	</h2>
	<label for="userName">Username</label>
	<input
		type="text"
		id="userName"
		bind:value={userName}
		class="bg-stone-900 px-3 py-1.5"
	/>
	<div class="mt-4">
		<button
			on:click={register}
			class="w-full px-2 py-1.5 border border-stone-900 hover:bg-stone-900"
		>
			Register
		</button>
	</div>
</div>
