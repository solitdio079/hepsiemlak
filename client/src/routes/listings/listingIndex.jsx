//import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import ListingCard from '../../components/listings/listingCard'
//import { userContext } from '../../utils/contexts'
import InfiniteEntity from '../../components/infiniteEntity'
import { url } from '../../utils/serverUrl'
export default function ListingIndex() {
  const { type } = useParams()
 
  return (
      <div className="w-full">
      <InfiniteEntity loaderRoute={`/loaders/allListingLoader?type=${type}`} UnitEntity={ListingCard} fetchMoreURL={url + `/listings/?type=${type}`} />
    </div>
  )
}