<script>
	import { swipe } from 'svelte-gestures'
	import { onMount } from 'svelte'

	let debug = $state.frozen(true)
	let swipeOptions = $state.frozen({ timeframe: 300, minSwipeDistance: 100, touchAction: 'pan-y' })
	
	let innerHeight = $state(0)
	let scrollY = $state(0)
	let scrollHeight = $state(0)
	let currentPage = $derived(Math.round(scrollY / innerHeight) + 1)
	let maxPage = $derived(Math.round(scrollHeight / innerHeight))

	onMount(() => {
		window.addEventListener('wheel', e => e.preventDefault(), { passive: false })
		window.addEventListener('pointermove', e => e.preventDefault(), { passive: false })
		window.addEventListener('touchmove', e => e.preventDefault(), { passive: false })
		update()
	})

	const update = () => {
		innerHeight = window.innerHeight
		scrollY = window.scrollY
		scrollHeight = document.body.scrollHeight
		if (debug) console.log('values updates')
	}

	let isScrolling = $state(false)

	const onwheel = (event) => handler(event.deltaY > 0)
	const onswipe = (event) => handler(event.detail.direction === 'top')

	const onscrollend = () => {
		if (debug) console.log('isScrolling: false')
		// isScrolling = false
		// update()
	}

	const handler = (modifierCondition) => {
		const modifier = modifierCondition ? 1 : -1

		if (modifier === -1 && window.scrollY === 0) return
		if (modifier === 1 && currentPage === maxPage) return

		if (!isScrolling) {
			if (debug) console.log('isScrolling: true')
			isScrolling = true

			scrollTo(((currentPage - 1) + 1 * modifier) * innerHeight, () => {
				isScrolling = false
				update()
			})
		}
	}

	// https://stackoverflow.com/questions/52292603/is-there-a-callback-for-window-scrollto
	function scrollTo(offset, callback) {
		const fixedOffset = offset.toFixed()
		const onScroll = function () {
			if (window.scrollY.toFixed() === fixedOffset) {
				window.removeEventListener('scroll', onScroll)
				callback()
			}
		}

		window.addEventListener('scroll', onScroll)
		onScroll()
		window.scrollTo({
			top: offset,
			behavior: 'smooth'
		})
	}
</script>

<svelte:window {onwheel} onresize={update} onscroll={update} />

<div class='debug' class:hidden={!debug}>
	innerHeight: {innerHeight}<br>
	scrollY: {scrollY}<br>
	scrollHeight: {scrollHeight}<br>
	maxPage: {Math.round(scrollHeight / innerHeight)}<br>
	currentPage: {Math.round(scrollY / innerHeight) + 1}<br>
	isScrolling: {isScrolling}
</div>

<div use:swipe={swipeOptions} {onswipe}>
	<div class='flex p-4 100dvh'>
		<div class='1/1 md:2/5 ignore'>
			<h1 class='weight-600'>Eustoma</h1>
			<h4 class='muted weight-500'>Lightweight flexible grid system</h4>
		</div>
		<div class='1/1 md:3/5'></div>
	</div>
	
	<div class='flex p-4 100dvh'>
		<div class='1/1 ignore d-flex column'>
			<h1><span class='muted'>01</span> Flex</h1>
			<h6 class='muted mt-a'>Eustoma Design System</h6>
		</div>
	</div>
	
	<div class='flex p-4 100dvh'>
		<div class='1/1 ignore'>
			<h5 class='muted'>Flex</h5>
			<h1>Familiar system.</h1>
		</div>
		<div class='1/4 md:1/6 xl:1/12'></div>
		<div class='1/4 md:1/6 xl:1/12'></div>
		<div class='1/4 md:1/6 xl:1/12'></div>
		<div class='1/4 md:1/6 xl:1/12'></div>
		<div class='1/4 md:1/6 xl:1/12'></div>
		<div class='1/4 md:1/6 xl:1/12'></div>
		<div class='1/4 md:1/6 xl:1/12'></div>
		<div class='1/4 md:1/6 xl:1/12'></div>
		<div class='1/4 md:1/6 xl:1/12'></div>
		<div class='1/4 md:1/6 xl:1/12'></div>
		<div class='1/4 md:1/6 xl:1/12'></div>
		<div class='1/4 md:1/6 xl:1/12'></div>
	</div>
	
	<div class='flex p-4 100dvh' data-debug>
		<div class='1/1 ignore'>
			<h5 class='muted'>Flex</h5>
			<h1>Intuitive syntax.</h1>
		</div>
		<div class='1/1 lg:2/12'></div>
		<div class='1/1 lg:1/3'></div>
		<div class='1/1 lg:4/8'></div>
	</div>
	
	<div class='flex p-4 100dvh'>
		<div class='1/1 ignore d-flex column'>
			<h1><span class='muted'>02</span> Grid</h1>
			<h6 class='muted mt-a'>Eustoma Design System</h6>
		</div>
	</div>
	
	<div class='grid 2x6 p-4 100dvh' data-debug>
		<div class='1x6 ignore'>
			<h5 class='muted'>Grid</h5>
			<h1>A brand new system.</h1>
		</div>
		<div class='1x2'></div>
		<div class='1x2'></div>
		<div class='1x2'></div>
	</div>
	
	<div class='grid 8x8 p-4 100dvh' data-debug>
		<div class='4x8 ignore'>
			<h5 class='muted'>Grid</h5>
			<h1>Immersive flexibility.</h1>
		</div>
		<div class='1x4 lg:1x3'></div>
		<div class='1x4 lg:2x4 lg:@5,5'></div>
		<div class='1x8 lg:1x2'></div>
		<div class='1x8 lg:1x5 lg:@7,2'></div>
		<div class='1x8 lg:1x6 lg:@8,3'></div>
	</div>
</div>

<style>
	.debug {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		background: white;
		color: black;

		&.hidden {
			display: none;
		}
	}

	:is(.flex, .grid) {
		div:not(.ignore) {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			border-radius: 10px;
			background: #aaa;
			color: #777;
			user-select: none;
			-webkit-user-select: none;
		}
	}
</style>
