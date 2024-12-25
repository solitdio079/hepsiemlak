import { useEffect } from "react"
import { useFetcher, useParams } from "react-router-dom"
import ResidenceDetails from "../../components/listings/residenceDetails"


export default function SingleListing() {
    const fetcher = useFetcher()
    const {id} = useParams()
    
    useEffect(() => {
        if(!fetcher.data) fetcher.load(`/loaders/singleListingLoader/${id}`)
    },[fetcher.data])
    return (
      <>
        {fetcher.data ? (
          <ResidenceDetails listing={fetcher.data} />
        ) : (
          <span className="loading loading-spinner mx-auto loading-lg"></span>
        )}
      </>
    )
}