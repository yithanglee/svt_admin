<script>
	import { PHX_HTTP_PROTOCOL, PHX_ENDPOINT } from '$lib/constants';
	import { goto } from '$app/navigation';
	import Datatable from '$lib/components/Datatable.svelte';
	import { buildQueryString, postData } from '$lib/index.js';
	/** @type {import('./$types').PageData} */
	export let data;

	let inputs = data.inputs;
	var url = PHX_HTTP_PROTOCOL + PHX_ENDPOINT;


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
        appendQueries: { merchant_id: data.id },
		showNew: true,
		canDelete: true,
		inputs: inputs,
		join_statements: JSON.stringify([{ merchant: 'merchant' }]),
		search_queries: [ 'b.name'],
		model: 'MerchantProduct',
		preloads: ['merchant'],
		buttons: [
		

			
		],
		customCols: [
			{
				title: 'General',
				list: [
					'id',
					'name',
					'retail_price',
					'point_value',
					
                    { label: 'img_url', upload: true },
					'description',
					'short_desc',
					'brand_name',
					'category_name',
                    { label: 'merchant_id', hidden: true, value: data.id },
					
		
					
				]
			}
			
		],
		columns: [
			{ label: 'ID', data: 'id' },
			{ label: 'Timestamp', data: 'inserted_at', formatDateTime: true, offset: 8 },
            { label: 'Image', data: 'img_url', showImg: true },
            
            { label: 'Name', data: 'name' , subtitle: {label: 'short_desc', data: 'short_desc'}},
            { label: 'Retail Price', data: 'retail_price' },
            { label: 'Point Value', data: 'point_value' },
           
            { label: 'Brand Name', data: 'brand_name' },
            { label: 'Category Name', data: 'category_name' },
		
		
		]
	}}
/>
