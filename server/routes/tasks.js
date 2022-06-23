const express = require('express');

const router = express.Router();
const Tasks = require('../controllers/Tasks');
const { validateBodyInfo, validateParams } = require('../middleware/tasksValidate');
const { validateToken } = require('../middleware/auth');

router.post('/search', validateToken, Tasks.findByQuery);

router.get('/', validateToken, Tasks.findAll);

router.post('/:contactId', validateToken, validateBodyInfo, validateParams, Tasks.create);

router.get('/:contactId', validateToken, validateParams, Tasks.findOne);

router.delete('/:contactId', validateToken, validateParams, Tasks.destroy);

router.put('/:contactId', validateToken, validateBodyInfo, validateParams, Tasks.update);

module.exports = router;
