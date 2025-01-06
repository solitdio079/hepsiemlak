import { url } from '../utils/serverUrl'
export async function loader({ request }) {
  const urL = new URL(request.url)

  const userType = urL.searchParams.get('userType')
  

  try {
    const req = await fetch(
      url +
        `/users/notary?cursor=&userType=${userType}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const response = await req.json()
    if (response.error) console.log('loader error', response.error)
    return response
  } catch (error) {
    return { error: error.message }
  }
}
