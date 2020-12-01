const router = require('express').Router()
const TaskController = require('../controllers/taskController')

router.get('/', TaskController.getTask)
router.post('/', TaskController.createTask)
router.get('/:id', TaskController.getById)
router.put('/:id', TaskController.put)
router.patch('/:id', TaskController.patch)
router.delete('/:id', TaskController.remove)
module.exports = router