import { url } from '../utils/serverUrl'

export async function loader({ request }) {
  const urL = new URL(request.url)

  //const document = urL.searchParams.get('document')
  const country = urL.searchParams.get('country')

  try {
    const req = await fetch(
      url + `/projects/?cursor=country=${country}`,
      {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const response = await req.json()
    return response
  } catch (error) {
    return { error: error.message }
  }
}
