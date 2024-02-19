import { PUBLIC_DEFAULT_THEME } from '$env/static/public'

export async function load({ cookies }) {
	const theme = cookies.get('theme') || PUBLIC_DEFAULT_THEME

	return {
		theme
	}
}
