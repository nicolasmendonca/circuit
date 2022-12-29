<script lang="ts">
	import List from '$lib/components/List.svelte';
	import type { LayoutData } from './$types';
	import AddContentBlock from './AddContentBlock.svelte';

	export let data: LayoutData;
</script>

<div class="flex space-x-4">
	<section class="bg-white p-8 rounded-xl">
		<header class="flex items-start group">
			<h1
				class="truncate group-hover:text-clip group-hover:whitespace-normal group-focus-within:text-clip group-focus-within:whitespace-normal text-3xl font-semibold"
			>
				{data.project.title}
			</h1>
			<!-- Pencil svg -->
			<button
				aria-label="Edit project title"
				class="opacity-0 transition-all group-hover:opacity-100 focus:opacity-100 mt-2 ml-2 py-2 px-2 rounded-xl hover:bg-primary-400 focus:bg-primary-400 active:bg-primary-500"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-4 h-4"
				>
					<path
						d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
					/>
				</svg>
			</button>
		</header>

		<hr class="my-4" />

		{#each data.project.contentBlocks as contentBlock}
			{#if contentBlock.type == 'text'}
				<p class="whitespace-pre-wrap">{contentBlock.content}</p>
			{:else if contentBlock.type == 'list'}
				<ul class="list-disc list-inside">
					<List {contentBlock} workspaceId={data.workspace.id} projectId={data.project.id} />
				</ul>
			{/if}
		{/each}

		<AddContentBlock />
	</section>

	<main class="flex-grow pr-4">
		<slot />
	</main>
</div>
