import { Router } from 'express' // require -> ESModules

import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()

// Controller routes
moviesRouter.get('/', MovieController.getAll)
moviesRouter.get('/:id', MovieController.getByID)
moviesRouter.post('/', MovieController.create)
moviesRouter.patch('/:id', MovieController.update)
moviesRouter.delete('/:id', MovieController.delete)
