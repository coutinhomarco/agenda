const {execSync} = require('child_process')
const Contact = require('../../models/Contact')
const UserContact = require('../../models/UserContact')
const User = require('../../models/User')
const Tasks = require('../../models/Tasks')

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
describe('Test the UserContact model', () => {
    execSync('npm run all')
    it('should create a new userContact', async () => {
        const userId = 3
        const contactId = 6
        const userContact = await UserContact.create({ userId, contactId });
        expect(userContact).toBeDefined();
        expect(userContact.dataValues).toMatchObject({ userId, contactId });
    })
    it('should find a userContact', async () => {
        const userId = 1
        const contactId = 1
        const userContact = await UserContact.findOne({ userId, contactId });
        if (!userContact) return expect(userContact).toBe(null);
        expect(userContact).toBeDefined();
    })
})
describe('Test the Tasks model', () => {
    execSync('npm run all')
    it('should create a new task', async () => {
        const userId = 1
        const taskObject = {
            userContactId: 3,
            title: 'Buy milk',
            description: 'Buy milk',
            taskStartDate: '2020-01-01',
            taskEndDate: '2020-01-01',
            tag: 1,
            status: 2,
        }
        const task = await Tasks.create(taskObject);
        expect(task).toBeDefined();
    })
    it('should delete a task', async () => {
        const taskId = 1
        const userContactId = 1
        let task = await Tasks.findOne({ taskId, userContactId, attributes: ['taskId', 'userContactId', 'title', 'description', 'taskStartDate', 'taskEndDate', 'tag', 'status'] });
        if (!task) return expect(task).toBe(null);
        await Tasks.destroy( { taskId, userContactId })
        task = await Tasks.findOne({ taskId,userContactId ,attributes: ['taskId', 'userContactId', 'title', 'description', 'status', 'taskStartDate', 'taskEndDate'] });
        expect(task).toBe(null);
    })
    it('should find all tasks', async () => {
        const userId = 1 
        const allTasks = await Tasks.findAll({ userId });
        expect(allTasks).toBeDefined();
    })
    it('should find 1 tasks', async () => {
        const userId = 1 
        const allTasks = await Tasks.findAll({ userId });
        expect(allTasks).toBeDefined();
        expect(allTasks[0]?.task?.dataValues).toBeDefined();
    })
    it('should find a task', async () => {
        const userContactId = 1
        const taskId = 1
        const attributes = ['taskId', 'userContactId', 'title', 'description', 'taskStartDate', 'taskEndDate', 'tag', 'status']
        const task = await Tasks.findOne({ userContactId, taskId, attributes });
        if (!task) return expect(task).toBe(null);
        expect(task).toBeDefined();
    })
})