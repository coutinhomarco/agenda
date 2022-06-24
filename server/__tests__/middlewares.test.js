const {validateContactData} = require('../middleware/contactValidate');
const {validateName, validateUserData} = require('../middleware/userValidate');
const {validateBodyInfo, validateParams} = require('../middleware/tasksValidate');
describe('validate the contactValidate middleware', () => {
    it('should return a 400 error if the contact is not valid', async () => {
        const req = {
            body: {
                name: '',
                email: '',
                phoneNumber: '',
            },
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        };

        const next = jest.fn();

        await validateContactData(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith({
        message: 'Name, email and phone number are required',
        });
    })
})
describe('validate the userValidate middleware', () => {
    it('should return a 400 error if the user doenst have a name', async () => {
        const req = {
            body: {
                name: '',
            }
        }
        
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        }

        const next = jest.fn();

        await validateName(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith({ message: 'Name is required' });
    })
    it('should return a 400 error if the user doesnt have an email or password', async () => {
        const req = {
            body: {
                email: '',
                password: '',
            }
        }

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        }

        const next = jest.fn();

        await validateUserData(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith({ message: 'Email and password are required' });
    })
    it('should return a 400 error if the user doesnt have a valid email', async () => {
        const req = {
            body: {
                email: 'email.com',
                password: 'password',
            }
        }
    
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        }

        const next = jest.fn();

        await validateUserData(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith({ message: '"email" must be a valid email' });

    })
    it('should return a 400 error if the user doesnt have a password that is at least 8 characters long', async () => {
        const req = {
            body: {
                email: 'marco@marco.com',
                password: 'pass',
            }
        }

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        }

        const next = jest.fn();

        await validateUserData(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith({ message: 'Password must be at least 8 characters long' });
    })
})
describe('validate the tasksValidate middleware', () => {
    it('it should return code 400 if the body doenst have a title', async () => {
        const req = {
            body: {
                title: '',
            }
        }

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        }

        const next = jest.fn();

        await validateBodyInfo(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith({ message: 'Title is required' });
    })
    it('it should return code 400 if the body doenst have a description', async () => {
        const req = {
            body: {
                title: 'title',
                description: '',
            }
        }

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        }

        const next = jest.fn();

        await validateBodyInfo(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith({ message: 'Description is required' });
    })
    it('it should return a code 400 if the body doenst have a status', async () => {
        const req = {
            body: {
                title: 'title',
                description: 'description',
                status: '',
            }
        }

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        }

        const next = jest.fn();

        await validateBodyInfo(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith({ message: 'Status is required' });
    })
    it('it should return a code 400 if the body doenst have a tag', async () => {
        const req = {
            body: {
                title: 'title',
                description: 'description',
                status: 0,
                tag: ''
            }
        }

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        }

        const next = jest.fn();

        await validateBodyInfo(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith({ message: 'Tag is required' });
    })
    it('it should return a code 400 if the params doenst have a contactId', async () => {
        const req = {
            params: {
                contactId: '',
            }
        }

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        }

        const next = jest.fn();

        await validateParams(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith({ message: 'ContactId is required' });
    })
})