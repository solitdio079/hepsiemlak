import { url } from '../utils/serverUrl'
export async function loader({ request }) {
  const urL = new URL(request.url)

  const type = urL.searchParams.get('type')
  const adType = urL.searchParams.get('adType')
  const country = urL.searchParams.get('country')
  const q = urL.searchParams.get('q')
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
        `/listings/homeSearch?cursor=&type=${type}&adType=${adType}&q=${q}&country=${country}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: fetchHeader,
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
