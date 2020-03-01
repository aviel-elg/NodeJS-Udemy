const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Noy Zrihen',
    email: 'zrihennoy@gmail.com',
    password: '24252728noy',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}


beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Aviel',
        email: 'aviel.el98@gmail.com',
        password: 'ae2311!'
    }).expect(201)

    // Assert that the database was changed
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull() 

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Aviel',
            email: 'aviel.el98@gmail.com',
        },
        token: user.tokens[0].token
    })

    // Assert password encryption
    expect(user.password).not.toBe('ae2311!')
})

test('Should not signup with invalid name', async () => {
    const response = await request(app)
        .post('/users/')
        .send({
            name: undefined,
            email: 'aviel@example.com',
            password: 'ae2311!'
        })
        .expect(400)
})

test('Should not signup with invalid email', async () => {
    await request(app)
        .post('/users/')
        .send({
            name: 'Aviel',
            email: 'aviel',
            password: 'ae2311!'
        })
        .expect(400)
})

test('Should not signup with invalid password', async () => {
    await request(app)
        .post('/users/')
        .send({
            name: 'Aviel',
            email: 'aviel@example.com',
            password: '123456'
        })
        .expect(400)
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[0].token)
})

test('Should not login with bad credentials', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'Password'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ 
            name: 'Aviel Elgrabli'
         })
         .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Aviel Elgrabli')
})

test('Should not update user if not authenticated', async () => {
    await request(app)
        .patch('/users/me')
        .send({ 
            name: 'Aviel Elgrabli'
         })
         .expect(401)
})

test('Should not update invalid user fields', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ 
            location: 'Toronto'
         })
         .expect(400)
})

test('Should not update with invalid email', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            email: 'aviel',
        })
        .expect(400)
})

test('Should not update with invalid password', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            password: '123456'
        })
        .expect(400)
})