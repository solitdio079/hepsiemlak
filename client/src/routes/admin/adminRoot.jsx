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
            <NavLink
              className={({ isActive, isPending }) =>
                isActive
                  ? ' bg-primary text-base-100'
                  : isPending
                  ? ' bg-secondary'
                  : ''
              }
              to={`/admin/profile/${user._id}`}
            >
              Profil
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive
                  ? ' bg-primary text-base-100'
                  : isPending
                  ? ' bg-secondary'
                  : ''
              }
              to="/admin/listing/residence"
            >
              <FaPlus className="w-5 h-5" /> Espace R&C
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive
                  ? ' bg-primary text-base-100'
                  : isPending
                  ? ' bg-secondary'
                  : ''
              }
              to="/admin/land/create"
            >
              <FaPlus className="w-5 h-5" /> Terrain
            </NavLink>
          </li>
        </ul>

        <Outlet />
      </div>
    )
}