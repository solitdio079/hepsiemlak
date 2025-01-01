//import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import ListingCard from '../../components/listings/listingCard'
//import { userContext } from '../../utils/contexts'
import InfiniteEntity from '../../components/infiniteEntity'
import { url } from '../../utils/serverUrl'
import { useEffect, useState } from 'react'
export default function ListingIndex() {
    const { type } = useParams()
    const [loaderRoute, setLoaderRoute] = useState(
      `/loaders/allListingLoader?type=${type}`
    ) 
    useEffect(() => {
      type ? setLoaderRoute(`/loaders/allListingLoader?type=${type}`): ''
  },[type])
  return (
      <div className="w-full">
      <InfiniteEntity loaderRoute={loaderRoute} UnitEntity={ListingCard} fetchMoreURL={url + `/listings/?type=${type}`} />
    </div>
  )
}