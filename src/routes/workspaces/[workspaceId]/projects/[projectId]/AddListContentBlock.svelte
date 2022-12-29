<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	type Task = {
		id: string;
		title: string;
	};

	let tasks: Task[] = [];

	$: {
		if (tasks[tasks.length - 1]?.title !== '') {
			tasks.push({ id: crypto.randomUUID(), title: '' });
		}
	}
</script>

<form
	class="my-4"
	method="POST"
	action="?/addTextContentBlock"
	use:enhance={() => {
		return async ({ result }) => {
			await applyAction(result);
			await invalidateAll();
			dispatch('submit');
		};
	}}
>
	<input type="hidden" name="type" value="list" />
	<!-- input for list name -->
	<!-- svelte-ignore a11y-autofocus -->
	<input
		type="text"
		name="title"
		placeholder="Task list title"
		class="input block bg-gray-100 w-full max-w-xs"
		autofocus
	/>
	{#each tasks as task (task.id)}
		<input type="hidden" name="id[]" value={task.id} />
		<input
			type="text"
			placeholder="Task description"
			class="input block w-full max-w-xs"
			name="task[]"
			bind:value={task.title}
			on:blur={() => {
				if (task.title === '' && tasks.length > 1) {
					tasks = tasks.filter((taskItem) => taskItem.id !== task.id);
				}
			}}
		/>
	{/each}
	<button class="btn btn-sm mt-2">Save</button>
</form>
