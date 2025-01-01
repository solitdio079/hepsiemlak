import { url } from "../utils/serverUrl"
export async function loader({ request }) {
  const urL = new URL(request.url)

  const type = urL.searchParams.get('type')
  const adType = urL.searchParams.get('adType')
  const country = urL.searchParams.get('country')
  const price = urL.searchParams.get('price')
  console.log(type)

  try {
    const req = await fetch(
      url +
        `/listings/filter?cursor=&type=${type}&price=${price}&adType=${adType}&country=${country}`,
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