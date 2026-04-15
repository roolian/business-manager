import { Head } from '@inertiajs/react'
import type { InferPageProps } from '@adonisjs/inertia/types'
import Client from '#models/client'
import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'
import ProjectForm from '../../app/components/forms/ProjectForm'

type PageClientProjectProps = {
  clients: Client[]
}

export default function Create({ clients }: PageClientProjectProps) {
  function handleSubmit(values: any) {
    router.post('/projects/create', values, {
      onSuccess: () => toast.success('Projet créé avec succès'),
      onError: () => toast.error('Vérifiez les données'),
    })
  }

  return (
    <>
      <Head title="Create Project" />
      <div className="page-content">
        <h1 className="text-2xl font-semibold mb-6">Nouveau Projet</h1>
        <ProjectForm onSubmit={handleSubmit} clients={clients} />
      </div>
    </>
  )
}
