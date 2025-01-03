//import { useEffect } from "react"
import { useSearchParams } from 'react-router-dom'
import { url } from '../../utils/serverUrl'
import LandCard from '../../components/landCar'
//import { userContext } from '../../utils/contexts'
import InfiniteEntity from '../../components/infiniteEntity'
//import toast, {Toaster} from 'react-hot-toast'
//import listing from "../../../../server/models/listings/listing.mjs"

export default function LandFilter() {
  const [searchParams] = useSearchParams()
  const document = searchParams.get('document')
  const country = searchParams.get('country')

  return (
    <div className="w-full">
      <InfiniteEntity
        loaderRoute={`/loaders/landFilterLoader?document=${document}&country=${country}`}
        UnitEntity={LandCard}
        fetchMoreURL={
          url +
          `/land/?document=${document}&country=${country}`
        }
      />
    </div>
  )
}
