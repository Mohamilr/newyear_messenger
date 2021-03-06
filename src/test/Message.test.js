import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('Message', () => {
  // check entries
  it('should check for empty body value', (done) => {
    chai.request(app)
      .post('/api/v1/create')
      .set('Cookie', `userId=${process.env.TEST_COOKIE}`)
      .send({
        name: '',
        message: '',
        senderEmail: '',
        subject: '',
        receiversEmail: '',
        date: '2030-02-17T10:59'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
      })
    done();
  });

  // check if name is less than 3 values
  it('should check if name length is less than 3', (done) => {
    chai.request(app)
      .post('/api/v1/create')
      .set('Cookie', `userId=${process.env.TEST_COOKIE}`)
      .send({
        name: 'me',
        message: 'i am writing this for test',
        senderEmail: 'me@gmail.com',
        subject: 'my subject',
        receiversEmail: 'you@email.com him@email.com her@email.com',
        date: '2030-02-17T10:59'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
      })
    done();
  });

  // validate sender email
  it('should validate sender email', (done) => {
    chai.request(app)
      .post('/api/v1/create')
      .set('Cookie', `userId=${process.env.TEST_COOKIE}`)
      .send({
        name: 'mohammed',
        message: 'i am writing this for test',
        senderEmail: 'me@gmail.c',
        subject: 'my subject',
        receiversEmail: 'you@email.com him@email.com her@email.com',
        date: '2030-02-17T10:59'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
      })
    done();
  });

  // validate receiver email
  it('should validate receiver email', (done) => {
    chai.request(app)
      .post('/api/v1/create')
      .set('Cookie', `userId=${process.env.TEST_COOKIE}`)
      .send({
        name: 'mohammed',
        message: 'i am writing this for test',
        senderEmail: 'me@gmail.c',
        subject: 'my subject',
        receiversEmail: 'you@email.c him@email.n her@email.o',
        date: '2030-02-17T10:59'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
      })
    done();
  });

  // validate date format
  it('should validate date', (done) => {
    chai.request(app)
      .post('/api/v1/create')
      .set('Cookie', `userId=${process.env.TEST_COOKIE}`)
      .send({
        name: 'mohammed',
        message: 'i am writing this for test',
        senderEmail: 'me@g.com',
        subject: 'my subject',
        receiversEmail: 'you@email.com him@email.com her@email.com',
        date: '2010/02/17T10:59' //date format should be seperated by (-) and not (/) or any other format
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
      })
    done();
  });


  // validate date (if past date is entered)
  it('should validate date', (done) => {
    chai.request(app)
      .post('/api/v1/create')
      .set('Cookie', `userId=${process.env.TEST_COOKIE}`)
      .send({
        name: 'mohammed',
        message: 'i am writing this for test',
        senderEmail: 'me@g.com',
        subject: 'my subject',
        receiversEmail: 'you@email.com him@email.com her@email.com',
        date: '2010-02-17T10:59' //date is set to year 2010 which is a past date
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
      })
    done();
  });

  // save a message
  it('should save a message', (done) => {
    chai.request(app)
      .post('/api/v1/create')
      .set('Cookie', `userId=${process.env.TEST_COOKIE}`)
      .send({
        name: 'mohammed',
        message: 'i am writing this for test',
        senderEmail: 'me@gmail.com',
        subject: 'my subject',
        receiversEmail: 'you@email.com him@email.com her@email.com',
        date: '2030-02-17T10:59'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.equal('success');
        res.body.message.should.be.a('object');
      })
    done();
  });

  // get messages for a user
  it('should get messages of a user', (done) => {
    chai.request(app)
      .get(`/api/v1/message/${process.env.TEST_COOKIE}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.equal('success');
        res.body.message.should.be.a('object');
      })
    done();
  });
})