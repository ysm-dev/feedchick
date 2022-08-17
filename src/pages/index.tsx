import { useForm } from 'react-hook-form'

export const Index = () => {
  const { handleSubmit, register } = useForm()

  return (
    <div className="p-4">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit((data) => {
          console.log(data)
        })}
      >
        <input
          className="input input-bordered input-sm w-full"
          type="text"
          placeholder="RSS Feed URL"
          {...register('url1')}
        />
        <input
          className="input input-bordered input-sm w-full"
          type="text"
          placeholder="RSS Feed URL"
          {...register('url2')}
        />
        <input
          className="input input-bordered input-sm w-full"
          type="text"
          placeholder="RSS Feed URL"
          {...register('url3')}
        />
        <button className="btn btn-primary">Next</button>
      </form>
    </div>
  )
}
