import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { stepContext } from '../../../../../utils/contexts'
import { useNavigate, useOutletContext } from 'react-router-dom'

export default function ResidenceEditStep1() {
    const id = useOutletContext()[0]
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
    sessionStorage.setItem('step-1', JSON.stringify(data))
    setStep(2)
    navigate(`/admin/listing/edit/${id}/2`)
  }
  useEffect(() => {
    setStep(1)
  })
  const step1 = JSON.parse(sessionStorage.getItem('step-1')) || false

  console.log(watch('age')) // watch input value by passing the name of it
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mx-auto w-80"
    >
      {/* register your input into the hook by invoking the "register" function */}
      <div className="form-control m-3">
        <label className="label">
          <span className="label-text">Title*</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          defaultValue={step1 ? step1.title : 'Title'}
          {...register('title', { required: true })}
        />
        {errors.title && (
          <span className="text-red-600">
            This field is required and should only be letters.
          </span>
        )}
      </div>

      {/* include validation with required or other standard HTML validation rules */}
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Age*</span>
        </label>
        <input
          type="number"
          className="input input-bordered"
          defaultValue={step1 ? step1.age : ''}
          {...register('age', { required: true, min: 1, max: 30 })}
        />
        {/* errors will return when field validation fails  */}
        {errors.age && (
          <span className="text-red-600">
            This field is need to be between 1 and 30
          </span>
        )}
      </div>
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Usage*</span>
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          defaultValue={step1 ? step1.usage : ''}
          {...register('usage', { required: true })}
        >
          <option value="">Chosissez...</option>
          <option value="vide">Vide</option>
          <option value="occupe">Occupe</option>
        </select>

        {/* errors will return when field validation fails  */}
        {errors.usage && (
          <span className="text-red-600">This field is required</span>
        )}
      </div>
      <div className="form-control m-1">
        <label className="label">
          <span className="label-text">Location*</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          defaultValue={
            step1 ? step1.location : 'Pays,ville,district,rue,porte'
          }
          {...register('location', {
            required: true,
            pattern: /^[A-Za-z]+,[A-Za-z]+,[A-Za-z]+,[A-Za-z]+,[1-9]+$/i,
          })}
        />
        {/* errors will return when field validation fails  */}
        {errors.location && (
          <span className="text-red-600">This field is required</span>
        )}
      </div>

      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">
          Next
        </button>
      </div>
    </form>
  )
}