import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { userContext } from "../../utils/contexts"
import { useContext, useEffect } from "react"
import { FaPlus } from "react-icons/fa6"
export default function AdminRoot() {
    const user = useContext(userContext)
    const navigate = useNavigate()
    useEffect(() => {
        if(!user) navigate("/login")
    })
    return (
      <div className="flex flex-col items-center lg:items-start lg:flex-row p-10">
        <ul className="menu menu-horizontal lg:w-1/4 lg:menu-vertical bg-base-200 rounded-box m-5">
          <li>
            <NavLink to={`/admin/profile/${user._id}`}>Profile</NavLink>
          </li>
         
          <li>
            <NavLink to="/admin/listing/residence"><FaPlus/> Annonce</NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    )
}