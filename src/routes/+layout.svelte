<script>
	import AuthWrapper from '$components/AuthWrapper.svelte';
	import Navbar from '$components/Navbar.svelte';
	import Register from '$components/Register.svelte';
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
	import Login from '../components/Login.svelte';
	import { loading, user } from '../stores/auth.store';
</script>

<Toaster
	toastOptions={{
		className: 'bg-gray-800 text-white',
	}}
/>
<AuthWrapper>
	<slot />
</AuthWrapper>
