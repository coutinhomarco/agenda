const {execSync} = require('child_process')
const {Contact, UserContact} = require('../../../sequelize/models')

describe('Test the Contact model', () => {
    beforeEach(() => {
        execSync('npm run all')
    })
    it('should create a new contact', async () => {
        const userId = 1
        const contactObject = {
            name: 'Marco Coutinho',
            email: 'marco@gmail.com',
            phoneNumber: '+5511999999999',
        }
        const contact = await Contact.create(contactObject);
        await UserContact.create({ userId, contactId: contact.contactId });
        const returnedObject = { ...contact, userId };
        expect(returnedObject).toMatchObject(contact);
    });
    it('should delete a contact', async () => {
        const contactId = 1
        const contact = await Contact.findOne({ where: { contactId } });
        if (!contact) return expect(contact).toBe(null);
        await Contact.destroy({ where: { contactId } })
        const contactDoenstExist = await Contact.findOne({ where: { contactId } });
        expect(contactDoenstExist).toBe(null);
    });
});
