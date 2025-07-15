/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ClientsController = () => import('#controllers/clients_controller')
const ContactsController = () => import('#controllers/contacts_controller')
const QuotesController = () => import('#controllers/quotes_controller')
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home')

router.get('clients', [ClientsController, 'index']).as('clients.index')
router.get('clients/create', [ClientsController, 'create']).as('clients.create')
router.post('clients/create', [ClientsController, 'store'])
router.get('clients/:id', [ClientsController, 'edit']).as('clients.edit')
router.post('clients/:id', [ClientsController, 'update'])
router.delete('clients/:id', [ClientsController, 'delete'])

router.get('contacts', [ContactsController, 'index']).as('contacts.index')
router.get('contacts/create', [ContactsController, 'create']).as('contacts.create')
router.post('contacts/create', [ContactsController, 'store'])
router.get('contacts/:id', [ContactsController, 'edit']).as('contacts.edit')
router.post('contacts/:id', [ContactsController, 'update'])
router.delete('contacts/:id', [ContactsController, 'delete'])

router.get('quotes', [QuotesController, 'index']).as('quotes.index')
router.get('quotes/create', [QuotesController, 'create']).as('quotes.create')
router.post('quotes/create', [QuotesController, 'store'])
router.get('quotes/:id', [QuotesController, 'edit']).as('quotes.edit')
router.post('quotes/:id', [QuotesController, 'update'])
router.post('quotes/:id/rows', [QuotesController, 'updateRows'])
router.delete('quotes/:id/rows/:rowId', [QuotesController, 'deleteRow'])
router.delete('quotes/:id', [QuotesController, 'delete'])
