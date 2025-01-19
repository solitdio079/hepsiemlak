import { useContext, useEffect } from 'react'
//import { useForm } from 'react-hook-form'
import { stepContext } from '../../../../../utils/contexts'
//import { useNavigate } from 'react-router-dom'
import { useFetcher, Link, useOutletContext } from 'react-router-dom'

import toast, { Toaster } from 'react-hot-toast'
import { url } from '../../../../../utils/serverUrl'

export async function action({ request, params }) {
    const formData = await request.formData()
  const { id } = params
  let fetchUrl = url + `/listings/residence/${id}`
  const step1 = JSON.parse(sessionStorage.getItem('step-1')) || null
  const step2 = JSON.parse(sessionStorage.getItem('step-2')) || null
  const step3 = JSON.parse(sessionStorage.getItem('step-3')) || null
  if (!step1 || !step2 || !step3) return
    const totalStep = { ...step1, ...step2, ...step3 }
    for (const key in totalStep) {
      if (totalStep[key] && !formData.get(key)) {
        formData.set(key, totalStep[key])
      }
    }
   
   if (step1.type === 'Commercial') {
     fetchUrl = url + `/listings/commercial/${id}`
   }
   
    let fetchMethod = "PUT"
    const token = localStorage.getItem('token')
    let fetchHeaders = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : { }
    let fetchBody = formData
    //console.log(fetchBody.get("numOfRooms"))
    const name = Boolean(formData.get('images').name)
    if (!name) {
        fetchMethod = "PATCH"
        fetchHeaders = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
        fetchBody = JSON.stringify(Object.fromEntries(formData))
        console.log('Fetch Body: ' + fetchBody)
    }

  try {
    //console.log('Fetch Body', Object.fromEntries(fetchBody))
     const req = await fetch(fetchUrl, {
       method: fetchMethod,
         mode: 'cors',
      headers: fetchHeaders,
      credentials: 'include',
       body: fetchBody,
     })
     const response = await req.json()
     console.log(JSON.stringify(response))
   return response
   } catch (error) {
     return { error: error.message }
   }

  //return {error: "Not submitted yet"}
}

export default function ResidenceEditStep4() {
    const id = useOutletContext()[0]
  const fetcher = useFetcher()

  const { step, setStep } = useContext(stepContext)
  console.log(step)

  const toastOptions = {
    duration: 5000,
  }
  useEffect(() => {
    fetcher.data
      ? fetcher.data.msg
        ? toast.success(fetcher.data.msg, toastOptions)
        : toast.error(fetcher.data.error, toastOptions)
      : ''
    if (step !== 4) setStep(4)
  }, [fetcher.data])
    
  const step4 = JSON.parse(sessionStorage.getItem('step-4')) || false
  //const step1 = JSON.parse(sessionStorage.getItem('step-1')) || false

  return (
    <fetcher.Form
      method="post"
      encType="multipart/form-data"
      className="flex flex-col mx-auto w-80"
    >
      {/* register your input into the hook by invoking the "register" function */}

      {/* include validation with required or other standard HTML validation rules */}
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Description"
          name="description"
          defaultValue={step4 ? step4.description : '2+1'}
        ></textarea>
      </div>

      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">State*</span>
        </label>
        <select
          defaultValue={step4 ? step4.state : ''}
          className="select select-bordered w-full max-w-xs"
          required
          name="state"
        >
          <option value="old">old</option>
          <option value="second Hand">Second Hand</option>
          <option value="New">New</option>
        </select>
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
        <Link to={`/admin/listing/edit/${id}/3`} className="btn btn-primary">
          Back
        </Link>
        <button type="submit" className="btn btn-warning">
          {fetcher.state === 'idle' ? (
            'Edit'
          ) : (
            <span className="loading loading-spinner"></span>
          )}
        </button>
        <Toaster />
      </div>
    </fetcher.Form>
  )
}
