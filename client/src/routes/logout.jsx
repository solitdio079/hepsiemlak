import { redirect } from 'react-router-dom'
import { url } from '../utils/serverUrl'
export async function action() {
  try {
    const req = await fetch(url + '/auth/logout', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const response = await req.json()
    if (response.error) {
      console.log(response.error)
      return redirect('/')
    }
    return redirect('/login')
  } catch (error) {
    console.log(`Error Message: ${error.message}`)
  }
}
