import { url } from '../utils/serverUrl'
export async function loader({ params }) {
    const { id } = params
   const token = localStorage.getItem('token')
   const fetchHeader = token
     ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
     : {
         'Content-Type': 'application/json',
       }  
    try {
        
        const req = await fetch(url + `/listings/${id}`, {
            method: "GET",
            mode: 'cors',
            credentials: 'include',
            headers: fetchHeader
        })
 
        const response = await req.json()
        console.log(response)
        if(response.error) return {error: response.error}
        return response
    } catch (error) {
        console.log(error);
        return {error: error.message}
    }
}