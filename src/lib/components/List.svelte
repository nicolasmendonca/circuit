<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { TaskListItem } from '$lib/types';

	export let tasks: TaskListItem[];

	async function handleTaskToggle(task: TaskListItem) {
		tasks = tasks.map((t) => {
			return t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t;
		});
		await fetch(`/api/tasks/${task.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				isCompleted: !task.isCompleted
			})
		});
		await invalidateAll();
	}
</script>

<section class="my-4">
	<h2 class="text-xl font-semibold mb-2">Tasks before End of Year</h2>

	<form
		action="/?/addTask"
		method="post"
		use:enhance={() => {
			return async ({ result, form }) => {
				await applyAction(result);
				await invalidateAll();
				const input = form.querySelector('input');
				form.reset();
				input?.focus();
			};
		}}
	>
		<input
			name="title"
			type="text"
			placeholder="New task"
			class="input bg-gray-100 mb-2 w-full max-w-sm"
			autocomplete="off"
		/>
	</form>

	{#each tasks as task}
		<div class="form-control">
			<div class="cursor-pointer label font-semibold justify-start space-x-4">
				<input
					type="checkbox"
					checked={task.isCompleted}
					class="checkbox checkbox-primary"
					aria-label={task.title}
					on:change={() => {
						handleTaskToggle(task);
					}}
				/>
				<a href="/tasks/{task.id}" class="label-text py-1">{task.title}</a>
			</div>
		</div>
	{/each}
</section>
