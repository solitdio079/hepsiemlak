import { url } from "../../../utils/serverUrl"

export async function action({ params, request }) {
    const formData = await request.formData()
    const { id } = params 
    
    try {
        const req = await fetch(url + `/users/verifySubmit/${id}`, {
            method: "PATCH",
            mode: "cors",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        })
        const response = await req.json()
        return response
    } catch (error) {
        return {error: error.message}
    }
}