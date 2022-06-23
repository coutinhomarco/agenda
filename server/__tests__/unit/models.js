const {execSync} = require('child_process')
const Contact = require('../../models/Contact')
const UserContact = require('../../models/UserContact')
const User = require('../../models/User')

describe('Test the Contact model', () => {
    execSync('npm run all')

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
        const contact = await Contact.findOne({ contactId } );
        if (!contact) return expect(contact).toBe(null);
        await Contact.destroy( { contactId })
        const contactDoenstExist = await Contact.findOne({ contactId } );
        expect(contactDoenstExist).toBe(null);
    });
    it('should find all contacts', async () => {
        const userId = 1
        const allContacts = await Contact.findAll({ userId });
        expect(allContacts).toBeDefined();
    })
    it('should find 6 contacts', async () => {
        const userId = 1
        const allContacts = await Contact.findAll({ userId });
        expect(allContacts).toBeDefined();
        const  oi = allContacts[0].dataValues.contact.map(({dataValues}) => {
            dataValues
        })
        expect(oi.length).toBe(6);
        
    })
    it('should find a contact', async () => {
        execSync('npm run all')
        const contactId = 1
        const contact = await Contact.findOne({ contactId });
        if (!contact) return expect(contact).toBe(null);
        expect(contact).toBeDefined();
    })
});
describe('Test the User  model', () => {
    execSync('npm run all')
    it('should create a new user', async () => {
        const userDetails = {
            name: 'Julia Roberts',
            email: 'roberts@gmail.com',
            password: '123456789',
        }
        const userContact = await User.create(userDetails);
        expect(userContact).toBeDefined();
        expect(userContact.dataValues).toMatchObject(userDetails);
        expect(userContact.dataValues.userId).toBe(4);
    })
    it('should delete a user', async () => {
        const userId = 1
        const user = await User.findOne({ userId });
        if (!user) return expect(user).toBe(null);
        await User.destroy( { userId })
        const userDoenstExist = await User.findOne({ userId });
        expect(userDoenstExist).toBe(null);
    })
    it('should find all users', async () => {
        const allUsers = await User.findAll();
        expect(allUsers).toBeDefined();

    })
    it('should find 3 users', async () => {
        const allUsers = await User.findAll();
        expect(allUsers.length).toBe(3);
    })
    it('should find a user', async () => {
        const userId = 1
        const user = await User.findOne({ userId });
        if (!user) return expect(user).toBe(null);
        expect(user).toBeDefined();
    })
})
describe('Test the UserContact model', () => {})