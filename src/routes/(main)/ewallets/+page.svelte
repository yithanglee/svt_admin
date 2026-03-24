<script>
	import Datatable from '$lib/components/Datatable.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	/** @type {import('./$types').PageData} */
	export let data;
	onMount(async () => {});

	let module = data.module,
		inputs = data.inputs;
	function viewTransfer(data) {
		console.log(data);
		console.log('transfer approved!');
		goto('/ewallets/' + data.id + '/wallet_transactions');
	}
</script>

<Datatable
	data={{
		inputs: inputs,
		join_statements: JSON.stringify([
			// { corporate_account: 'corporate_account' },
			{ user: 'user' }
		]),
		search_queries: ['b.username', 'b.fullname', 'wallet_type'],
		convertDropDown: [
			{
				column: 'wallet_type',
				list: [
					{ label: 'All', value: null },
					{ label: 'Register', value: 'register' },
					{ label: 'Merchant', value: 'asset' },
					{ label: 'Crypto', value: 'active_token' },
					{ label: 'Bonus', value: 'bonus' },
					{ label: 'Product', value: 'product' }
				]
			}
		],
		model: module,
		preloads: ['user'],
		customCols: [
			{
				title: 'General',
				list: ['id']
			}
		],
		buttons: [{ name: 'View', onclickFn: viewTransfer }],
		columns: [
			{ label: 'ID', data: 'id' },

			{ label: 'User', data: 'username', through: ['user'] },
			{ label: 'Type', data: 'wallet_type' },
			{ label: 'Total', data: 'total' }
		]
	}}
/>
