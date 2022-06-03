const express = require('express');

const router = express.Router();
const Tasks = require('../controllers/Tasks');
const { validateBodyInfo, validateParams } = require('../middleware/tasksValidate');
const { validateToken } = require('../middleware/auth');

router.post('/:contactId', validateToken, validateBodyInfo, validateParams, Tasks.create);
router.get('/:contactId', validateToken, validateParams, Tasks.findOne);
router.delete('/:contactId', validateToken, validateParams, Tasks.destroy);

module.exports = router;
