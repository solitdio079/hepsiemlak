export default function Home() {
    return (
      <div
        className="hero min-h-96"
        style={{
          backgroundImage:
            'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-full">
            <h1 className="mb-5 text-5xl font-bold">
              Find your ideal office with ease on Sahel Immo
            </h1>
            <div className="join join-vertical lg:join-horizontal">
              <div>
                <div>
                  <input
                    className="input input-lg input-bordered join-item"
                    placeholder="Search"
                  />
                </div>
              </div>
              <select className="select select-lg select-bordered join-item">
                <option disabled selected>
                  Type
                </option>
                <option value="Residence">Residence</option>
                <option value="Commercial">Bureau</option>
              </select>
              <select className="select select-lg select-bordered join-item">
                <option disabled selected>
                  Category
                </option>
                <option value="for sale">A vendre</option>
                <option value="for rent">A Louer</option>
              </select>
              <div className="indicator">
                <button className="btn btn-lg btn-primary join-item">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}