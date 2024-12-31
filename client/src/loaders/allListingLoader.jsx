import { url } from "../utils/serverUrl"
export async function loader({ request }) {
    const urL = new URL(request.url)

    const type = urL.searchParams.get("type")
    console.log(type)

    try {
        const req = await fetch(url + `/listings/?type=${type}&cursor=`, {
            method: "GET", mode: 'cors', credentials: 'include', headers: {
            'Content-Type': 'application/json'
            }
        })
        const response = await req.json()
        console.log(response)
        return response 
    } catch (error) {
        return {error: error.message}
    }
    
}