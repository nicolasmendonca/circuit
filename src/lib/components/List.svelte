<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { ListContentBlock, TaskListItem } from '$lib/types';

	export let workspaceId: string;
	export let projectId: string;
	export let contentBlock: ListContentBlock;

	async function handleTaskToggle(task: TaskListItem) {
		contentBlock.items = contentBlock.items.map((t) => {
			return t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t;
		});
		await fetch(
			`/api/workspaces/${workspaceId}/projects/${projectId}/lists/${contentBlock.id}/tasks/${task.id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...task,
					isCompleted: !task.isCompleted
				} satisfies TaskListItem)
			}
		);
		await invalidateAll();
	}

	async function handleSubmit(event: Event & { currentTarget: HTMLFormElement }) {
		const form = event.currentTarget;
		const input = form.querySelector('input');
		await fetch(
			`/api/workspaces/${workspaceId}/projects/${projectId}/lists/${contentBlock.id}/tasks`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: crypto.randomUUID(),
					title: input?.value ?? '',
					isCompleted: false
				} satisfies TaskListItem)
			}
		);
		await invalidateAll();
		form.reset();
		input?.focus();
	}
</script>

<section class="my-4">
	<h2 class="text-xl font-semibold mb-2">{contentBlock.title}</h2>

	<form on:submit|preventDefault={handleSubmit}>
		<input
			name="title"
			type="text"
			placeholder="New task"
			class="input mb-2 w-full max-w-sm"
			autocomplete="off"
		/>
	</form>

	{#each contentBlock.items as task}
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
				<a
					href="/workspaces/{workspaceId}/projects/{projectId}/lists/{contentBlock.id}/tasks/{task.id}"
					class="label-text py-1">{task.title}</a
				>
			</div>
		</div>
	{/each}
</section>
