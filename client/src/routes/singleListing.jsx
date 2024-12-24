import { useEffect } from "react"
import { useFetcher, useParams } from "react-router-dom"


export default function SingleListing() {
    const fetcher = useFetcher()
    const {id} = useParams()
    useEffect(() => {
        if(!fetcher.data) fetcher.load(`/loaders/single/${id}`)
    })
    return (<>
        {fetcher.data ?  <div className="flex flex-col lg:flex-row"></div> : <span className="loading loading-spinner loading-lg"></span>}
    </>)
}