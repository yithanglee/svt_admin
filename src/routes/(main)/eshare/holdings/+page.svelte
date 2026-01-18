<script>
	import { PHX_HTTP_PROTOCOL, PHX_ENDPOINT } from '$lib/constants';
	import { goto } from '$app/navigation';
	import Datatable from '$lib/components/Datatable.svelte';
	import { buildQueryString, postData } from '$lib/index.js';
	/** @type {import('./$types').PageData} */
	export let data;

	let inputs = data.inputs;
	var url = PHX_HTTP_PROTOCOL + PHX_ENDPOINT;

	function viewDO(data, checkPage, confirmModal) {
		goto('/eshare/users/' + data.id + '/ledger_entries');
	}
	function showCondition(data) {
		var bool = false;
		if (data.is_approved == false) {
			bool = true;
		}
		return bool;
	}



</script>

<Datatable
	data={{
		showNew: false,
		canDelete: false,
		inputs: inputs,
		join_statements: JSON.stringify([{ user: 'user' }]),
		search_queries: [ 'b.username', 'b.fullname'],
		model: 'StakeHolding',
		preloads: ['user', 'holding'],
		buttons: [
		

			
		],
		customCols: [
			{
				title: 'General',
				list: [
					'id',
					
		
					
				]
			}
			
		],
		columns: [
			{ label: 'ID', data: 'id' },
			{ label: 'Initial Bought', data: 'inserted_at', formatDateTime: true, offset: 8 },
			{ label: 'User', data: 'username', through: ['user'] },
			{ label: 'Quantity', data: 'original_qty', formatFloat: true },
			{ label: 'Released', data: 'released', formatFloat: true },
			{label: 'Progress', showProgress: true, showProgress: (data) => {
				return (data.released / data.original_qty * 100).toFixed(2) ;
			}}
		
		]
	}}
/>
