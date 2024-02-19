<script>
	import { createEventDispatcher } from 'svelte'

	let { items, value } = $props()

	const dispatch = createEventDispatcher()
	const dispatchEvent = (v, t) => {
		dispatch('change', { value: v, text: t })
		value = v
	}

	let showAllOptions = false
</script>

<div class='dropdown'>
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<ul onmouseenter={() => showAllOptions = true} onmouseleave={() => showAllOptions = false}>
		{#each items as item}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<input type='checkbox' name='test' id={item.value} onclick={dispatchEvent(item.value, item.text)} checked={value===item.value}>
			<label for={item.value}>{item.text}</label>
			<div></div>
		{/each}
	</ul>
</div>

<style>
	ul {
		padding: 0;
		display: flex;
		list-style: none;
		position: relative;
	}

	input:checked + label {
		font-weight: 700;
	}
</style>
