<script lang="ts">
	import WorkspaceGroup from './WorkspaceGroup.svelte';
	import type { LinkItem } from './WorkspaceGroup';

	let linkItems: LinkItem[] = [
		{
			name: 'Pitch Meetings Aasdjioji asdjioasdjiasod nkzxcnjzx',
			href: 'https://google.com',
			icon: '🚀'
		},
		{
			name: 'End of Year Party',
			href: 'https://google.com',
			icon: '🎨'
		},
		{
			name: 'Client Sales',
			href: 'https://google.com',
			icon: '📝'
		}
	];
</script>

<nav class="flex flex-col space-y-2">
	<WorkspaceGroup name="Work" links={linkItems} />
	<WorkspaceGroup name="Personal" links={linkItems} />
	<WorkspaceGroup name="College" links={linkItems} />
</nav>
