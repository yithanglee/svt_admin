<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';

	// We still import the CSS at the top level as it's handled by Vite
	import 'jstree/dist/themes/default/style.min.css';

	export let username = 'netsphere_unpaid';
	export let token = '';
	export let endpoint = '';

	const dispatch = createEventDispatcher();
	let treeElement;
	let jstreeInstance = false;
	let libsLoaded = false;
	let jQuery;

	// Whenever username or token changes, we re-init
	$: if (endpoint && username && token && token !== '' && libsLoaded && treeElement) {
		initJsTree();
	}

	const initJsTree = () => {
		if (!browser || !libsLoaded || !treeElement) return;

		console.log('Initializing jsTree for:', username);

		if (jstreeInstance) {
			jQuery(treeElement).jstree('destroy');
		}

		jQuery(treeElement).jstree({
			core: {
				data: {
					url: (node) => {
						const targetUsername = node.id === '#' ? username : node.original.username;
						const finalUrl = `${endpoint}/svt_api/webhook?scope=node&username=${targetUsername}&token=${token}`;
						console.log('jsTree requesting:', finalUrl);
						return finalUrl;
					},
					data: (node) => {
						return { id: node.id };
					},
					success: (res) => {
						console.log('jsTree AJAX success. Data:', res);
						return res;
					},
					error: (err) => {
						console.error('jsTree AJAX error:', err);
					}
				},
				themes: {
					name: 'default',
					responsive: true,
					dots: true,
					icons: true
				},
				check_callback: true
			},
			plugins: ['search', 'types', 'wholerow']
		});

		jQuery(treeElement).on('select_node.jstree', (e, data) => {
			console.log('jsTree node selected:', data.node);
			dispatch('nodeClick', data.node.original);
		});

		jstreeInstance = true;
	};

	onMount(async () => {
		if (browser) {
			// Dynamically import jQuery and jstree only on the client
			const jqModule = await import('jquery');
			jQuery = jqModule.default || jqModule;
			window.jQuery = window.$ = jQuery; // jstree often expects it globally

			await import('jstree');
			libsLoaded = true;

			if (endpoint && username && token && token !== '') {
				initJsTree();
			}
		}
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.3.12/themes/default/style.min.css"
	/>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	/>
</svelte:head>

<div class="jstree-container p-4 bg-white rounded shadow-sm overflow-auto h-full min-h-[500px]">
	<div bind:this={treeElement} />
</div>

<style>
	:global(.jstree-default .jstree-anchor) {
		height: auto !important;
		line-height: 1.5 !important;
		white-space: normal !important;
		padding-top: 4px;
		padding-bottom: 4px;
	}

	:global(.jstree-container) {
		max-height: 80vh;
	}
</style>
