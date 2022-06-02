const express = require('express');

const router = express.Router();
const Tasks = require('../controllers/Tasks');
const { validateBodyInfo, validateParams } = require('../middleware/tasksValidate');
const { validateToken } = require('../middleware/auth');

router.post('/:contactId', validateToken, validateBodyInfo, validateParams, Tasks.create);
router.get('/:contactId', validateToken, validateParams, Tasks.findOne);

module.exports = router;
