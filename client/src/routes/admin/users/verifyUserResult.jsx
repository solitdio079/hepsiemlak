import { url } from "../../../utils/serverUrl"

export async function action({ params, request }) {
    const formData = await request.formData()
    const { id } = params 
    const token = localStorage.getItem('token')
    const fetchHeader = token
      ? {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      : {
          'Content-Type': 'application/json',
        }
    try {
        const req = await fetch(url + `/users/verifyResult/${id}`, {
            method: "PATCH",
            mode: "cors",
            credentials: 'include',
            headers: fetchHeader,
            body: JSON.stringify(Object.fromEntries(formData))
        })
        const response = await req.json()
        return response
    } catch (error) {
        return {error: error.message}
    }
}