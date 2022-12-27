<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	$: tasks = data.tasks;
</script>

<main class="bg-white p-4 rounded-xl">
	<header class="flex items-start group">
		<h1
			class="truncate group-hover:text-clip group-hover:whitespace-normal group-focus-within:text-clip group-focus-within:whitespace-normal text-4xl font-semibold"
		>
			Something
		</h1>
		<!-- Pencil svg -->
		<button
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

	<section class="my-4">
		<h2 class="text-2xl mb-2">Tasks before End of Year</h2>

		<form
			action="?/addTask"
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
				class="input mb-2 input-primary w-full max-w-sm"
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
					/>
					<a href="#" class="label-text py-1">{task.title}</a>
				</div>
			</div>
		{/each}
	</section>
</main>
