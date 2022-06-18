const express = require('express');

const router = express.Router();
const Contact = require('../controllers/Contact');
const { validateToken } = require('../middleware/auth');
const contactValidate = require('../middleware/contactValidate');

router.post('/', validateToken, contactValidate.validateContactData, Contact.create);
router.delete('/:contactId', validateToken, Contact.destroy);
router.get('/', validateToken, Contact.findAll);
router.get('/:contactId', validateToken, Contact.findOne);

module.exports = router;
