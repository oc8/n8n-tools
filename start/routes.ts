/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import MermaidController from '#controllers/mermaid_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/mermaid/validate', [MermaidController, 'validate'])
