//import { useContext } from 'react'
//import { useParams } from 'react-router-dom'
//import { userContext } from '../../utils/contexts'
import InfiniteEntity from '../../components/infiniteEntity'
import { url } from '../../utils/serverUrl'
import LandCard from '../../components/landCard'
//import { useEffect, useState } from 'react'
export default function LandIndex() {
  
  return (
    <div className="w-full">
      <InfiniteEntity
        loaderRoute={`/loaders/allLandLoader`}
        UnitEntity={LandCard}
        fetchMoreURL={url + `/land/?`}
      />
    </div>
  )
}
