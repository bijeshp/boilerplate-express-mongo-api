import mongoose from 'mongoose';
import request from 'supertest';
import httpStatus from 'http-status';
import chai from 'chai';
import app from '../../app';

const expect = chai.expect;
chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## User APIs', () => {
  let user = {
    name: 'KK123',
    mobileNumber: '1234567890',
  };

  describe('# POST /api/v1/users', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/v1/users')
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(user.name);
          expect(res.body.mobileNumber).to.equal(user.mobileNumber);
          user = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/v1/users/:userId', () => {
    it('should get user details', (done) => {
      request(app)
        .get(`/api/v1/users/${user._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(user.name);
          expect(res.body.mobileNumber).to.equal(user.mobileNumber);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when user does not exists', (done) => {
      request(app)
        .get('/api/v1/users/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.error.status).to.equal(404);
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/v1/users/:userId', () => {
    it('should update user details', (done) => {
      user.name = 'KK';
      request(app)
        .put(`/api/v1/users/${user._id}`)
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK');
          expect(res.body.mobileNumber).to.equal(user.mobileNumber);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/v1/users/', () => {
    it('should get all users', (done) => {
      request(app)
        .get('/api/v1/users')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all users (with limit and skip)', (done) => {
      request(app)
        .get('/api/v1/users')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/v1/users/', () => {
    it('should delete user', (done) => {
      request(app)
        .delete(`/api/v1/users/${user._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK');
          expect(res.body.mobileNumber).to.equal(user.mobileNumber);
          done();
        })
        .catch(done);
    });
  });
});
