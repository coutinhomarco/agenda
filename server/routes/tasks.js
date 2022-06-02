const express = require('express');

const router = express.Router();
const Tasks = require('../controllers/Tasks');
const { validateToken } = require('../middleware/auth');

router.post('/', validateToken, Tasks.create);

module.exports = router;
