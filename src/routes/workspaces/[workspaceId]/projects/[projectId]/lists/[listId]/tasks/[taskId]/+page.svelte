<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	$: task = data.task;
</script>

<main class="bg-base-100 p-8 rounded-xl">
	<header class="flex items-center space-x-4">
		<h3 class="text-2xl font-semibold">{task.title}</h3>
		<form class="dropdown" method="POST" use:enhance>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label
				tabindex="0"
				class="btn btn-sm m-1"
				class:btn-warning={!task.isCompleted}
				class:btn-success={task.isCompleted}>{task.isCompleted ? 'Completed' : 'Pending'}</label
			>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
				<li>
					<button formAction="?/setStatus" name="status" value="completed"> Completed </button>
				</li>
				<li>
					<button formAction="?/setStatus" name="status" value="pending"> Pending </button>
				</li>
			</ul>
		</form>
	</header>
</main>
