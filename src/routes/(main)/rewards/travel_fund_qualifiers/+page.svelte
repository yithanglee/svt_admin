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

	// Add reactive variables for year and month
	let selectedYear = 2025;
	let selectedMonth = 1;

	// Create an array of years (e.g., from 2020 to 2025)
	const years = Array.from({length: 6}, (_, i) => 2020 + i);
	// Create an array of months (1-12)
	const months = Array.from({length: 12}, (_, i) => i + 1);

	// Add reference to SimpleTable component
	let simpleTable;

	// Function to handle form submission
	function handleSubmit() {
		if (simpleTable) {
			simpleTable.reload();
		}
	}
</script>

<div class="mb-4">
	<form on:submit|preventDefault={handleSubmit} class="flex gap-4 items-end">
		<div>
			<label for="year" class="block mb-2 text-sm font-medium text-gray-900">Year</label>
			<select
				id="year"
				bind:value={selectedYear}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
			>
				{#each years as year}
					<option value={year}>{year}</option>
				{/each}
			</select>
		</div>

		<div>
			<label for="month" class="block mb-2 text-sm font-medium text-gray-900">Month</label>
			<select
				id="month"
				bind:value={selectedMonth}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
			>
				{#each months as month}
					<option value={month}>{month}</option>
				{/each}
			</select>
		</div>

		<button
			type="submit"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
		>
			Apply
		</button>
	</form>
</div>

<SimpleTable
	bind:this={simpleTable}
	data={{
		apiData: { year: selectedYear, month: selectedMonth },
		buttons: [],
		scope: 'travel_fund_qualifiers',
		columns: [
			{ label: 'Year', data: 'year' },
			{ label: 'Month', data: 'month' },
			{ label: 'Left', data: 'left' },
			{ label: 'Right', data: 'right' },
			{ label: 'User ID', data: 'user_id' },
			{ label: 'Username', data: 'username' }
		]
	}}
/>
