<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="bg-white p-8 rounded-xl">
	<header class="flex items-start group">
		<h1
			class="truncate group-hover:text-clip group-hover:whitespace-normal group-focus-within:text-clip group-focus-within:whitespace-normal text-3xl font-semibold"
		>
			{data.workspace.name}
		</h1>
	</header>
	<hr class="my-4" />
	<section>
		<ul class="list-inside">
			{#each data.workspace.projects as project}
				<li>
					<a
						href={`/workspaces/{data.workspace.id}/projects/${project.id}`}
						class="link-primary flex items-center space-x-2"
					>
						<div>
							{project.icon}
						</div>
						<div>
							{project.title}
						</div>
					</a>
				</li>
			{/each}
		</ul>

		<form class="my-4" method="POST" action="?/createProject" use:enhance>
			<div class="form-control">
				<div class="input-group">
					<input
						type="text"
						name="title"
						placeholder="Create new project"
						class="input input-sm input-bordered input-primary"
					/>
					<button class="btn btn-sm btn-outline normal-case"> Create project </button>
				</div>
			</div>
		</form>
	</section>
</main>
