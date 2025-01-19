import { useFetcher, useLoaderData } from "react-router-dom"
// import { userContext } from "../../../utils/contexts"
import { useEffect } from "react"
import { url } from "../../../utils/serverUrl"
import toast, { Toaster } from 'react-hot-toast' 
import { FaRegCircleCheck } from "react-icons/fa6"


export async function loader({ params }) {
    const { id } = params
    const token = localStorage.getItem('token') 
    const fetchHeader = token
      ? {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      : {
          'Content-Type': 'application/json',
        }
    try {
        const req = await fetch(url + `/users/${id}`, {
            method: "GET",
            mode: 'cors',
            credentials: 'include',
            headers: fetchHeader
        })
        const response = await req.json()
        if(response.error) return null
        return response
    } catch (error) {
        return {error: error.message}
    }
}

export async function action({ request, params }) {
    const {id} = params
    const formData = await request.formData()
    const name = formData.get('picture').name === '' ? false : true
    const token = localStorage.getItem('token') 
    let fetchBody = formData
    let fetchMethod = 'PUT'
    let fetchHeaders = { Authorization: `Bearer ${token}` }

    if (!name) {
        fetchBody = JSON.stringify(Object.fromEntries(formData))
        fetchHeaders = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
        fetchMethod = 'PATCH'
    }

    try {
        const req = await fetch(url + `/users/${id}`, {
            method: fetchMethod,
            mode: 'cors',
            credentials: 'include',
            headers: fetchHeaders,
            body: fetchBody

        })
        const response = await req.json()
        return response
        
    } catch (error) {
        return {error: error.message}
    }
    
    
}

export default function EditUser() {
    const fetcher = useFetcher()
    const user = useLoaderData()
    const toastOptions = {
        duration: 5000
    }
    useEffect(() => {
        fetcher.data ? fetcher.data.msg ? toast.success(fetcher.data.msg,toastOptions):toast.error(fetcher.data.error,toastOptions): ''
    },[fetcher.data])
    return (
      <>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="avatar">
            <div className="w-24 rounded-full mx-auto my-3">
              <img
                src={
                  user.picture
                    ? url + '/' + user.picture
                    : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                }
              />
            </div>
          </div>
          <fetcher.Form
            method="post"
            encType="multipart/form-data"
            className="card-body"
          >
            {user.isVerified ? (
              <FaRegCircleCheck className="text-blue-700" />
            ) : (
              ''
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="maigasory000@gmail.com"
                className="input input-bordered"
                name="email"
                defaultValue={user.email || ''}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Full Name</label>
              <input
                type="text"
                placeholder="Sory Maiga"
                className="input input-bordered"
                name="fullName"
                defaultValue={user.fullName || ''}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Phone Number</label>
              <input
                type="text"
                placeholder="+223 43 34 34 34 33"
                className="input input-bordered"
                name="phone"
                defaultValue={user.phone || ''}
                required
              />
            </div>
            <div className="form-control m-1">
              <label className="label">
                <span className="label-text">Type</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                defaultValue={user.userType}
                name="userType"
              >
                <option value="Propriétaire">Propriétaire </option>
                <option value="Banque">Banque</option>
                <option value="Agence Immobilière">Agence Immobilière</option>
                <option value="Notaire">Notaire</option>
                <option value="Architecte">Architecte</option>
              </select>

              
            </div>
            <div className="form-control">
              <label className="label">Description</label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Mes services"
                defaultValue={user.description || ''}
                name="description"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Picture</span>
              </label>
              <input
                type="file"
                name="picture"
                className="file-input w-full max-w-xs"
              />
            </div>
            <Toaster />
            <div className="form-control mt-6">
              <button className="btn btn-primary">
                {fetcher.state === 'idle' ? (
                  'update'
                ) : (
                  <span className="loading loading-spinner"></span>
                )}
              </button>
            </div>
          </fetcher.Form>
        </div>
      </>
    )
}