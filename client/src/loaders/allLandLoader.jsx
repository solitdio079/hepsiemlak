import { url } from '../utils/serverUrl'

export async function loader({ request }) {
    const urL = new URL(request.url)

    const type = urL.searchParams.get('type')
    const country = urL.searchParams.get('country')
    const city = urL.searchParams.get('city')
    const document = urL.searchParams.get('document')
    //console.log(type)
    try {
      const req = await fetch(url + `/land/?country=${country}&city=${city}&document=${document}&type=${type}&cursor=`, {
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