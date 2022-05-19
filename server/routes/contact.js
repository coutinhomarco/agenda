const express = require('express')
const router = express.Router()
const Contact = require('../controllers/Contact');
const {validateToken} = require('../middleware/auth.js');
const contactValidate = require('../middleware/contactValidate');

router.post('/', validateToken, contactValidate.validateContactData, Contact.create);
router.delete('/:contactId',  validateToken, Contact.destroy);
router.get('/', validateToken, Contact.findAll);

module.exports = router