import { Form } from "react-router-dom"
export default function Home() {
    return (
      <div
        className="hero min-h-96"
        style={{
          backgroundImage:
            'url(https://media.istockphoto.com/id/1409298953/photo/real-estate-agents-shake-hands-after-the-signing-of-the-contract-agreement-is-complete.jpg?s=612x612&w=0&k=20&c=SFybbpGMB0wIoI0tJotFqptzAYK_mICVITNdQIXqnyc=)',
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-full">
            <h1 className="mb-5 text-5xl font-bold">Sahel Immo</h1>
            <Form action={'/listings/list/homeSearch'}>
              <div className="join join-vertical lg:join-horizontal">
                <div>
                  <div>
                    <input
                      name="q"
                      className="input input-lg input-bordered join-item"
                      placeholder="Search"
                    />
                  </div>
                </div>
                <select
                  name="type"
                  className="select select-lg select-bordered join-item"
                >
                  <option disabled selected>
                    Type
                  </option>
                  <option value="Residence">Residence</option>
                  <option value="Commercial">Bureau</option>
                </select>
                <select
                  name="adType"
                  className="select select-lg select-bordered join-item"
                >
                  <option disabled selected>
                    Category
                  </option>
                  <option value="For Sale">A vendre</option>
                  <option value="For Rent">A Louer</option>
                </select>
                <div className="indicator">
                  <button className="btn btn-lg btn-primary  join-item">
                    Search
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
}