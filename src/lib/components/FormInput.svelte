<script>
	import { Textarea, Fileupload, Card, Button, Label, Input, Checkbox } from 'flowbite-svelte';
	import TinyMCEditor from '@tinymce/tinymce-svelte';
	import Editor from 'cl-editor/src/Editor.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { afterUpdate, onMount } from 'svelte';
	export let input, key, module;
	export let data;
	console.log(key);
	console.log(input);

	console.log(data);

	let editorData ;
	if (input == null) {
		input = { key: key.label, value: 'id' };
		console.log(input);
	}
	if ( key.editor == true) {
		editorData = data[input.key] != null ? data[input.key] : ""
	}
	function inputName(key) {
		return module + '[' + key + ']';
	}
</script>

{#if input != null}
	{#if key.expose != null}
		<div class="w-full sm:w-1/3 mx-4 my-2">
			<Label class="space-y-2">
				<span class="capitalize">{input.key.replace('_', ' ')}</span>
				<Input type="text" name={inputName(input.key)} bind:value={data[input.key]} />
			</Label>
		</div>
	{:else if key.selection != null}
		<div class="w-full mx-4 my-2">
			<Label class="space-y-2 mb-3">
				<span class="capitalize">{input.key.replace('_', ' ')}</span>
		
			</Label>
			<Dropdown
				{data}
				{input}
				newData={key.newData}
				parent={module}
				name={inputName(input.key)}
				module={key.selection}
				search_queries={key.search_queries}
			/>
		</div>
	{:else if key.editor == true}
		<div class="w-full mx-4 my-2">
			<Label class="space-y-2 mb-3">
				<span class="capitalize">{input.key.replace('_', ' ')}</span>
				<Input type="hidden" name={inputName(input.key)} bind:value={editorData} />
			</Label>
			<TinyMCEditor
				apiKey="xnjuj4xq5iahoahtbzk5epjfsu1qxl31o9iy15y9100ihcsv"
				bind:value={editorData}
			/>
		</div>
	{:else if key.editor2 == true}
		<div class="w-full mx-4 my-2">
			<Label class="space-y-2">
				<span class="capitalize">{input.key.replace('_', ' ')}</span>
				<Input type="hidden" name={inputName(input.key)} bind:value={data[input.key]} />
			</Label>

			<Editor html={data[input.key]} on:change={(evt) => (data[input.key] = evt.detail)} />
		</div>
	{:else if key.gallery == true}
		<div class="w-full mx-4 my-2">
			<Label class="space-y-2">
				<span class="capitalize">{input.key.replace('_', ' ')}</span>
				<Gallery {input} child={key.child} {module} name={input.key} />
			</Label>
		</div>
	{:else if key.upload == true}
		<div class="w-full mx-4 my-2">
			<Label class="space-y-2">
				<span class="capitalize">{input.key.replace('_', ' ')}</span>
				<Input type="file" id={input.key} name={inputName(input.key)} />
			</Label>
		</div>
	{:else if input.value == 'id'}
		<Input type="hidden" name={inputName(input.key)} bind:value={data[input.key]} />
	{:else if input.value == 'binary'}
		<div class="w-full mx-4 my-2">
			<Label class="mb-2 capitalize">{input.key.replace('_', ' ')}</Label>
			<Textarea
				placeholder="Content"
				class="editable"
				rows="4"
				name={inputName(input.key)}
				bind:value={data[input.key]}
			/>
		</div>
	{:else}
		<div class="w-full sm:w-1/3 mx-4 my-2">
			<Label class="space-y-2">
				<span class="capitalize">{input.key.replace('_', ' ')}</span>
				<Input type="text" name={inputName(input.key)} bind:value={data[input.key]} />
			</Label>
		</div>
	{/if}
{/if}
