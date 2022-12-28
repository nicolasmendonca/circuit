<script lang="ts">
	import WorkspaceGroup from './WorkspaceGroup.svelte';
	import type { WorkspaceListItem } from '../lib/types';

	export let workspaces: WorkspaceListItem[];
</script>

<nav class="flex flex-col space-y-2">
	{#each workspaces as workspace}
		<WorkspaceGroup {workspace} />
	{/each}
</nav>
