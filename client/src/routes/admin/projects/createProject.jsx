import { useFetcher } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { url } from '../../../utils/serverUrl'
export async function action({ request }) {
  const formData = await request.formData()

  try {
    const req = await fetch(url + '/projects/', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: formData,
    })
    const response = await req.json()
    return response
  } catch (error) {
    return { error: error.message }
  }
}
export default function CreateProject() {
  const fetcher = useFetcher()

  useEffect(() => {
    const toastOptions = { duration: 5000 }
    fetcher.data
      ? fetcher.data.msg
        ? toast.success(fetcher.data.msg, toastOptions)
        : toast.error(fetcher.data.error, toastOptions)
      : ''
  })
  return (
    <fetcher.Form
      method="post"
      encType="multipart/form-data"
      className="flex flex-col mx-auto w-full"
    >
      <Toaster />
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Nom*</span>
        </label>
        <input
          required
          type="text"
          className="file-input file-input-bordered"
          name="name"
        />
      </div>
      
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Adresse*</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          name="location"
          pattern=" (?:Mali|Niger|Burkina Faso),{0,1}[A-Za-z]+,{0,1}[A-Za-z]+,{0,1}[A-Za-z]*,{0,1}[1-9]*"
          required
        />
        {/* errors will return when field validation fails  */}
      </div>
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Superficie(m²)*</span>
        </label>
        <input
          type="number"
          name="area"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Nombre d&apos;unite*</span>
        </label>
        <input
          type="number"
          name="numOfUnits"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Images*</span>
        </label>
        <input
          required
          type="file"
          className="file-input file-input-bordered"
          name="images"
          multiple
        />
      </div>
      <div className="form-control mt-6 flex  flex-row justify-between">
        <button type="submit" className="btn btn-primary">
          {fetcher.state === 'idle' ? (
            'Creer'
          ) : (
            <span className="loading loading-spinner"></span>
          )}
        </button>
      </div>
    </fetcher.Form>
  )
}
