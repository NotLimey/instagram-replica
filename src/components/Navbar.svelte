<script lang="ts">
	import { user } from '$stores/auth.store';
</script>

<nav class="w-full max-w-5xl py-4 px-5 flex justify-end mx-auto">
	<div class="flex items-center gap-x-4">
		<p>Hi, {$user?.displayName}</p>
		<img
			src={$user?.photoURL}
			alt=""
			class="bg-stone-900 w-10 h-10 rounded-full border-none"
		/>
	</div>
</nav>
