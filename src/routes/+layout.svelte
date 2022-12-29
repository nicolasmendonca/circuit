<script lang="ts">
	import '../app.postcss';
	import type { LayoutData } from './$types';
	import Sidebar from './Sidebar.svelte';

	export let data: LayoutData;
</script>

<div class="relative bg-base-300">
	<div class="fixed w-60 left-2 top-6">
		<Sidebar workspaces={data.workspaces} />
	</div>
	<div class="ml-72 pt-6 min-h-screen w-[calc(100vw-280px)]">
		<slot />
	</div>
</div>
