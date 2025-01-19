import { url } from '../utils/serverUrl'
export async function loader() {
   const token = localStorage.getItem('token')
   const fetchHeader = token
     ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
     : {
         'Content-Type': 'application/json',
       }  
  try {
    const req = await fetch(url + `/users/unverified?cursor=`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: fetchHeader,
    })
    const response = await req.json()
    console.log(response)
    return response
  } catch (error) {
    return { error: error.message }
  }
}
