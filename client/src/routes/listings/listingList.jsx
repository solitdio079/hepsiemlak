import { Outlet, Form, useNavigation } from "react-router-dom"
//import ListingCard from "../../components/listings/listingCard"

export default function ListingList() {
    const navigation = useNavigation()
  
    return (
      <div className=" flex flex-col lg:flex-row p-10">
        <div className="drawer lg:drawer-open z-50 lg:w-1/4">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Filtrer
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-accent text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <Form action='/listings/list/filter'>
                <li>
                  <select
                    name="type"
                    className="select m-2 select-bordered w-full max-w-xs"
                  >
                    <option value="Residence">Residence</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </li>
                <li>
                  <select
                    name="adType"
                    className="select m-2 select-bordered w-full max-w-xs"
                  >
                    <option value="For Sale">A Vendre</option>
                    <option value="For Rent">A Louer</option>
                  </select>
                </li>
                <li>
                  <select
                    name="country"
                    className="select m-2 select-bordered w-full max-w-xs"
                  >
                    <option value="Mali">Mali</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Niger">Niger</option>
                  </select>
                </li>
                <li>
                  <select
                    name="price"
                    className="select m-2 select-bordered w-full max-w-xs"
                  >
                    <option disabled selected>
                      Price
                    </option>
                    <option value="1">Asc</option>
                    <option value="-1">Desc</option>
                  </select>
                </li>
                <li>
                  <button className="btn m-2 w-full btn-primary">
                    {' '}
                    {navigation.state === 'idle' ? (
                      'Filter'
                    ) : (
                      <span className="loading loading-spinner"></span>
                    )}{' '}
                  </button>
                </li>
              </Form>
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
    )
}