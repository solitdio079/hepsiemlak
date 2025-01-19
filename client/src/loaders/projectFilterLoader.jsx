import { url } from '../utils/serverUrl'

export async function loader({ request }) {
  const urL = new URL(request.url)

  //const document = urL.searchParams.get('document')
  const country = urL.searchParams.get('country')
 const token = localStorage.getItem('token')
 const fetchHeader = token
   ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
   : {
       'Content-Type': 'application/json',
     }  
  try {
    const req = await fetch(
      url + `/projects/?cursor=&country=${country}`,
      {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: fetchHeader,
      }
    )
    const response = await req.json()
    return response
  } catch (error) {
    return { error: error.message }
  }
}
