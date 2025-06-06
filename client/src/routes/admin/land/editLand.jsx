import { useFetcher, useLoaderData } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { url } from '../../../utils/serverUrl'
import Gallery from '../../../components/gallery'
export async function action({ params, request }) {
    const formData = await request.formData()
    const { id } = params
  let fetchMethod = 'PUT'
  const token = localStorage.getItem("token")
    let fetchHeaders =token ?  { Authorization: `Bearer ${token}` }: {}
    let fetchBody = formData
    if (formData.get('images').name === '') {
          fetchMethod = 'PATCH'
          fetchHeaders = token
            ? {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              }
            : { 'Content-Type': 'application/json' }
          fetchBody = JSON.stringify(Object.fromEntries(formData))
    }

  try {
    const req = await fetch(url + `/land/${id}`, {
      method: fetchMethod,
      mode: 'cors',
        credentials: 'include',
        headers: fetchHeaders,
        body: fetchBody,
    })
    const response = await req.json()
    return response
  } catch (error) {
    return { error: error.message }
  }
}
export async function loader({ params }) {
    const { id } = params 
    try {
        const req = await fetch(url + `/land/${id}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await req.json()
        console.log(response)
        return response
    } catch (error) {
        return console.error(error.message)
    }
    
}


export default function EditLand() {
  const fetcher = useFetcher()
  const land = useLoaderData()
  useEffect(() => {
    const toastOptions = { duration: 5000 }
    fetcher.data
      ? fetcher.data.msg
        ? toast.success(fetcher.data.msg, toastOptions)
        : toast.error(fetcher.data.error, toastOptions)
      : ''
  })
    return (
        <> 
            <Gallery images={land.images.map(item => url + "/" + item)} />
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
          defaultValue={land.name}
          className="file-input file-input-bordered"
          name="name"
        />
      </div>
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Type de document*</span>
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          name="document"
          defaultValue={land.document}
          required
        >
          <option value="Titre Foncier">Titre Foncier</option>
          <option value="Permit d'occupe">Permit d&apos;occupe</option>
          <option value="Lettre d'Attribution">
            Lettre d&apos;Attribution
          </option>
        </select>
      </div>
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Adresse*</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          defaultValue={
            land.location.country +
            ',' +
            land.location.city +
            ',' +
            land.location.district +","+land.location.street+","+land.location.door
          }
          name="location"
          pattern="(Mali|Niger|Burkina Faso),{0,1}[A-Za-z]+,{0,1}[A-Za-z]+,{0,1}[A-Za-z]*,{0,1}[1-9]*"
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
                  defaultValue={land.area}
          name="area"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Prix(Franc CFA)*</span>
        </label>
        <input
                  type="number"
                  defaultValue={land.price}
          name="price"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Images*</span>
        </label>
        <input
          
          type="file"
          className="file-input file-input-bordered"
          name="images"
          multiple
        />
      </div>
      <div className="form-control mt-6 flex  flex-row justify-between">
        <button type="submit" className="btn btn-warning">
          {fetcher.state === 'idle' ? (
            'Modifier'
          ) : (
            <span className="loading loading-spinner"></span>
          )}
        </button>
      </div>
            </fetcher.Form>
        </>
  )
}
