import { url } from '../utils/serverUrl'
export async function loader({ request }) {
  const urL = new URL(request.url)

  const type = urL.searchParams.get('type')
  const adType = urL.searchParams.get('adType')
  const q = urL.searchParams.get('q')
  console.log(type)

  try {
    const req = await fetch(
      url +
        `/listings/homeSearch?cursor=&type=${type}&adType=${adType}&q=${q}`,
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
      console.log(response)
    return response
  } catch (error) {
    return { error: error.message }
  }
}
