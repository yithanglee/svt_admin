<script>
	import { Toast, DarkMode, Button } from 'flowbite-svelte';
	import { session } from '$lib/stores/session';
	import { isToastOpen } from '$lib/stores/toast';
	import { Icon } from 'flowbite-svelte-icons';
	import '../app.postcss';
	import { goto } from '$app/navigation';
	import {
		Dropdown,
		DropdownItem,
		Alert,
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger
	} from 'flowbite-svelte';

	import { onDestroy, onMount } from 'svelte';
	import jsCookie from 'js-cookie';
	import { MENUS } from '$lib/constants';
	/** @type {import('./$types').LayoutData} */
	export let data;
	let open = true,
		toastMessage = '',
		nav_class = 'hidden',
		loggedIn = 'false';
	console.log('this is loaded 0s');
	function logOut() {
		session.logout();
		loggedIn = 'false';
		jsCookie.remove('user');
		jsCookie.remove('token');
		goto('/');
	}
	function appendClass(existing_class) {
		return 'cursor-pointer ' + existing_class;
	}

	onMount(() => {});
	session.subscribe((value) => {
		console.log(value);
		if (value && value.loggedIn) {
			nav_class = '';
		}
		if (value.loggedIn == false) {
			nav_class = 'hidden';
		}
	});
	let unsub = isToastOpen.subscribe((v) => {
		open = v.open;
		toastMessage = v.message;
	});
	onDestroy(() => {
		unsub();
	});
</script>

<Toast color="green" position="top-right" bind:open>
	<Icon
		slot="icon"
		name="check-circle-solid"
		class="w-5 h-5 text-green-500 transition duration-75 dark:text-green-400 group-hover:text-green-900 dark:group-hover:text-white"
	/>

	{toastMessage}</Toast
>
<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<img src="/images/2damienslab.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>Svelte Admin</span
		>
	</NavBrand>
	<div class="flex md:order-2">
		<DarkMode />
		<NavHamburger on:click={toggle} />
	</div>

	<NavUl {hidden}>
		<NavLi class={nav_class} href="/dashboard">Dashboard</NavLi>
		{#each MENUS as menu}
			{#if !menu.hidden}
				{#if menu.children}
					<NavLi class={appendClass(nav_class)} id={menu.title}>{menu.title}</NavLi>
					<Dropdown triggeredBy="#{menu.title}" class="w-44 z-20">
						{#each menu.children as child}
							<DropdownItem href={child.path}>{child.title}</DropdownItem>
						{/each}
					</Dropdown>
				{:else}
					<NavLi class={nav_class} id={menu.title} href={menu.path}>{menu.title}</NavLi>
				{/if}
			{/if}
		{/each}

		<NavLi class={nav_class} on:click={logOut} href="javascript:void(0);">Logout</NavLi>
	</NavUl>
</Navbar>

<div id="alert" class="p-8 hidden">
	<Alert>
		<span class="font-medium">Info alert!</span>
		Change a few things up and try submitting again.
	</Alert>
</div>
<section class="mx-4 p-4">
	<div class="my-4">
		<slot />
	</div>
</section>
