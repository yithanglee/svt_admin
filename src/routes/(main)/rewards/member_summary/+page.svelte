<script>
	/** @type {import('./$types').PageData} */
	import SimpleTable from '$lib/components/SimpleTable.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { postData, buildQueryString } from '$lib/index.js';
	import { PHX_HTTP_PROTOCOL, PHX_ENDPOINT } from '$lib/constants';
	import { isToastOpen } from '$lib/stores/toast';
	var url = PHX_HTTP_PROTOCOL + PHX_ENDPOINT;
	/** @type {import('./$types').PageData} */
	export let data;
	onMount(async () => {});
</script>

<SimpleTable
	data={{
		apiData: {
			user_id: 'all'
		},
		buttons: [],
		scope: 'get_reward_summary_by_years2',
		columns: [
			{ label: 'Member', data: 'fullname' },
	
			{ label: 'YY', data: 'year' },
			{ label: 'Amount', data: 'sum' }
		]
	}}
/>
