import { url } from '../utils/serverUrl'

export async function loader() {
  //console.log(type)
  try {
    const req = await fetch(url + `/projects/index?cursor=`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const response = await req.json()
    console.log(response)
    return response
  } catch (error) {
    return { error: error.message }
  }
}
