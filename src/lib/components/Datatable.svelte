<script>
	import DataForm from '$lib/components/DataForm.svelte';
	import DataCell from '$lib/components/DataCell.svelte';
	import { PHX_HTTP_PROTOCOL, PHX_ENDPOINT } from '$lib/constants';
	import { postData, buildQueryString } from '$lib/index.js';
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import {
		Pagination,
		Modal,
		Button,
		Label,
		Input,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { isModalOpen } from '../stores/modal';
	export let data;

	let customCols = data.customCols,
		query,
		confirmModal = false,
		selectedId = 0,
		inputs = data.inputs,
		isOpen = false,
		items = [],
		columns = data.columns,
		pages = [],
		selectedData = {},
		cac_url = PHX_HTTP_PROTOCOL + PHX_ENDPOINT,
		model = data.model;

	const itemsPerPage = 10;

	async function fetchData(pageNumber) {
		const apiData = {
			search: { regex: 'false', value: query != null ? query.trim() : '' },
			additional_join_statements: data.join_statements,
			additional_search_queries: data.search_queries,
			draw: '1',
			length: itemsPerPage,
			model: data.model,
			columns: { 0: { data: 'id', name: 'id' } },
			order: { 0: { column: 0, dir: 'desc' } },
			preloads: JSON.stringify(data.preloads),
			start: ((pageNumber == null ? 1 : pageNumber) - 1) * itemsPerPage
		};
		const queryString = buildQueryString(apiData);
		console.log(queryString);
		try {
			let blog_url = PHX_HTTP_PROTOCOL + PHX_ENDPOINT;

			const response = await fetch(blog_url + '/api/' + model + `?${queryString}`, {
				headers: {
					'content-type': 'application/json'
				}
			});
			if (response.ok) {
			
				let dataList = await response.json();
				console.log(dataList);
				items = dataList.data;

				var totalPages = Math.ceil(dataList.recordsFiltered / itemsPerPage);

				pages = [];

				for (var i = 0; i < totalPages; i++) {
					pages.push({ name: i + 1, href: `?page=` + (i + 1) });
				}
			} else {
				console.error('API request failed');
			}
		} catch (error) {
			console.error('An error occurred', error);
		}
	}
	const previous = () => {
		alert('Previous btn clicked. Make a call to your server to fetch data.');
	};
	const next = () => {
		alert('Next btn clicked. Make a call to your server to fetch data.');
	};
	onMount(() => {
		fetchData(1);
	});

	async function checkPage() {
		setTimeout(() => {
			console.log($page.url.searchParams.get('page'));
			fetchData($page.url.searchParams.get('page'));
		}, 200);
	}
	function deleteData(data) {
		// need a confirmation button...

		confirmModal = true;
		selectedId = data.id;
	}
	function confirmDelete(id) {
		confirmModal = false;
		postData(
			{},
			{ method: 'DELETE', endpoint: PHX_HTTP_PROTOCOL + PHX_ENDPOINT + '/api/' + model + '/' + id }
		);
		checkPage();
		selectedId = null;
	}
	function openModal(data) {
		selectedData = data;

		isModalOpen.set(!isOpen);
	}
	onMount(() => {});

	let unsub = isModalOpen.subscribe((v) => {
		isOpen = v;
		console.log(v);
	});
	onDestroy(unsub);
</script>

<div class="mb-6 flex flex items-center">
	<div class="">
		<Label for="default-input" class="block mb-2">Search</Label>
		<div class="flex gap-4 items-center">
			<Input id="default-input" bind:value={query} placeholder="type query here" />
			<Button
				on:click={() => {
					fetchData(1);
				}}>Search</Button
			>
			<DataForm
				{customCols}
				data={selectedData}
				{inputs}
				url={cac_url}
				module={data.model}
				postFn={checkPage}
			/>
		</div>
	</div>
</div>
<div class="flex flex-col items-center justify-center gap-2 mb-4" />
<Table shadow hoverable={true}>
	<TableHead>
		{#each columns as col}
			<TableHeadCell>{col.label}</TableHeadCell>
		{/each}
		<TableHeadCell>
			<span class="sr-only">Action</span>
		</TableHeadCell>
	</TableHead>
	<TableBody class="divide-y">
		{#each items as item}
			<TableBodyRow>
				{#each columns as col}
					<TableBodyCell class="font-light dark:text-white">
						<DataCell {item} {col} />
					</TableBodyCell>
				{/each}
				<!-- if have customized button? -->
				<TableBodyCell>
					<a
						on:click|preventDefault={openModal(item)}
						href="#"
						class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a
					>
					|
					<a
						on:click|preventDefault={deleteData(item)}
						href="#"
						class="font-medium text-primary-600 hover:underline dark:text-primary-500">Delete</a
					>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
<div class="flex flex-col items-center justify-center gap-2 mt-4">
	<Pagination {pages} on:click={checkPage} on:previous={previous} on:next={next} />
</div>

<Modal title="Confirm?" bind:open={confirmModal} autoclose outsideclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		Are you sure you want to delete?
	</p>
	<svelte:fragment slot="footer">
		<Button
			color="red"
			on:click={() => {
				confirmDelete(selectedId);
			}}>Delete</Button
		>
	</svelte:fragment>
</Modal>
