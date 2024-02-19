<script>
	import '../app.scss'

	let { data } = $props()
	let { theme } = $state(data)

	const changeTheme = (value) => {
		theme = value
		document.documentElement.dataset.theme = value
		document.cookie = `theme=${value};max-age=31536000;path='/'`
	}
</script>

<!-- <form>
	<input type='radio' name='theme' checked={theme === 'dark'} onchange={() => changeTheme('dark')}>dark
	<input type='radio' name='theme' checked={theme === 'light'} onchange={() => changeTheme('light')}>light
</form> -->

<slot />
