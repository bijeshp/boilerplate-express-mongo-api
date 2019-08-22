import request from 'supertest';
import httpStatus from 'http-status';
import chai from 'chai';

import app from '../app';

const expect = chai.expect;
chai.config.includeStack = true;

describe('## Common Utility Test cases', () => {
  describe('# GET /api/v1/health-check', () => {
    it('should return 200 status', (done) => {
      request(app)
        .get('/api/v1/health-check')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.status).to.equal(200);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/404', () => {
    it('should return 404 status', (done) => {
      request(app)
        .get('/api/v1/404')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.error.status).to.equal(404);
          done();
        })
        .catch(done);
    });
  });

  describe('# Error Handling', () => {
    it('should handle mongoose CastError - Cast to ObjectId failed', (done) => {
      request(app)
        .get('/api/v1/users/56z787zzz67fc')
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .then((res) => {
          expect(res.error.status).to.equal(500);
          done();
        })
        .catch(done);
    });

    it('should handle express validation error - username is required', (done) => {
      request(app)
        .post('/api/v1/users')
        .send({
          mobileNumber: '1234567890',
        })
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('"username" is required');
          done();
        })
        .catch(done);
    });
  });
});
