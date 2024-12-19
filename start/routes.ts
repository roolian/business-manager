/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ClientsController = () => import('#controllers/clients_controller')
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home')

router.get('clients', [ClientsController, 'index']).as('clients.index')
router.get('clients/create', [ClientsController, 'create']).as('clients.create')
router.post('clients/create', [ClientsController, 'store'])
router.get('clients/:id', [ClientsController, 'edit']).as('clients.edit')
router.post('clients/:id', [ClientsController, 'update'])
router.delete('clients/:id', [ClientsController, 'delete'])
