<script>
	import { session } from '$lib/stores/session';
	import { api_get } from '$lib/index.js';
	import { PHX_HTTP_PROTOCOL, PHX_ENDPOINT } from '$lib/constants';
	import ReferralTree from '$lib/components/ReferralTree.svelte';
	import { Button, Input, Spinner } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';

	let url = PHX_HTTP_PROTOCOL + PHX_ENDPOINT;
	let currentUsername = 'netsphere_unpaid';
	let searchUsername = '';
	let userToken = '';
	let uplines = [];
	let loadingUplines = false;

	// Subscribe to session to get the token
	session.subscribe((s) => {
		if (s.user && s.user.token) {
			userToken = s.user.token;
		}
	});

	async function fetchUplines(username) {
		if (!userToken || !username) return;
		loadingUplines = true;
		try {
			const result = await api_get(url, {
				scope: 'referral_uplines',
				username: username,
				token: userToken
			});
			// check_uplines returns a list of maps: %{child: "...", parent: "...", ...}
			// We want to represent the path from the root to the current user.
			// The result is usually ordered from immediate parent upwards.
			uplines = result || [];
		} catch (error) {
			console.error('Failed to fetch uplines:', error);
			uplines = [];
		} finally {
			loadingUplines = false;
		}
	}

	function handleSearch() {
		if (searchUsername.trim()) {
			currentUsername = searchUsername.trim();
		}
	}

	function handleNodeClick(event) {
		const node = event.detail;
		if (node && node.username) {
			currentUsername = node.username;
		}
	}

	function resetToRoot() {
		currentUsername = 'netsphere_unpaid';
	}

	// Fetch uplines whenever the root node changes
	$: if (currentUsername && userToken) {
		fetchUplines(currentUsername);
	}
</script>

<div class="flex flex-col h-full">
	<div class="p-4 bg-white border-b flex flex-col gap-4">
		<div class="flex justify-between items-center">
			<div>
				<h2 class="text-lg font-semibold">Referral Tree</h2>
				<p class="text-sm text-gray-500">Interactive representation of the referral network</p>
			</div>

			<div class="flex items-center gap-2">
				<form on:submit|preventDefault={handleSearch} class="flex gap-2">
					<Input
						size="sm"
						placeholder="Search username..."
						bind:value={searchUsername}
						class="w-48"
					>
						<Icon slot="left" name="search-outline" class="w-4 h-4 text-gray-500" />
					</Input>
					<Button size="sm" type="submit">Search</Button>
				</form>

				{#if currentUsername !== 'netsphere_unpaid'}
					<Button size="sm" color="alternative" on:click={resetToRoot}>Reset to Root</Button>
				{/if}
			</div>
		</div>

		{#if loadingUplines}
			<div class="flex items-center gap-2 text-sm text-gray-500">
				<Spinner size="4" />
				<span>Fetching uplines...</span>
			</div>
		{:else if uplines.length > 0}
			<div class="flex flex-wrap items-center gap-1 text-sm bg-gray-50 p-2 rounded border">
				<span class="text-gray-500 mr-2">Referrer Path:</span>
				<button
					class="text-blue-600 hover:underline font-medium"
					on:click={() => (currentUsername = 'netsphere_unpaid')}
				>
					netsphere_unpaid
				</button>

				{#each [...uplines].reverse() as upline}
					<span class="text-gray-400">/</span>
					<button
						class="text-blue-600 hover:underline"
						on:click={() => (currentUsername = upline.parent)}
					>
						{upline.parent}
					</button>
				{/each}

				<span class="text-gray-400">/</span>
				<span class="font-bold text-gray-900">{currentUsername}</span>
			</div>
		{/if}
	</div>

	<div class="flex-1 p-4 bg-gray-100 overflow-auto">
		<ReferralTree
			username={currentUsername}
			token={userToken}
			endpoint={url}
			on:nodeClick={handleNodeClick}
		/>
	</div>
</div>

<style>
	:global(body) {
		overflow-x: hidden;
	}
</style>
