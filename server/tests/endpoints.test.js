import chai from 'chai';
import chaiHttp from 'chai-http';
import path from 'path';
import debug from 'debug';
import app from '../index';

const logger = debug(`pro-lite-test`);


const { expect } = chai;
chai.use(chaiHttp);


let testToken = null;
describe('Test Endpoints', () => {
    it('should welcome you to the Applications endpoint page', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                if (err) return done(err);
                expect((res.text)).to.be.a('string');
                done();
            });
    });
    it('should add new user data to the database', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: 'david123@yahoo.com',
                first_name: 'David',
                last_name: 'Uk',
                password: 'david123',
                phoneNumber: '+2348031122334',
                address: 'Auchi, Edo'
            })
            .end((err, res) => {
                testToken = res.body.data.token;
                if (err) return done(err);
                expect(res.body).to.haveOwnProperty('status');
                expect(res.status).to.equal(201);
                expect((res.body)).to.be.an('object');
                expect((res.body)).to.have.all.keys('status', 'data');
                expect((res.body)).to.haveOwnProperty('status').that.equals('success');
                expect((res.body)).to.haveOwnProperty('status').that.is.a('string');
                expect((res.body)).to.haveOwnProperty('data').that.is.an('object');
                expect((res.body.data)).to.be.an('object');
                expect((res.body.data.email)).to.be.a('string');
                expect((res.body.data.first_name)).to.be.a('string');
                expect((res.body.data.last_name)).to.be.a('string');
                expect((res.body.data.token)).to.be.a('string');
                expect((res.body.data.id)).to.be.a('number');
                done();
            });
    });
    it('should registered user to access the login page', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'david123@yahoo.com',
                password: 'david123'
            })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.haveOwnProperty('status');
                expect(res.body).to.haveOwnProperty('status').that.is.a('string');
                expect(res.body).to.haveOwnProperty('data').that.is.an('object');
                expect((res.body)).to.have.all.keys('status', 'data');
                expect((res.body)).to.haveOwnProperty('status').that.equals('success');
                expect((res.body.data)).to.be.an('object');
                expect((res.body.data.email)).to.be.a('string');
                expect((res.body.data.first_name)).to.be.a('string');
                expect((res.body.data.last_name)).to.be.a('string');
                expect((res.body.data.token)).to.be.a('string');
                expect((res.body.data.id)).to.be.a('number');
                done();
            });
    });
});

describe('Property Endpoints', () => {
    it('should save advert details inputted by user', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .set('Authorization', `Bearer ${testToken}`)
            .field('price', 60000000)
            .field('state', 'Edo')
            .field('city', 'Benin')
            .field('address', 'Ihama Road, Benin City')
            .field('type', '5-bedroom')
            .attach('image', path.join(`${__dirname}./../images/house2.jpeg`))
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.ownProperty('status').that.equals('success');
                expect(res.body).to.have.ownProperty('data').to.be.an('object');
                expect(res.body.data.id).to.be.a('number');
                expect(res.body.data.status).to.be.a('string');
                expect(res.body.data.state).to.be.a('string');
                expect(res.body.data.type).to.be.a('string');
                expect(res.body.data.city).to.be.a('string');
                expect(res.body.data.address).to.be.a('string');
                expect(res.body.data.image_url).to.be.a('string');
                expect(res.body.data.price).to.be.a('number');
                done();
            });
    });
    it('should save advert without an image upload', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .set('Authorization', `Bearer ${testToken}`)
            .field('price', 60000000)
            .field('state', 'Edo')
            .field('city', 'Benin')
            .field('address', 'Ihama Road, Benin City')
            .field('type', '4-bedroom')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.ownProperty('status').that.equals('success');
                expect(res.body).to.have.ownProperty('data').to.be.an('object');
                expect(res.body.data.id).to.be.a('number');
                expect(res.body.data.status).to.be.a('string');
                expect(res.body.data.state).to.be.a('string');
                expect(res.body.data.type).to.be.a('string');
                expect(res.body.data.city).to.be.a('string');
                expect(res.body.data.address).to.be.a('string');
                expect(res.body.data.image_url).to.be.a('string');
                expect(res.body.data.price).to.be.a('number');
                done();
            });
    });
    it('should update advert details inputted by user', (done) => {
        chai.request(app)
            .patch('/api/v1/property/1')
            .set('Authorization', `Bearer ${testToken}`)
            .field('price', 30000000)
            .field('state', 'Delta')
            .field('city', 'Asaba')
            .field('address', '12, Word of Faith, Asaba')
            .field('type', '5-bedroom')
            .attach('image', path.join(`${__dirname}./../images/house2.jpeg`))
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.ownProperty('status').that.equals('success');
                expect(res.body).to.have.ownProperty('data').to.be.an('object');
                expect(res.body.data.id).to.be.a('number');
                expect(res.body.data.status).to.be.a('string');
                expect(res.body.data.state).to.be.a('string');
                expect(res.body.data.type).to.be.a('string');
                expect(res.body.data.city).to.be.a('string');
                expect(res.body.data.address).to.be.a('string');
                expect(res.body.data.image_url).to.be.a('string');
                expect(res.body.data.price).to.be.a('number');
                done();
            });
    });
    it('should display specific property', (done) => {
        chai.request(app)
            .get('/api/v1/property/1')
            .set('Authorization', `Bearer ${testToken}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.ownProperty('status').that.equals('success');
                expect(res.body).to.have.ownProperty('data').to.be.an('object');
                expect(res.body.data.id).to.be.a('number');
                expect(res.body.data.status).to.be.a('string');
                expect(res.body.data.state).to.be.a('string');
                expect(res.body.data.type).to.be.a('string');
                expect(res.body.data.city).to.be.a('string');
                expect(res.body.data.address).to.be.a('string');
                expect(res.body.data.image_url).to.be.a('string');
                expect(res.body.data.price).to.be.a('number');
                expect(res.body.data.owner_email).to.be.a('string');
                expect(res.body.data.owner_phone_number).to.be.a('string');
                done();
            });
    });
    it('should mark advert as sold', (done) => {
        chai.request(app)
            .patch('/api/v1/property/1/sold')
            .set('Authorization', `Bearer ${testToken}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.ownProperty('status').that.equals('success');
                expect(res.body).to.have.ownProperty('data').to.be.an('object');
                expect(res.body.data.id).to.be.a('number');
                expect(res.body.data.status).to.be.a('string');
                expect(res.body.data.state).to.be.a('string');
                expect(res.body.data.type).to.be.a('string');
                expect(res.body.data.city).to.be.a('string');
                expect(res.body.data.address).to.be.a('string');
                expect(res.body.data.image_url).to.be.a('string');
                expect(res.body.data.price).to.be.a('number');
                done();
            });
    });
    it('should retrieve all properties posted on the app', (done) => {
        chai.request(app)
            .get('/api/v1/property')
            .set('Authorization', `Bearer ${testToken}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.ownProperty('status').that.equals('success');
                expect(res.body).to.have.ownProperty('data').to.be.an('array');
                expect(res.body.data[0].id).to.be.a('number');
                expect(res.body.data[0].status).to.be.a('string');
                expect(res.body.data[0].state).to.be.a('string');
                expect(res.body.data[0].type).to.be.a('string');
                expect(res.body.data[0].city).to.be.a('string');
                expect(res.body.data[0].address).to.be.a('string');
                expect(res.body.data[0].image_url).to.be.a('string');
                expect(res.body.data[0].price).to.be.a('number');
                expect(res.body.data[0].owner_email).to.be.a('string');
                expect(res.body.data[0].owner_phone_number).to.be.a('string');
                done();
            });
    });
    it('should get all properties of specific type', (done) => {
        chai.request(app)
            .get('/api/v1/property?type=3-bedroom')
            .set('Authorization', `Bearer ${testToken}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.ownProperty('status').that.equals('success');
                expect(res.body).to.have.ownProperty('data').to.be.an('array');
                expect(res.body.data[0].id).to.be.a('number');
                expect(res.body.data[0].status).to.be.a('string');
                expect(res.body.data[0].state).to.be.a('string');
                expect(res.body.data[0].type).to.be.a('string');
                expect(res.body.data[0].city).to.be.a('string');
                expect(res.body.data[0].address).to.be.a('string');
                expect(res.body.data[0].image_url).to.be.a('string');
                expect(res.body.data[0].price).to.be.a('number');
                expect(res.body.data[0].owner_email).to.be.a('string');
                expect(res.body.data[0].owner_phone_number).to.be.a('string');
                done();
            });
    });
    it('should delete a property advert', (done) => {
        chai.request(app)
            .delete('/api/v1/property/1')
            .set('Authorization', `Bearer ${testToken}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.ownProperty('status').that.equals('success');
                expect(res.body).to.have.ownProperty('data').to.be.an('object');
                expect(res.body.status).to.be.a('string');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data.message).to.be.an('string');
                done();
            });
    });
    it('should return message "Advert not found. Advert may have been removed" for nonexistent property ID', (done) => {
        chai.request(app)
            .delete('/api/v1/property/30')
            .set('Authorization', `Bearer ${testToken}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.have.keys('status', 'error');
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.ownProperty('status').that.equals('error');
                expect(res.body).to.have.ownProperty('error').to.be.a('string');
                expect(res.body.status).to.be.a('string');
                expect(res.body.error).to.be.a('string');
                expect(res.body.error).to.equal('Advert not found. Advert may have been removed');
                done();
            });
    });
});

describe('Test Reset Password', () => {
    it('should save a new password set by user and return a confirmatory message', (done) => {
        chai.request(app)
            .post('/api/v1/auth/sebastinocj@yahoo.com/reset_password')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
                password: 'david123',
                new_password: 'davesmith123'
            })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.haveOwnProperty('status');
                expect(res.status).to.equal(201);
                expect((res.body)).to.be.an('object');
                expect((res.body)).to.have.all.keys('status', 'message');
                expect((res.body)).to.haveOwnProperty('status').that.equals(204);
                expect((res.body)).to.haveOwnProperty('status').that.is.a('number');
                expect((res.body)).to.haveOwnProperty('message').that.is.a('string');
                expect((res.body.message)).to.be.a('string');
                done();
            });
    });
    it('should send an email to user email for password reset', (done) => {
        chai.request(app)
            .post('/api/v1/auth/sebastinocj@yahoo.com/reset_password')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.haveOwnProperty('status');
                expect(res.status).to.equal(201);
                expect((res.body)).to.be.an('object');
                expect((res.body)).to.have.all.keys('status', 'message');
                expect((res.body)).to.haveOwnProperty('status').that.equals(204);
                expect((res.body)).to.haveOwnProperty('status').that.is.a('number');
                expect((res.body)).to.haveOwnProperty('message').that.is.a('string');
                expect((res.body.message)).to.be.a('string');
                done();
            });
    });
});
