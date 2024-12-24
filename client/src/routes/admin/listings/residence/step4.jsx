import { useContext, useEffect } from 'react'
//import { useForm } from 'react-hook-form'
import { stepContext } from '../../../../utils/contexts'
//import { useNavigate } from 'react-router-dom'
import { useFetcher, Link } from 'react-router-dom'

import toast, { Toaster } from 'react-hot-toast'
import { url } from '../../../../utils/serverUrl'


export async function action({ request }) {
    const formData = await request.formData()
    const step1 = JSON.parse(sessionStorage.getItem('step-1')) || null
    const step2 = JSON.parse(sessionStorage.getItem('step-2')) || null
    const step3 = JSON.parse(sessionStorage.getItem('step-3')) || null
    if(!step1 || !step2 || !step3) return
    const totalStep = { ...step1, ...step2, ...step3 }
    
    for (const key in totalStep) {
        if (totalStep[key]) {
            formData.append(key, totalStep[key])
        }
    }

    try {
        const req = await fetch(url + "/listings/residence/", {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            body: formData
        })
        const response = await req.json()
        console.log(response)
        return response
    } catch (error) {
        return {error: error.message}
    }
    
    //return {error: "Not submitted yet"}
   

}

export default function ResidenceStep4() {
    const fetcher = useFetcher()
    

  const { step, setStep } = useContext(stepContext)
  console.log(step)

    const toastOptions = {
      duration: 5000
  }
    useEffect(() => {
      fetcher.data ? fetcher.data.msg ? toast.success(fetcher.data.msg, toastOptions): toast.error(fetcher.data.error, toastOptions): ''
    if (step !== 4) setStep(4)
  }, [fetcher.data])
  
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
        ></textarea>
      </div>

      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">State*</span>
        </label>
        <select className="select select-bordered w-full max-w-xs" required>
          <option>
            old
          </option>
          <option>Second Hand</option>
          <option>New</option>
        </select>
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
        <Link to={'/admin/listing/residence/3'} className="btn btn-primary">
          Back
        </Link>
        <button type="submit" className="btn btn-primary">
          {fetcher.state === "idle" ? 'Submit': <span className='loading loading-spinner'></span>}
              </button>
              <Toaster/>
      </div>
    </fetcher.Form>
  )
}
