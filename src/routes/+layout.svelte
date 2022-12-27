<script>
	import '../app.postcss';
	import Sidebar from './Sidebar.svelte';
</script>

<div class="relative bg-gray-100">
	<div class="fixed w-60 left-2 top-6">
		<Sidebar />
	</div>
	<div class="ml-64 pt-6 min-h-screen w-[calc(100vw-280px)]">
		<slot />
	</div>
</div>
