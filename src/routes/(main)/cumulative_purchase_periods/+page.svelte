<script>
	import { PHX_HTTP_PROTOCOL, PHX_ENDPOINT } from '$lib/constants';
	import { goto } from '$app/navigation';
	import Datatable from '$lib/components/Datatable.svelte';
	import { buildQueryString, postData } from '$lib/index.js';
	/** @type {import('./$types').PageData} */
	export let data;

	let inputs = data.inputs;
	var url = PHX_HTTP_PROTOCOL + PHX_ENDPOINT;

	function viewFreebies(data, checkPage, confirmModal) {
		goto('/cumulative_purchase_periods/' + data.id + '/products');
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
		showNew: true,
		canDelete: true,
		inputs: inputs,
		// join_statements: JSON.stringify([{ user: 'user' }]),
		search_queries: ['a.id'],
		model: 'CumulativePurchasePeriod',
		preloads: [],
		buttons: [
			{ name: 'Freebies', onclickFn: viewFreebies },

		],
		customCols: [
			{
				title: 'General',
				list: [
					'id',
					{ label: 'start_date', datetime: true},
					{ label: 'end_date', datetime: true},
					'label',
					{
						label: 'country_id',
						selection: 'Country',
                        module: 'Country',
						customCols: null,
						search_queries: ['a.name'],
						newData: 'name',
						title_key: 'name'
					},
					'desc',
					
				]
			}
		],
		columns: [
			{ label: 'ID', data: 'id' },
			{ label: 'Timestamp', data: 'inserted_at', formatDateTime: true, offset: 8 },
			{ label: 'Start Date', data: 'start_date', formatDateTime: true },
			{ label: 'End Date', data: 'end_date', formatDateTime: true },
			{ label: 'Commission %', data: 'commission_perc' },
			{ label: 'Label', data: 'label' },
			{ label: 'Description', data: 'desc' },
		
		]
	}}
/>
