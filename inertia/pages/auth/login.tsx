import { Head, useForm } from '@inertiajs/react'
import { Button, Label, TextInput, Alert } from 'flowbite-react'
import { FormEventHandler } from 'react'

function Login() {
  const { data, setData, post, processing, errors } = useForm<{
    email: string
    password: string
  }>({
    email: '',
    password: '',
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <>
      <Head title="Connexion" />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Connexion
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {(errors as any).credentials && (
              <Alert color="failure">
                {(errors as any).credentials}
              </Alert>
            )}
            <div className="rounded-md border p-8 space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  color={errors.email ? 'failure' : undefined}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  color={errors.password ? 'failure' : undefined}
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={processing}
              >
                Se connecter
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

Login.layout = (page: React.ReactNode) => page

export default Login
