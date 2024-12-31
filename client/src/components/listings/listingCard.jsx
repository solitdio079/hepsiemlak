/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaClock, FaLocationDot, FaMapLocation, FaMapPin } from 'react-icons/fa6'
import {url} from '../../utils/serverUrl'
import { Link, Form, useFetcher } from 'react-router-dom'
export default function ListingCard({ listing, user }) {
    const fetcher = useFetcher() 
    return (
      <div className="card lg:card-side bg-base-100 shadow-xl m-5">
        <figure>
          {' '}
          <Link to={`/listings/single/${listing._id}`}>
            <img
              src={
                url + '/' + listing.images[0] ||
                'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp'
              }
              className="max-h-96"
              alt="listing"
            />{' '}
          </Link>
        </figure>

        <div className="card-body">
          <div className="flex flex-row justify-between w-full">
            <h2 className="card-title text-xl">
              {listing.price} Franc CFA <FaClock className="text-primary" />{' '}
            </h2>
            <p className="m-2">{listing.updatedAt.split('T')[0]}</p>
          </div>

          <p>{listing.title}</p>
          <p>
            {listing.adType} | {listing.area.gross} m² | {listing.age} years old
          </p>
          <p className="flex flex-row">
            <FaLocationDot className="h-4 m-1" />
            {listing.location.country}, {listing.location.city},
            {listing.location.district},{listing.location.street},
            {listing.location.door}
          </p>

          <div className="flex flex-col justify-end">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img
                  src={
                    url + '/' + listing.owner.picture ||
                    'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                  }
                />
              </div>
            </div>
            {listing.owner.name}
          </div>

          <div className="card-actions justify-end">
            {user && user.isAdmin ? (
              <>
                {' '}
                <fetcher.Form method="post" action={`/listings/delete/${listing._id}`}>
                  <button className="btn bg-red-500"> {fetcher.state === 'idle' ?'Delete' :<span className="loading loading-spinner loading-md"></span>} </button>
                </fetcher.Form>
                <Link
                  className="btn btn-warning"
                  to={`/admin/listing/edit/${listing._id}`}
                >
                  Edit
                </Link>
              </>
            ) : (
              ''
            )}

            <button className="btn btn-primary">Message</button>
          </div>
        </div>
      </div>
    )
}