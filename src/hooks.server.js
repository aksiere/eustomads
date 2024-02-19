import { PUBLIC_DEFAULT_THEME } from '$env/static/public'

export const handle = async ({ event, resolve }) => {
	const theme = event.cookies.get('theme') || PUBLIC_DEFAULT_THEME

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range'
		},
		transformPageChunk: ({ html }) => html.replace('%sveltekit.theme%', theme)
	})
}
