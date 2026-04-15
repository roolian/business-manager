import { Head, router } from '@inertiajs/react'
import type { InferPageProps } from '@adonisjs/inertia/types'
import ProjectsController from '#controllers/projects_controller'
import ProjectIndex from '../../app/components/list/ProjectIndex'
import { CrudListQuery } from '../../app/components/crud/CrudList'

export default ({ projectsData, queryParams }: InferPageProps<ProjectsController, 'index'>) => {
  const onQueryUpdate = (newQuery: CrudListQuery) => {
    router.get('/projects', { ...newQuery }, { only: ['projectsData'], preserveState: true })
  }

  return (
    <>
      <Head title="Projects" />
      <div className="page-content">
        <h1 className="text-lg mb-5">Projects</h1>

        <ProjectIndex
          projectsData={projectsData}
          queryParams={queryParams}
          onQueryUpdate={onQueryUpdate}
        />
      </div>
    </>
  )
}
