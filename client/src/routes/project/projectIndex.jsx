//import { useContext } from 'react'
//import { useParams } from 'react-router-dom'
//import { userContext } from '../../utils/contexts'
import InfiniteEntity from '../../components/infiniteEntity'
import { url } from '../../utils/serverUrl'
import ProjectCard from '../../components/projectCard'
//import { useEffect, useState } from 'react'
export default function ProjectIndex() {
  return (
    <div className="w-full">
      <InfiniteEntity
        loaderRoute={`/loaders/allProjectLoader`}
        UnitEntity={ProjectCard}
        fetchMoreURL={url + `/projects/?`}
      />
    </div>
  )
}
