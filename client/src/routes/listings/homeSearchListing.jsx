import { useEffect, useState } from "react"
import { useSearchParams } from 'react-router-dom'
import { url } from '../../utils/serverUrl'
import ListingCard from '../../components/listings/listingCard'
//import { userContext } from '../../utils/contexts'
import InfiniteEntity from '../../components/infiniteEntity'

//import toast, {Toaster} from 'react-hot-toast'
//import listing from "../../../../server/models/listings/listing.mjs"

export default function HomeSearchListing() {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')
  const adType = searchParams.get('adType')
    const q      = searchParams.get('q')
  console.log(type)
   const [loaderRoute, setLoaderRoute] = useState(
    `/loaders/homeSearchLoader?type=${type}&adType=${adType}&q=${q}`
   )
   useEffect(() => {
     type
       ? setLoaderRoute(
           `/loaders/homeSearchLoader?type=${type}&adType=${adType}&q=${q}`
         )
       : ''
   }, [type])
  return (
    <div className="w-full">
      <InfiniteEntity
        loaderRoute={loaderRoute}
        UnitEntity={ListingCard}
        fetchMoreURL={
          url + `/listings/homeSearch?type=${type}&adType=${adType}&q=${q}`
        }
      />
    </div>
  )
}
