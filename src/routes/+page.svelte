<script>
	import { onMount } from 'svelte'

	let isScrolling = $state(false)

	const onwheel = (event) => {
		const modifier = event.deltaY > 0 ? 1 : -1

		// prevent scroll to top when is already at top
		if (modifier === -1 && window.scrollY === 0) return
		// prevent scroll to bottom when is already at bottom 
		if (modifier === 1 && window.scrollY === document.body.scrollHeight - window.innerHeight) return

		if (!isScrolling) {
			isScrolling = true
			console.log('set true')

			scrollTo({
				top: window.scrollY + window.innerHeight * modifier, 
				behavior: 'smooth'
			})
		}
	}

	const onscrollend = () => {
		console.log('set false')
		isScrolling = false
	}

	onMount(() => {
		window.addEventListener('wheel', e => e.preventDefault(), { passive: false })
	})
</script>

<svelte:window {onwheel} {onscrollend} />

<div class='flex p-4 100dvh'>
	<div class='1/1 md:2/5'>
		<h1 class='weight-600'>Eustoma</h1>
		<h4 class='muted weight-500'>Lightweight flexible grid system</h4>
	</div>
	<div class='1/1 md:3/5 p-4 d-grid place-center bg-gray r-10'>
		<!-- <h1>1/1 md:3/5</h1> -->
	</div>
</div>

<div class='flex p-4 100dvh'>
	<div class='1/1 d-flex column'>
		<h1><span class='muted'>01</span> Flex</h1>
		<h1><span class='muted'>02</span> Grid</h1>
		<h6 class='muted mt-a'>Eustoma Design System</h6>
	</div>
</div>

<div class='flex p-4 100dvh'>
	<div class='1/1'>
		<h5 class='muted'>Flex</h5>
		<h1>Twelve-column system.</h1>
	</div>
	<div class='1/12 bg-gray r-5 md:r-10'></div>
	<div class='1/12 bg-gray r-5 md:r-10'></div>
	<div class='1/12 bg-gray r-5 md:r-10'></div>
	<div class='1/12 bg-gray r-5 md:r-10'></div>
	<div class='1/12 bg-gray r-5 md:r-10'></div>
	<div class='1/12 bg-gray r-5 md:r-10'></div>
	<div class='1/12 bg-gray r-5 md:r-10'></div>
	<div class='1/12 bg-gray r-5 md:r-10'></div>
	<div class='1/12 bg-gray r-5 md:r-10'></div>
	<div class='1/12 bg-gray r-5 md:r-10'></div>
	<div class='1/12 bg-gray r-5 md:r-10'></div>
	<div class='1/12 bg-gray r-5 md:r-10'></div>
</div>
