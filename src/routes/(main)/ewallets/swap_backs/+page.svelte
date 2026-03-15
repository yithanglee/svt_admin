<script>
	import Datatable from '$lib/components/Datatable.svelte';
	import { onMount } from 'svelte';
	import { postData } from '$lib/index.js';
	import { PHX_HTTP_PROTOCOL, PHX_ENDPOINT } from '$lib/constants';
	var url = PHX_HTTP_PROTOCOL + PHX_ENDPOINT;
	import { isToastOpen } from '$lib/stores/toast';
	/** @type {import('./$types').PageData} */
	export let data;
	onMount(async () => {});

	let module = data.module,
		inputs = data.inputs;

	function approveTransfer(data, checkPage, confirmModal) {
		console.log(data);

		confirmModal(true, 'Are you sure to approve this swap back?', () => {
			postData(
				{ scope: 'approve_swap_back', id: data.id },
				{
					endpoint: url + '/svt_api/webhook',
					successCallback: () => {
						isToastOpen.notify('Swap Back Approved!');
						checkPage();
					}
				}
			);
		});
	}

	function viewDOChild(data, checkPage, confirmModal, openRowChild) {
		const raw = data.swap_back_tx_check;
		const items =
			Array.isArray(raw) ? [...raw] : raw != null ? [raw] : [];
		openRowChild({
			title: 'Swap Back',
			id: data.id,
			items,
			columns: [
				{ label: 'Tx Hash', data: 'tx_hash' },
				{ label: 'Status', data: 'status' },
				{ label: 'Last Checked At', data: 'last_checked_at' }
			]
		});
	}
</script>

<Datatable
	data={{
		canDelete: true,
		inputs: inputs,
		join_statements: JSON.stringify([{ user: 'user' }]),
		search_queries: ['b.username'],
		model: module,
		preloads: ['user', 'swap_back_tx_check'],
		customCols: [
			{
				title: 'General',
				list: [
					'id',
					'user_wallet_address',
					'treasury_address',
					'amount',
					'reason',

					{ label: 'status', selection: ['pending', 'approved', 'rejected'] }
				]
			}
		],
		buttons: [
			{
				name: 'Approve',
				onclickFn: approveTransfer,
				showCondition: (data) => data.status == 'pending'
			},
			{ name: 'View', onclickFn: viewDOChild }
		],
		columns: [
			{ label: 'ID', data: 'id' },
			{
				label: 'Status',
				data: 'status',
				isBadge: true,
				color: [
					{
						key: 'pending',
						value: 'yellow'
					},

					{
						key: 'approved',
						value: 'green'
					},
					{
						key: 'rejected',
						value: 'red'
					}
				]
			},
			{ label: 'User Wallet Address', data: 'user_wallet_address' },
			{ label: 'Tx Hash', data: 'tx_hash' },

			{ label: 'User', data: 'username', through: ['user'] },

			{ label: 'Amount', data: 'amount' }
		]
	}}
/>
