<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<form
	method="POST"
	action="?/addTextContentBlock"
	class="form-control my-4 relative"
	use:enhance={() => {
		return async ({ result }) => {
			await applyAction(result);
			await invalidateAll();
			dispatch('submit');
		};
	}}
>
	<input type="hidden" name="type" value="text" />
	<!-- svelte-ignore a11y-autofocus -->
	<textarea
		rows="4"
		class="textarea textarea-primary pr-16 py-2"
		placeholder="Add text content here"
		name="content"
		autofocus
	/>
	<button type="submit" class="btn btn-primary absolute right-0 bottom-0">Save</button>
</form>
