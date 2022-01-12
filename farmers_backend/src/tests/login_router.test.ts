import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';

const api = request(app);

beforeAll(async () => {
    const user = {
        username: 'Tapani',
        password: 'mustikka'
    };
    await api
        .post('/api/user')
        .send(user);
});

test('api responds correctly to missing data', async () => {
    const user1 = {
        username: 'Tapani'
    };
    const user2 = {
        password: 'mansikka'
    };

    const user3 = {};

    await api
        .post('/api/login')
        .send(user1)
        .expect(400);
    await api
        .post('/api/login')
        .send(user2)
        .expect(400);
    await api
        .post('/api/login')
        .send(user3)
        .expect(400);
});

test('api responds correctly to incorrect login data', async() => {
    const user1 = {
        username: 'tapani',
        password: 'mansikka'
    };
    const user2 = {
        username: 'Jaakko',
        password: 'mustikka'
    };
    const user3 = {
        username: 'Jaakko',
        password: 'mansikka'
    };

    const res1 = await api
        .post('/api/login')
        .send(user1)
        .expect(401);
    const res2 = await api
        .post('/api/login')
        .send(user2)
        .expect(401);
    const res3 = await api
        .post('/api/login')
        .send(user3)
        .expect(401);
    expect(!res1.body.token);
    expect(!res2.body.token);
    expect(!res3.body.token);
});

test('api gives a token on correct login', async () => {
    const user = {
        username: 'Tapani',
        password: 'mustikka'
    }; 
    const res = await api
        .post('/api/login')
        .send(user)
        .expect(200);

    expect(res.body.token);
});

afterAll(async () => {
    await mongoose.connection.close();
});