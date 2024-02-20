<script>
	import { swipe } from 'svelte-gestures'
	import { onMount } from 'svelte'

	let debug = $state.frozen(false)
	let swipeOptions = $state.frozen({ timeframe: 300, minSwipeDistance: 100, touchAction: 'pan-y' })
	
	let innerHeight = $state(0)
	let scrollY = $state(0)
	let scrollHeight = $state(0)
	let currentPage = $derived(Math.round(scrollY / innerHeight) + 1)
	let maxPage = $derived(Math.round(scrollHeight / innerHeight))

	onMount(() => {
		window.addEventListener('wheel', e => e.preventDefault(), { passive: false })
		window.addEventListener('scroll', e => e.preventDefault(), { passive: false })
		window.addEventListener('pointermove', e => e.preventDefault(), { passive: false })
		window.addEventListener('pointerdown', e => e.preventDefault(), { passive: false })
		window.addEventListener('touchmove', e => e.preventDefault(), { passive: false })
		window.addEventListener('touchstart', e => e.preventDefault(), { passive: false })
		update()
	})

	const update = () => {
		innerHeight = window.innerHeight
		scrollY = window.scrollY
		scrollHeight = document.body.scrollHeight
		if (debug) console.log('values updates')
	}

	let isScrolling = $state(false)

	const onwheel = (event) => handler(event.deltaY > 0 ? 1 : -1)
	const onswipe = (event) => handler(event.detail.direction === 'top' ? 1 : event.detail.direction === 'bottom' ? -1 : null , true)

	const onscrollend = () => {
		if (debug) console.log('isScrolling: false')
		isScrolling = false
		update()
	}

	const handler = (modifier, isTouchable) => {
		if (modifier === -1 && window.scrollY === 0) return
		if (modifier === 1 && currentPage === maxPage) return

		if (!isScrolling) {
			if (debug) console.log('isScrolling: true')
			if (!isTouchable) isScrolling = true

			scrollTo({
				top: ((currentPage - 1) + 1 * modifier) * innerHeight,
				behavior: 'smooth'
			})
		}
	}
</script>

<svelte:window {onwheel} onresize={update} onscrollcapture={update} {onscrollend} />

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
		<div class='1/1 md:2/5 ignore d-flex column'>
			<h1>Eustoma</h1>
			<h5 class='muted mt-2'>Lightweight & Flexible Grid System</h5>
		</div>
		<div class='1/1 md:3/5'></div>
	</div>
	
	<div class='flex p-4 100dvh'>
		<div class='1/1 ignore d-flex column'>
			<h1><span class='muted'>01</span> Flex</h1>
			<h6 class='muted mt-a'>Eustoma Design System</h6>
		</div>
	</div>

	<div class='grid 2x1 p-4 100dvh'>
		<div class='1/1 ignore'>
			<h5 class='muted mb-2'>Flex</h5>
			<h1>Familiar system.</h1>
		</div>
		<div class='1x1 ignore'>
			<div class='flex 100h ignore' data-debug>
				<div></div>
				<div></div>
			</div>
		</div>
	</div>

	<div class='grid 2x1 p-4 100dvh'>
		<div class='1/1 ignore'>
			<h5 class='muted mb-2'>Flex</h5>
			<h1>Intuitive syntax.</h1>
		</div>
		<div class='1x1 ignore'>
			<div class='flex 100h ignore' data-debug>
				<div class='1/1 lg:2/12'></div>
				<div class='1/1 lg:1/3'></div>
				<div class='1/1 lg:4/8'></div>
			</div>
		</div>
	</div>

	<div class='grid 2x1 p-4 100dvh'>
		<div class='1/1 ignore'>
			<h5 class='muted mb-2'>Flex</h5>
			<h1>Sufficient customization.</h1>
		</div>
		<div class='1x1 flex ignore'>
			<div class='flex 100h ignore' data-debug>
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
		</div>
	</div>
	
	<div class='flex p-4 100dvh'>
		<div class='1/1 ignore d-flex column'>
			<h1><span class='muted'>02</span> Grid</h1>
			<h6 class='muted mt-a'>Eustoma Design System</h6>
		</div>
	</div>
	
	<div class='grid 2x1 p-4 100dvh'>
		<div class='1x1 ignore'>
			<h5 class='muted mb-2'>Grid</h5>
			<h1>A brand-new system.</h1>
		</div>
		<div class='1x1 100h ignore'>
			<div class='grid 1x3 100h ignore' data-debug>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</div>

	<div class='grid 2x1 p-4 100dvh'>
		<div class='1x1 ignore'>
			<h5 class='muted mb-2'>Grid</h5>
			<h1>The same paradigm.</h1>
		</div>
		<div class='1x1 ignore 100h'>
			<div class='grid 3x12 100h ignore' data-debug>
				<div class='1x12 lg:3x2'></div>
				<div class='1x12 lg:3x4'></div>
				<div class='1x12 lg:3x6'></div>
			</div>
		</div>
	</div>
	
	<div class='grid 2x1 p-4 100dvh'>
		<div class='1x1 ignore'>
			<h5 class='muted mb-2'>Grid</h5>
			<h1>But fine-grained control.</h1>
		</div>
		<div class='1x1 100h ignore'>
			<div class='grid 5x4 100h ignore' data-debug>
				<div class='2x2 lg:2x1 lg:@2,3'></div>
				<div class='2x2 lg:1x2 lg:@4,2'></div>
				<div class='3x2 lg:1x1 lg:@5,3'></div>
				<div class='3x1 lg:3x1 lg:@3,4'></div>
				<div class='lg:1x2 lg:@3,1'></div>
				<div class='lg:1x2 lg:@3,1'></div>
				<div class='lg:2x2 lg:@1,1'></div>
			</div>
		</div>
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

	h1 {
		word-break: break-word;
	}

	:is(.flex, .grid) {
		div:not(.ignore) {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			border-radius: 10px;
			background: var(--accent);
			color: color-mix(in oklab, var(--accent) 80%, black);
			user-select: none;
			-webkit-user-select: none;
		}
	}

	h5 + h1 {
		margin-top: .5rem;
	}
</style>
