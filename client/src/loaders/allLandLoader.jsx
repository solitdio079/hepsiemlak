import { url } from '../utils/serverUrl'

export async function loader() {
   
  const token = localStorage.getItem('token')
  const fetchHeader = token ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}: {
          'Content-Type': 'application/json',
        }  
    
    //console.log(type)
    try {
      const req = await fetch(url + `/land/index?cursor=`, {
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