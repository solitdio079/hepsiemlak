/* eslint-disable react/prop-types */
import { url } from "../utils/serverUrl"

// import { userContext } from "../../../utils/contexts"
import { FaPhone, FaWhatsapp } from 'react-icons/fa6'
import { RiVerifiedBadgeFill } from 'react-icons/ri'


export default function NotaryCard({ listing }) {
    const user = listing
    return (
      <>
        <div className="card bg-base-100 flex justify-center w-full  items-center max-w-sm shrink-0 shadow-2xl">
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
          <form
            method="post"
            encType="multipart/form-data"
            className="card-body"
          >
            <span className="flex flex-col items-center justify-center">
              {user.fullName}{' '}
              {user.isVerified ? (
                <div className="flex">
                  <RiVerifiedBadgeFill className="text-blue-700 m-2 w-5 h-5" />
                  Verifié
                </div>
              ) : (
                ''
              )}
            </span>

            <div className="form-control">
              <input
                type="text"
                placeholder="+223 43 34 34 34 33"
                className="input input-bordered"
                defaultValue={user.phone || ''}
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">Services</label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Mes services"
                defaultValue={user.description || ''}
                readOnly
              ></textarea>
            </div>
          </form>
          <div className="card-actions">
            {user.phone ? (
              <>
                <a
                  href={`https://wa.me/${user.phone || 22300000000}`}
                  className="btn bg-green-600"
                >
                  <FaWhatsapp /> Message
                </a>
                <a
                  href={`tel:${user.phone || 22300000000}`}
                  className="btn btn-primary"
                >
                  <FaPhone className="h-5 w-5" /> Appeler
                </a>
              </>
            ) : (
              <a
                href={`https://wa.me/22300000000`}
                className="btn bg-green-600"
              >
                <FaWhatsapp /> Message
              </a>
            )}
          </div>
        </div>
      </>
    )
}