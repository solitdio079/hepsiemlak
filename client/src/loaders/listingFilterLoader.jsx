import { url } from "../utils/serverUrl"
export async function loader({ request }) {
  const urL = new URL(request.url)

  const type = urL.searchParams.get('type')
  const adType = urL.searchParams.get('adType')
  const country = urL.searchParams.get('country')
  const price = urL.searchParams.get('price')
  console.log(type)
  const token = localStorage.getItem('token')
  const fetchHeader = token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : {
        'Content-Type': 'application/json',
      }  
  try {
    const req = await fetch(
      url +
        `/listings/filter?cursor=&type=${type}&price=${price}&adType=${adType}&country=${country}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: fetchHeader,
      }
    )
    const response = await req.json()
    if (response.error) console.log('loader error', response.error)
    return response
  } catch (error) {
    return { error: error.message }
  }
}
