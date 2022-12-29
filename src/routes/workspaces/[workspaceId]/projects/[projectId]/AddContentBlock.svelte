<script lang="ts">
	import type { BlockType } from '$lib/types';
	import AddListContentBlock from './AddListContentBlock.svelte';
	import AddTextContentBlock from './AddTextContentBlock.svelte';

	let addingBlockType: BlockType | null = null;
</script>

<div class="dropdown">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label tabindex="0" class="btn btn-sm m-1 btn-outline btn-primary" aria-label="Add block"
		>Add block</label
	>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
		<li>
			<button
				type="button"
				on:click={() => {
					addingBlockType = 'text';
				}}
			>
				Text
			</button>
		</li>
		<li>
			<button
				type="button"
				on:click={() => {
					addingBlockType = 'list';
				}}
			>
				List
			</button>
		</li>
	</ul>
</div>

{#if addingBlockType === 'text'}
	<AddTextContentBlock
		on:submit={() => {
			addingBlockType = null;
		}}
	/>
{:else if addingBlockType === 'list'}
	<AddListContentBlock
		on:submit={() => {
			addingBlockType = null;
		}}
	/>
{/if}
