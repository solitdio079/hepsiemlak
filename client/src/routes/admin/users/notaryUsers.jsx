//import { useContext } from 'react'
import { useParams } from 'react-router-dom'
//import ListingCard from '../../components/listings/listingCard'
//import { userContext } from '../../utils/contexts'
import InfiniteEntity from '../../../components/infiniteEntity'
import { url } from '../../../utils/serverUrl'
import { useEffect, useState } from 'react'
import NotaryCard from '../../../components/notaryCard'
export default function NotaryIndex() {
  const { userType } = useParams()
  const [loaderRoute, setLoaderRoute] = useState(
    `/loaders/notaryUsersLoader?userType=${userType}`
  )
  useEffect(() => {
    userType
      ? setLoaderRoute(`/loaders/notaryUsersLoader?userType=${userType}`)
      : ''
  }, [userType])
  return (
    <div className="w-full">
      <InfiniteEntity
        loaderRoute={loaderRoute}
        UnitEntity={NotaryCard}
        fetchMoreURL={url + `/users/notary?userType=${userType}`}
      />
    </div>
  )
}
