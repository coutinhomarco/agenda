const {execSync} = require('child_process')
const User = require('../controllers/User')
const Contact = require('../controllers/Contact')

describe('Test the Contact controller', () => {
    it('should create a new contact', async () => {
        const body = {name: 'Ana Luisa', email:'ana@gmail.com', phoneNumber: '987654321', userId: 1}

        const req = {
            body
        }

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        }

        const next = jest.fn();

        const newContact = await Contact.create(req, res, next)

        expect(res.json).toBeDefined()

        expect(res.status).toBeDefined()
        
        expect(newContact).toBeDefined()
    })
    it('should delete a contact', async () => {

        const req = jest.fn();

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        }

        const next = jest.fn();

        req.params = {contactId: 1}

        req.tokenData = {userId: 1}

        await Contact.destroy(req, res, next)

        expect(res.json).toBeDefined()

        expect(res.status).toBeDefined()
    })
    it('should find all contacts', async () => {
            
            const req = jest.fn();
    
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(() => res),
            }

            const next = jest.fn();

            req.tokenData = {userId: 1}

            const contacts = await Contact.findAll(req, res, next)

            expect(res.json).toBeDefined()

            expect(res.status).toBeDefined()

            expect(contacts).toBeDefined()
    })
    it('should find a contact', async () => {
        const req = jest.fn();
    
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        }

        const next = jest.fn();

        req.params = {contactId: 1}

        const contact = await Contact.findOne(req, res, next)

        expect(res.json).toBeDefined()

        expect(res.status).toBeDefined()

        expect(contact).toBeDefined()
    })
})

describe('Test the User controller', () => {
    it('should create a new user', async () => {
        const req = {
            body: {
                name: 'Ana Luisa',
                email: 'analuisa@gmail.com',
                password: '12345678'
            }
        }

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        }

        const next = jest.fn();

        const newUser = await User.create(req, res, next)

        expect(res.json).toBeDefined()

        expect(res.status).toBeDefined()

        expect(newUser).toBeDefined()
    })

    it('should login a user', async () => {
        const req = {
            body: {
                email: 'marco@gmail.com',
                password: '12345678'
            }
        }

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        }

        const next = jest.fn();

        req.user = {password: '12345678', userId: 1, email: 'marco@gmail.com'}

        const user = await User.login(req, res, next)

        console.log(user);

        expect(res.json).toBeDefined()

        expect(res.status).toBeDefined()
    })

})