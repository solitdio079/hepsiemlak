import { url } from '../utils/serverUrl'

export async function loader() {
  //console.log(type)
   const token = localStorage.getItem('token')
   const fetchHeader = token
     ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
     : {
         'Content-Type': 'application/json',
       }  
  try {
    const req = await fetch(url + `/projects/index?cursor=`, {
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
