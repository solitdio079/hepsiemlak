import { useState } from 'react'
import { stepContext } from '../../../../../utils/contexts'
import { Outlet, useLoaderData, useParams } from 'react-router-dom'
import {url} from '../../../../../utils/serverUrl'
//import ResidenceDetails from '../../../../components/listings/residenceDetails'
import Gallery from '../../../../../components/gallery'

export async function loader({ params }) {
    const { id } = params
    
    try {
        const req = await fetch(url + `/listings/residence/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentails: 'include'
        })
        const response = await req.json()
        if (!response.error) {
            sessionStorage.setItem('step-1', JSON.stringify(response.step1))
            sessionStorage.setItem('step-2', JSON.stringify(response.step2))
            sessionStorage.setItem('step-3', JSON.stringify(response.step3))
            sessionStorage.setItem('step-4', JSON.stringify(response.step4))
        } else {
            console.log(JSON.stringify(response.error))
        }
        return response
    } catch (error) {
        return {error: error.message}
    }
}

export default function EditResidence() {
    const {id} = useParams()
    const [step, setStep] = useState(1)
    const residence = useLoaderData()
    console.log(residence)
    const images = residence.step4.images.map((item) => url + '/' + item)


  return (
    <>
      <stepContext.Provider value={{ step, setStep }}>
        <div className="flex flex-col w-full">
          <ul className="steps">
            <li className={step >= 1 ? 'step step-primary' : 'step'}></li>
            <li className={step >= 2 ? 'step step-primary' : 'step'}></li>
            <li className={step >= 3 ? 'step step-primary' : 'step'}></li>
            <li className={step >= 4 ? 'step step-primary' : 'step'}></li>
            </ul>
            <Gallery images={images}/>

          <Outlet context={[id]}/>
        </div>
      </stepContext.Provider>
    </>
  )
}
