import { url } from '../utils/serverUrl'
export async function loader({ request }) {
  const urL = new URL(request.url)

  const userType = urL.searchParams.get('userType')
  
  const token = localStorage.getItem('token')
  const fetchHeader = token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : {
        'Content-Type': 'application/json',
      }  
  try {
    const req = await fetch(
      url +
        `/users/notary?cursor=&userType=${userType}`,
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
