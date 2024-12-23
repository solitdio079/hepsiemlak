import { url } from '../utils/serverUrl'
export async function loader({ params }) {
    const { id } = params

    try {
        const req = await fetch(url + `/listings/${id}`, {
            method: "GET",
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await req.json()
        if(response.error) return {error: response.error}
        return response
    } catch (error) {
        return {error: error.message}
    }
}