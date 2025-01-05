import { useState } from "react"
import { Form, Link } from "react-router-dom"
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Home() {
  const [country, setCountry] = useState(null)

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
            <ul className="menu menu-horizontal border-b-2 border-white p-0 my-5">
              <li>
                <a
                  className={
                    country === 'Mali'
                      ? 'flex flex-col border-b-2 border-white rounded-none font-bold'
                      : 'flex flex-col hover:border-b-2 hover:border-white rounded-none font-bold'
                  }
                  onClick={() => {
                    setCountry('Mali')
                  }}
                >
                  <img className="w-[41px] lg:w-[85px]" src="./mali.png" />
                  Mali
                </a>
              </li>
              <li>
                <a
                  className={
                    country === 'Niger'
                      ? 'flex flex-col border-b-2 border-white rounded-none font-bold'
                      : 'flex flex-col hover:border-b-2 hover:border-white rounded-none font-bold'
                  }
                  onClick={() => {
                    setCountry('Niger')
                  }}
                >
                  <img className="w-14 lg:w-28" src="./niger.png" />
                  Niger
                </a>
              </li>
              <li>
                <a
                  className={
                    country === 'Burkina Faso'
                      ? 'flex flex-col border-b-2 border-white rounded-none font-bold'
                      : 'flex flex-col hover:border-b-2 hover:border-white rounded-none font-bold'
                  }
                  onClick={() => {
                    setCountry('Burkina Faso')
                  }}
                >
                  <img className="w-14 lg:w-28" src="./burkina.png" />
                  Burkina Faso
                </a>
              </li>
            </ul>
            <Form action={`/listings/list/homeSearch?country=${country}`}>
              <div className="join join-vertical rounded-none  lg:join-horizontal">
                <div>
                  <div>
                    <input
                      name="q"
                      className="input input-lg bg-transparent text-white input-bordered join-item"
                      placeholder="recherche..."
                    />
                  </div>
                </div>
                <select
                  name="type"
                  className="select bg-transparent text-white select-lg select-bordered join-item"
                >
                  <option value="Residence">Residence</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <select
                  name="adType"
                  className="select bg-transparent text-white select-lg select-bordered join-item"
                >
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
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
              className="w-full"
            >
              <SwiperSlide>
                <Link className="badge badge-outline">Appart à louer</Link>
              </SwiperSlide>
              <SwiperSlide>
                {' '}
                <Link className="badge badge-outline">Appart à vendre</Link>
              </SwiperSlide>
              <SwiperSlide>
                {' '}
                <Link className="badge badge-outline">Bureau à louer</Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link className="badge badge-outline">Appart à vendre</Link>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    )
}