import { ColumnInterface, CrudList, CrudListQuery } from '../crud/CrudList'
import { ModelObject } from '@adonisjs/lucid/types/model'

interface ProjectIndexProps {
  projectsData: {
    meta?: any
    data: ModelObject[]
  }
  queryParams: any
  onQueryUpdate: (newQuery: CrudListQuery) => void
}

const ProjectIndex = ({ projectsData, queryParams, onQueryUpdate }: ProjectIndexProps) => {
  const columns: ColumnInterface[] = [
    {
      name: 'project.name',
      label: 'Name',
      sortable: true,
    },
    {
      name: 'project.type',
      label: 'Type',
      sortable: true,
    },
    {
      name: 'project.status',
      label: 'Status',
      sortable: true,
    },
    {
      name: 'client.name',
      label: 'Client',
      sortable: true,
    },
    {
      name: 'created_at',
      label: 'Date Created',
      sortable: true,
    },
  ]

  return (
    <>
      <CrudList
        crudData={projectsData}
        crudListQuery={queryParams}
        onQueryUpdate={onQueryUpdate}
        pathKey="projects"
        columns={columns}
      />
    </>
  )
}

export default ProjectIndex
