
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';

const api = request(app);

test('test', async () => {
    await api
        .get('/api/data')
        .expect(404);
});

afterAll(async() => {
    await mongoose.connection.close();
});