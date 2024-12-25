import { useEffect } from "react"
import { useFetcher, useParams } from "react-router-dom"
import ListingCard from "../../components/listings/listingCard"

export default function ListingList() {
    const fetcher = useFetcher()
    const {type} = useParams()
    useEffect(() => {
        if(!fetcher.data) fetcher.load(`/loaders/allListingLoader?type=${type}`)
    }, [fetcher.data])

    return (<div className="p-10">
        {fetcher.data ? fetcher.data.map(item => <ListingCard key={item._id} listing={item} />) : <span className="loading loading-spinner mx-auto loading-lg"></span>}
    </div>)
}