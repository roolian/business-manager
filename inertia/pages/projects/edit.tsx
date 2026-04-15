import Client from '#models/client'
import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'
import ProjectForm from '../../app/components/forms/ProjectForm'
import type { InferPageProps } from '@adonisjs/inertia/types'

type PageClientProjectProps = {
  project: any
  clients: Client[]
}

export default function Edit({ project, clients }: PageClientProjectProps) {
  function handleSubmit(values: any) {
    router.put(`/projects/${project.id}`, values, {
      onSuccess: () => toast.success('Projet mis à jour avec succès'),
      onError: () => toast.error('Vérifiez les données'),
    })
  }

  return (
    <div className="page-content">
      <h1 className="text-2xl font-semibold mb-6">Modifier le Projet</h1>
      <ProjectForm project={project} onSubmit={handleSubmit} clients={clients} />
    </div>
  )
}
