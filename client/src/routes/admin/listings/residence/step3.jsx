import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { stepContext } from '../../../../utils/contexts'
import { useNavigate,Link } from 'react-router-dom'

export default function ResidenceStep3() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const { step, setStep } = useContext(stepContext)
  console.log(step)

  const onSubmit = (data) => {
    sessionStorage.setItem('step-3', JSON.stringify(data))
    setStep(4)
    navigate('/admin/listing/residence/4')
  }
    useEffect(() => {
      setStep(3)
  })
  const step3 = JSON.parse(sessionStorage.getItem('step-3')) || false

  console.log(step3)
  console.log(watch('area')) // watch input value by passing the name of it
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mx-auto w-full"
    >
      {/* register your input into the hook by invoking the "register" function */}

      {/* include validation with required or other standard HTML validation rules */}
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Nombre de chambres + Salon*</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          defaultValue={step3 ? step3.numOfRooms : '2+1'}
          {...register('numOfRooms', {
            required: true,
            pattern: /^[0-9]{1}\+[0-9]{1}$/i,
          })}
        />
        {/* errors will return when field validation fails  */}
        {errors.numOfRooms && (
          <span className="text-red-600">
            Ce champ doit etre sous forme 2+1
          </span>
        )}
      </div>
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Nombre de Toilettes*</span>
        </label>
        <input
          type="number"
          className="input input-bordered"
          defaultValue={step3 ? step3.numOfToilets : '2+1'}
          {...register('numOfToilets', { required: true, min: 0 })}
        />
        {/* errors will return when field validation fails  */}
        {errors.numOfToilets && (
          <span className="text-red-600">Veuillez remplir ce champ</span>
        )}
      </div>
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Controle Temperature*</span>
        </label>
        <input
          className="input input-bordered"
          defaultValue={step3 ? step3.heating : 'Climatisateur/Electricite'}
          {...register('heating', {
            required: true,
            pattern: /^[A-Za-z]+\/[A-Za-z]+$/i,
          })}
        />

        {/* errors will return when field validation fails  */}
        {errors.heating && (
          <span className="text-red-600">Veuillez remplir ce champ</span>
        )}
      </div>
      <div className="form-control m-1">
        <div className="form-control">
          <label className="label-text">Fourniture</label>
          <label className="label cursor-pointer">
            <span className="label-text">Non</span>
            <input
              type="radio"
              name="furnishing"
              {...register('furnishing')}
              className="radio checked:bg-red-500"
              value="No"
              defaultChecked={step3.furnishing === 'No'}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Oui</span>
            <input
              type="radio"
              {...register('furnishing')}
              name="furnishing"
              className="radio checked:bg-blue-500"
              value="Yes"
              defaultChecked={step3.furnishing === 'Yes'}
            />
          </label>
        </div>

        {/* errors will return when field validation fails  */}
        {errors.furnishing && (
          <span className="text-red-600">Veuillez remplir ce champ</span>
        )}
      </div>
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Etages*</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          defaultValue={step3 ? step3.floor : 'total/specifique'}
          {...register('floor', {
            required: true,
            pattern: /^[0-9]+\/[0-9]+$/i,
          })}
        />
        {/* errors will return when field validation fails  */}
        {errors.floor && (
          <span className="text-red-600">
          Veuillez remplir ce champ
          </span>
        )}
      </div>

      <div className="form-control mt-6 flex  flex-row justify-between">
        <Link to={'/admin/listing/residence/2'} className="btn btn-primary">
          Back
        </Link>
        <button type="submit" className="btn btn-primary">
          Next
        </button>
      </div>
    </form>
  )
}
