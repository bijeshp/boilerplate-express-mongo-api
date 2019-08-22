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

describe('## Note APIs', () => {
  let note = {
    text: 'test note',
    _owner: '5d08150d0b225314d3c79fca',
  };

  describe('# POST /api/v1/notes', () => {
    it('should create a new note', (done) => {
      request(app)
        .post('/api/v1/notes')
        .send(note)
        .expect(httpStatus.OK)
        .then((res) => {
          note._id = res.body._id;
          expect(res.body.text).to.equal(note.text);
          expect(res.body._owner).to.equal(note._owner);
          note = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/v1/notes/:noteId', () => {
    it('should get note details', (done) => {
      request(app)
        .get(`/api/v1/notes/${note._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.text).to.equal(note.text);
          expect(res.body._owner._id).to.equal(note._owner);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when note does not exists', (done) => {
      request(app)
        .get('/api/v1/notes/5d0c09701cafbf95d0a2ab33')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.error.status).to.equal(404);
          done();
        })
        .catch(done);
    });
  });

  describe('# PATCH /api/v1/notes/:noteId', () => {
    it('should update note details', (done) => {
      note.text = 'Updated Note Text';
      request(app)
        .patch(`/api/v1/notes/${note._id}`)
        .send(note)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.text).to.equal('Updated Note Text');
          expect(res.body._owner).to.equal(note._owner);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/v1/notes/', () => {
    it('should get all notes', (done) => {
      request(app)
        .get('/api/v1/notes')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all notes (with limit and skip)', (done) => {
      request(app)
        .get('/api/v1/notes')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/v1/notes/', () => {
    it('should delete note', (done) => {
      request(app)
        .delete(`/api/v1/notes/${note._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.text).to.equal('Updated Note Text');
          expect(res.body._owner._id).to.equal(note._owner);
          done();
        })
        .catch(done);
    });
  });
});
