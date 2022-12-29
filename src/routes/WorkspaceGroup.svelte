<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { WorkspaceListItem } from '$lib/types';

	export let workspace: WorkspaceListItem;

	let isExpanded = true;
</script>

<section class="bg-primary-300 rounded-xl py-4">
	<button
		class="px-4 font-bold flex justify-between items-center w-full"
		on:click={() => {
			isExpanded = !isExpanded;
		}}
	>
		<div class="flex space-x-2">
			<div class="w-4">🏠</div>
			<div>
				{workspace.name}
			</div>
		</div>
		<div class="w-4">
			<svg
				class:rotate-180={isExpanded}
				class="w-4 h-4 inline-block transition-all"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</div>
	</button>
	{#if isExpanded}
		<ul class="py-2" transition:slide>
			{#each workspace.projects as project}
				<li>
					<a
						href="/workspaces/{workspace.id}/projects/{project.id}"
						class="py-1 px-4 block hover:bg-primary-400 transition-all box-content active:bg-primary-300"
					>
						<div class="flex space-x-2">
							<div class="w-4">{project.icon}</div>
							<div class="truncate text-ellipsis">{project.title}</div>
						</div></a
					>
				</li>
			{/each}
		</ul>
	{/if}
</section>
