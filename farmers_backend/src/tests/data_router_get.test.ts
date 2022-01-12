import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import DataPointModel from '../models/dataPoint';
import UserModel from '../models/user';

const api = request(app);

let token1 = '';
let token2 = '';


//This test assumes that apis /api/user and /api/login work correctly and posting datapoints to /api/data works correctly

const mockData1 = [{
    date: '2020-02-25',
    temperature: 40,
    pH: 10,
    rainfall: 100
}, {
    date: '2019-02-25',
    temperature: 20,
    pH: 7,
    rainfall: 500
}, {
    date: '2020-03-20',
    rainfall: 100
}, {
    date: '2020-03-20',
    temperature: -10
}, {
    date: '1999-05-30',
    temperature: 10,
    pH: 1
}];

// temp avg 60/4
// temp min -10
// temp max 40

// rain avg 700/4
// rain min 100
// rain max 500

// pH avg 18/3 
// pH min 1
// pH max 10

const mockData2 = [{
    date: '2021-03-20',
    pH: 7,
    rainfall: 100
}, {
    date: '2021-03-20',
    temperature: 70
}];

beforeAll(async () => {
    await UserModel.deleteMany({});
    const user1 = {
        username: 'Tapani',
        password: 'mustikka'
    };

    const user2 = {
        username: 'Jaakko',
        password: 'mansikka'
    };
    await api
        .post('/api/user')
        .send(user1);

    const res1 = await api
        .post('/api/login')
        .send(user1);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    token1 = `bearer ${res1.body.token}`;

    await api
        .post('/api/user')
        .send(user2);
    const res2 = await api
        .post('/api/login')
        .send(user2);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    token2 = `bearer ${res2.body.token}`;
});

beforeAll(async () => {
    await DataPointModel.deleteMany({});
    await api
        .post('/api/data')
        .send(mockData1[0])
        .set('Authorization', token1);
    await api
        .post('/api/data')
        .send(mockData1[1])
        .set('Authorization', token1);
    await api
        .post('/api/data')
        .send(mockData1[2])
        .set('Authorization', token1);
    await api
        .post('/api/data')
        .send(mockData1[3])
        .set('Authorization', token1);
    await api
        .post('/api/data')
        .send(mockData1[4])
        .set('Authorization', token1);
    await api
        .post('/api/data')
        .send(mockData2[0])
        .set('Authorization', token2);
    await api
        .post('/api/data')
        .send(mockData2[1])
        .set('Authorization', token2);
});

describe('/byMonth', () => {
    test('GET request does not work with incorrect or missing token', async () => {
        await api
            .get('/api/data/byMonth?year=2020&month=2')
            .set('Authorization', '')
            .expect(401);
        await api
            .get('/api/data/byMonth?year=2020&month=2')
            .set('Authorization', 'thisTokenShouldBeIncorrect123')
            .expect(401);
    });

    test('GET request returns correct datapoints', async () => {
        const res = await api
            .get('/api/data/byMonth?year=2020&month=3')
            .set('Authorization', token1);
        expect(res.body).toHaveLength(1);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
        res.body.forEach((dataPoint: any) => {
            expect(dataPoint.date.year === 2020);
            expect(dataPoint.date.month === 3);
        });
    });
});

describe('/byMetric', () => {
    test('GET request does not work with incorrect or missing token', async () => {
        await api
            .get('/api/data/byMetric?metric=pH')
            .set('Authorization', '')
            .expect(401);
            
        await api
            .get('/api/data/byMetric?metric=pH')
            .set('Authorization', 'thisTokenShouldBeIncorrect123')
            .expect(401);
    });

    test('GET request returns correct datapoints', async () => {
        const res1 = await api
            .get('/api/data/byMetric?metric=temperature')
            .set('Authorization', token1)
            .expect(200);
        const res2 = await api
            .get('/api/data/byMetric?metric=pH')
            .set('Authorization', token1)
            .expect(200);
        const res3 = await api
            .get('/api/data/byMetric?metric=rainfall')
            .set('Authorization', token1)
            .expect(200);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
        res1.body.forEach((dataPoint: any) => {
            expect(dataPoint.temperature && !dataPoint.pH && !dataPoint.rainfall);
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
        res2.body.forEach((dataPoint: any) => {
            expect(dataPoint.pH && !dataPoint.temperature && !dataPoint.rainfall);
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
        res3.body.forEach((dataPoint: any) => {
            expect(!dataPoint.pH && !dataPoint.temperature && dataPoint.rainfall);
        });
        expect(res1.body).toHaveLength(4);
        expect(res2.body).toHaveLength(3);
        expect(res3.body).toHaveLength(3);
    });
});

describe('/monthStatistics', () => {
    test('GET request does not work with incorrect or missing token', async () => {
        await api
            .get('/api/data/monthStatistics?year=2020&month=2')
            .set('Authorization', '')
            .expect(401);
            
        await api
            .get('/api/data/monthStatistics?year=2020&month=2')
            .set('Authorization', 'thisTokenShouldBeIncorrect123')
            .expect(401);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});