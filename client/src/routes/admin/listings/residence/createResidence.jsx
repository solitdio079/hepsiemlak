import { useState } from 'react'

import { stepContext } from '../../../../utils/contexts'
import { Outlet } from 'react-router-dom'
//import ResidenceDetails from '../../../../components/listings/residenceDetails'

export default function CreateResidence() {
  
    const [step, setStep] = useState(1)

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

            <Outlet />
          </div>
        </stepContext.Provider>
      </>
    )
}
