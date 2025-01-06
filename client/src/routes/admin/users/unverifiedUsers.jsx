//import { useContext } from 'react'
import UserCardVerify from '../../../components/userCardVerify'
//import { userContext } from '../../utils/contexts'
import InfiniteEntity from '../../../components/infiniteEntity'
import { url } from '../../../utils/serverUrl'
export default function UnverifiedUsers() {

  return (
    <div className="w-full">
      <InfiniteEntity
        loaderRoute={`/loaders/unverifiedUsersLoader`}
        UnitEntity={UserCardVerify}
        fetchMoreURL={url + `/users/unverified`}
      />
    </div>
  )
}
