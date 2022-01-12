
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import UserModel from '../models/user';

const api = request(app);

test('Api responds correctly to incorrect data', async () => {
    const newUser1 = {
        username: 'Tapani'
    };

    const newUser2 = {
        password: 'Mustikka'
    };
    
    const newUser3 = {
        date: 'New Date'
    };

    await api
        .post('/api/user')
        .send(newUser1)
        .expect(400);
    
    await api
        .post('/api/user')
        .send(newUser2)
        .expect(400);
    
    await api
        .post('/api/user')
        .send(newUser3)
        .expect(400);
    const users = await UserModel.find();
    expect(users).toHaveLength(0);
});

test('Api responds correctly to correct data', async() => {
    const newUser = {
        username: 'Tapani',
        password: 'mustikka'
    };

    await api
        .post('/api/user')
        .send(newUser)
        .expect(200);
    const users = await UserModel.find();
    expect(users).toHaveLength(1);
    expect(users[0].username).toBe('Tapani');
});

test('Api does not return password hash', async() => {
    const newUser = {
        username: 'Tapani',
        password: 'mustikka'
    };

    const res = await api
        .post('/api/user')
        .send(newUser)
        .expect(200);

    expect(!res.body.passwordHash);
});

test('Api does not allow duplicate usernames', async() => {
    const newUser = {
        username: 'Tapani',
        password: 'mustikka'
    };

    await api
        .post('/api/user')
        .send(newUser)
        .expect(200);

    await api
        .post('/api/user')
        .send(newUser)
        .expect(400);
    
    const users = await UserModel.find();
    expect(users).toHaveLength(1);
});

beforeEach(async () => {
    await UserModel.deleteMany();
});
afterAll(async () => {
    await mongoose.connection.close();
});