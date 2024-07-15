<script>
	import Datatable from '$lib/components/Datatable.svelte';
	import { onMount } from 'svelte';
	/** @type {import('./$types').PageData} */
	export let data;

	import { goto } from '$app/navigation';
	import { buildQueryString, postData } from '$lib/index.js';
	import { PHX_HTTP_PROTOCOL, PHX_ENDPOINT } from '$lib/constants';
	var url = PHX_HTTP_PROTOCOL + PHX_ENDPOINT;

	function viewInstalmentProducts(data) {
		goto('/products/' + data.id + '/instalment_products');
	}
	function viewStocks(data) {
		goto('/products/' + data.id + '/stocks');
	}
	function viewCountries(data) {
		goto('/products/' + data.id + '/countries');
	}
	function showCondition(data) {
		var bool = false;
		if (data.is_instalment  ) {
			bool = true;
		}
		return bool;
	}
	onMount(async () => {});

	let module = data.module,
		inputs = data.inputs;
</script>

<Datatable
	data={{
		canDelete: true,
		showNew: true,
		inputs: inputs,
		search_queries: null,
		model: module,
		preloads: ['instalment', 'first_payment_product'],
		customCols: [
			{
				title: 'General',
				list: [
					'name'
				]
			},
			{
				title: 'Price',
				list: [
					'retail_price',

					'point_value',
					{ label: 'desc', editor2: true },
					{ label: 'img_url', upload: true }
				]
			},
			{
				title: 'Admin',
				list: [
					{ label: 'override_pv', alt_name: 'Override Payment DRP', boolean: true },
					'override_perc',
					{ label: 'override_special_share_payout', boolean: true },
					'override_special_share_payout_perc',
					'id',
					{ label: 'is_instalment', alt_name: 'Set as instalment', boolean: true },
					{
						label: 'instalment_id',
						selection: 'Instalment',
						customCols: null,
						search_queries: ['a.name'],
						newData: 'name',
						title_key: 'name'
					},
					{
						label: 'first_payment_product_id',
						selection: 'Product',
						customCols: null,
						search_queries: ['a.name'],
						newData: 'name',
						title_key: 'name'
					}
				]
			}
		],
		buttons: [			{ name: 'Freebies', onclickFn: viewInstalmentProducts, showCondition: showCondition },
			{ name: 'Countries', onclickFn: viewCountries },
			{ name: 'Stocks', onclickFn: viewStocks }
		],

		columns: [
			{ label: 'ID', data: 'id' },
			{ label: 'Name', data: 'name' },
			{ label: 'Retail Price (RP)', data: 'retail_price' },
			{ label: 'Point Value', data: 'point_value' },
			{
				label: 'Override?',
				data: 'override_pv',
				isBadge: true,
				color: [
					{
						key: false,
						value: 'yellow'
					},

					{
						key: true,
						value: 'green'
					}
				]
			},
			{ label: 'Register Perc', data: 'override_perc' },
			{
				label: 'Override Special Share?',
				data: 'override_special_share_payout',
				isBadge: true,
				color: [
					{
						key: false,
						value: 'yellow'
					},

					{
						key: true,
						value: 'green'
					}
				]
			},
			{ label: 'Special Share DRP Perc', data: 'override_special_share_payout_perc' }

			// { label: 'Country', data: 'name', through: ['country'] }
		]
	}}
/>
