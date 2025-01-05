import { url } from '../utils/serverUrl'
export async function loader({ params }) {
  const { id } = params
  console.log(id)
  try {
    const req = await fetch(url + `/land/${id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await req.json()
    console.log(response)
    if (response.error) return { error: response.error }
    return response
  } catch (error) {
    console.log(error)
    return { error: error.message }
  }
}
