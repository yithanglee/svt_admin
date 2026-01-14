<script>
	import Datatable from '$lib/components/Datatable.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	let inputs = data.inputs,
		dataList = data.dataList;
</script>

<Datatable
	data={{
		showNew: true,
		canDelete: true,
		appendQueries: {  },
		inputs: inputs,
		search_queries: null,
		model: 'CumulativePurchaseFreebie',
		preloads: ['cumulative_purchase_period', 'product'],
		customCols: [
			{
				title: 'General',
				list: [
					'id',
					{
						label: 'CumulativePurchaseFreebie',
						selection: 'Product',
						multiSelection: true,
						dataList: dataList.products,
						module: 'Product',
						parentId: data.id,
						parent_module: 'CumulativePurchasePeriod'
					},
                    {label: 'qty', expose: true},
                    {label: 'pp', expose: true},
                    {label: 'drp', expose: true},
                    {label: 'tp', expose: true},
                    {label: 'reward_type', expose: true},
                    {label: 'total_cumulative_rp', expose: true},
				]
			}
		],
		columns: [
			{ label: 'ID', data: 'id' },
            { label: 'Product', data: 'name', through: ['product'] },
            { label: 'Cumulative Purchase Period', data: 'label', through: ['cumulative_purchase_period'] },
            { label: 'Qty', data: 'qty' },
            { label: 'PP', data: 'pp' },
            { label: 'DRP', data: 'drp' },
            { label: 'TP', data: 'tp' },
            { label: 'Reward Type', data: 'reward_type' },
            { label: 'Total Cumulative RP', data: 'total_cumulative_rp' },
	
		]
	}}
/>
