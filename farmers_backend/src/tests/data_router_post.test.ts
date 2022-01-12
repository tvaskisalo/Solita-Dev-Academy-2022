import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import DataPointModel from '../models/dataPoint';
import UserModel from '../models/user';

const api = request(app);

let token = '';

//This test assumes that apis /api/user and /api/login work correctly


beforeAll(async () => {
    await UserModel.deleteMany();
    const user = {
        username: 'Tapani',
        password: 'mustikka'
    };
    await api
        .post('/api/user')
        .send(user);

    const res = await api
        .post('/api/login')
        .send(user);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    token = `bearer ${res.body.token}`;
});

beforeEach(async () => {
    await DataPointModel.deleteMany();
});

test('api responds correctly to correct data and token 1', async() => {
    const dataPoint1 = {
        date: '2020-02-20',
        temperature: 1,
        rainfall: 10,
        pH: 7
    };
    const dataPoint2 = {
        date: '2020-02-21',
        rainfall: 10,
        pH: 7
    };
    const dataPoint3 = {
        date: '2020-02-22',
        temperature: 1,
        pH: 7
    };
    const dataPoint4 = {
        date: '2020-02-23',
        temperature: 1,
        rainfall: 10
    };

    await api
        .post('/api/data')
        .send(dataPoint1)
        .set('Authorization', token)
        .expect(200);

    await api
        .post('/api/data')
        .send(dataPoint2)
        .set('Authorization', token)
        .expect(200);

    await api
        .post('/api/data')
        .send(dataPoint3)
        .set('Authorization', token)
        .expect(200);

    await api
        .post('/api/data')
        .send(dataPoint4)
        .set('Authorization', token)
        .expect(200);
    
    const dataPoints = await DataPointModel.find();
    expect(dataPoints).toHaveLength(4);

    const data1 = dataPoints.find((dp) => dp.date.day === 20);
    expect(data1 && data1.temperature && data1.pH && data1.rainfall);

    const data2 = dataPoints.find((dp) => dp.date.day === 21);
    expect(data2 && !data2.temperature && data2.pH && data2.rainfall);

    const data3 = dataPoints.find((dp) => dp.date.day === 22);
    expect(data3 && data3.temperature && !data3.pH && data3.rainfall);

    const data4 = dataPoints.find((dp) => dp.date.day === 23);
    expect(data4 && data4.temperature && data4.pH && !data4.rainfall);
});

test('api responds correctly to correct data and token 2', async() => {
    const dataPoint1 = {
        date: '2020-03-20',
        rainfall: 100
    };
    const dataPoint2 = {
        date: '2020-03-20',
        temperature: -10
    };

    await api
        .post('/api/data')
        .send(dataPoint1)
        .set('Authorization', token)
        .expect(200);

    await api
        .post('/api/data')
        .send(dataPoint2)
        .set('Authorization', token)
        .expect(200);

    const dataPoints = await DataPointModel.find();
    expect(dataPoints).toHaveLength(1);
    expect(dataPoints[0].rainfall === 100 && dataPoints[0].temperature === -10);
});

test('Api responds correctly to missing data', async () => {
    const dataPoint1 = {
        temperature: 1,
        rainfall: 10,
        pH: 7
    };
    await api
        .post('/api/data')
        .send(dataPoint1)
        .set('Authorization', token)
        .expect(400);
    const dataPoints = await DataPointModel.find();
    expect(dataPoints).toHaveLength(0);
});

test('Api responds correctly to incorrect data 1', async () => {
    const dataPoint1 = {
        date: '2020-02-20',
        temperature: -1000,
        rainfall: 10,
        pH: 7
    };
    const dataPoint2 = {
        date: '2020-02-20',
        temperature: 1000,
        rainfall: 10,
        pH: 7
    };
    const dataPoint3 = {
        date: '2020-02-20',
        temperature: 10,
        rainfall: -10,
        pH: 7
    };
    const dataPoint4 = {
        date: '2020-02-20',
        temperature: 10,
        rainfall: 1000000,
        pH: 7
    };
    const dataPoint5 = {
        date: '2020-02-20',
        temperature: 10,
        rainfall: 10,
        pH: -1
    };
    const dataPoint6 = {
        date: '2020-02-20',
        temperature: 10,
        rainfall: 10,
        pH: 70
    };
    await api
        .post('/api/data')
        .send(dataPoint1)
        .set('Authorization', token)
        .expect(400);
    await api
        .post('/api/data')
        .send(dataPoint2)
        .set('Authorization', token)
        .expect(400);
    await api
        .post('/api/data')
        .send(dataPoint3)
        .set('Authorization', token)
        .expect(400);
    await api
        .post('/api/data')
        .send(dataPoint4)
        .set('Authorization', token)
        .expect(400);
    await api
        .post('/api/data')
        .send(dataPoint5)
        .set('Authorization', token)
        .expect(400);
    await api
        .post('/api/data')
        .send(dataPoint6)
        .set('Authorization', token)
        .expect(400);
    const dataPoints = await DataPointModel.find();
    expect(dataPoints).toHaveLength(0);
});

test('Api responds correctly to incorrect data 2', async () => {
    const dataPoint1 = {
        date: '2020-02-20',
        temperature: '-1000',
        rainfall: 10,
        pH: 7
    };
    const dataPoint2 = {
        date: '2020-02-20',
        temperature: 1000,
        rainfall: '10',
        pH: 7
    };
    const dataPoint3 = {
        date: '2020-02-20',
        temperature: 10,
        rainfall: -10,
        pH: '7'
    };
    const dataPoint4 = {
        username: 'tapani',
        password: 'mustikka'
    };
    await api
        .post('/api/data')
        .send(dataPoint1)
        .set('Authorization', token)
        .expect(400);
    await api
        .post('/api/data')
        .send(dataPoint2)
        .set('Authorization', token)
        .expect(400);
    await api
        .post('/api/data')
        .send(dataPoint3)
        .set('Authorization', token)
        .expect(400);
    await api
        .post('/api/data')
        .send(dataPoint4)
        .set('Authorization', token)
        .expect(400);
    const dataPoints = await DataPointModel.find();
    expect(dataPoints).toHaveLength(0);
});



test('Api responds correctly to incorrect or missing token', async () => {
    const dataPoint1 = {
        date: '2020-02-20',
        temperature: 1,
        rainfall: 10,
        pH: 7
    };
    await api
        .post('/api/data')
        .send(dataPoint1)
        .set('Authorization', '')
        .expect(401);
    await api
        .post('/api/data')
        .send(dataPoint1)
        .expect(401);
    await api
        .post('/api/data')
        .send(dataPoint1)
        .set('Authorization', 'thistokenshouldbeincorred1122')
        .expect(401);
    const dataPoints = await DataPointModel.find();
    expect(dataPoints).toHaveLength(0);
});

afterAll(async () => {
    await mongoose.connection.close();
});