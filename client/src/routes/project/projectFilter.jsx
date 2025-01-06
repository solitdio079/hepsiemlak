//import { useEffect } from "react"
import { useSearchParams } from 'react-router-dom'
import { url } from '../../utils/serverUrl'
//import LandCard from '../../components/landCard'
//import { userContext } from '../../utils/contexts'
import InfiniteEntity from '../../components/infiniteEntity'
import ProjectCard from '../../components/projectCard'
//import toast, {Toaster} from 'react-hot-toast'
//import listing from "../../../../server/models/listings/listing.mjs"

export default function ProjectFilter() {
  const [searchParams] = useSearchParams()
 
  const country = searchParams.get('country')

  return (
    <div className="w-full">
      <InfiniteEntity
        loaderRoute={`/loaders/projectFilterLoader?country=${country}`}
        UnitEntity={ProjectCard}
        fetchMoreURL={url + `/projects/?country=${country}&`}
      />
    </div>
  )
}
