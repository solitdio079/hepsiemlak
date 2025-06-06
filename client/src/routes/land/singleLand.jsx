import { useEffect } from 'react'
import { useFetcher, useParams } from 'react-router-dom'
import LandDetails from '../../components/landDetails'

export default function SingleLand() {
  const fetcher = useFetcher()
  const { id } = useParams()

  useEffect(() => {
    if (!fetcher.data) fetcher.load(`/loaders/singleLandLoader/${id}`)
  }, [fetcher.data])
  return (
    <>
      {fetcher.data ? (
        <LandDetails land={fetcher.data} />
      ) : (
        <span className="loading loading-spinner mx-auto loading-lg"></span>
      )}
    </>
  )
}
