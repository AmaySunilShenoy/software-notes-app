const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const mongoose = require('mongoose');
const sandbox = sinon.createSandbox();

let noteController = rewire('../controllers/note.controller');

describe('Testing /note endpoint', () => {
  let sampleNote;
  let findOneStub;
  let findStub;

  beforeEach(() => {
    sampleNote = {
      title: 'sample title',
      content: 'sample content'
    };

    findOneStub = sandbox.stub(mongoose.Model, 'findOne').resolves(sampleNote);
    findStub = sandbox.stub(mongoose.Model, 'find').resolves([sampleNote]);
  });

  afterEach(() => {
    noteController = rewire('../controllers/note.controller');
    sandbox.restore();
  });

  describe('GET /', () => {
    it('should succeed and return list of notes', (done) => {
      noteController.getNotes()
        .then((item) => {
          expect(item).to.eql([sampleNote]);
          done();
        })
        .catch((err) => {
          const error = new Error('Unexpected failure!')
          done(error);
        })
    });
  });

  describe('GET /:id', () => {
    it('should return error when called without id', (done) => {
        noteController.getNote()
          .then(() => {
            const error = new Error('⚠️ Unexpected success!');
            done(error)
          })
          .catch((err) => {
            expect(err).to.be.instanceOf(Error);
            expect(err.message).to.equal('Invalid item id');
            done();
          })
      });
  
      it('should succeed when called with id',  (done) => {
        noteController.getNote('id')
          .then((item) => {
            expect(item).to.equal(sampleNote);
            done();
          })
          .catch((err) => {
            const error = new Error('⚠️ Unexpected failure!');
            done(error);
          })
      });
  });

  describe('POST /', () => {
    let noteModelStub, saveStub, result;

    beforeEach(async () => {
      saveStub = sandbox.stub().returns(sampleNote);
      noteModelStub = sandbox.stub().returns({
        save: saveStub
      });

      noteController.__set__('Note', noteModelStub);
    });

    it('should throw invalid argument when no note is passed', () => {
      noteController.createNote()
        .then(() => {
          throw new Error('⚠️ Unexpected success!');
        })
        .catch(err => {
          expect(result).to.be.instanceOf(Error);
          expect(err.message).to.equal('Missing note');
        })
    });

    it('should throw invalid argument when note is passed without title', () => {
      noteController.createNote({ content: 'sample content' })
        .then(() => {
          throw new Error('⚠️ Unexpected success!');
        })
        .catch(err => {
          expect(result).to.be.instanceOf(Error);
          expect(err.message).to.equal('Missing title');
        })
    });

    it('should create item successfully', async () => {
      result = await noteController.createNote(sampleNote);
      expect(noteModelStub).to.have.been.calledWithNew;
      expect(noteModelStub).to.have.been.calledWith(sampleNote);
      expect(saveStub).to.have.been.called;
      expect(result).to.equal(sampleNote);
    });
  });

  describe('PUT /:id', () => {
    let noteModelStub, saveStub, result, updatedSampleNote;

    beforeEach(async () => {
      sandbox.restore();
      updatedSampleNote = {
        title: 'updated title',
        content: 'updated content'
      }
      saveStub = sandbox.stub().returns(updatedSampleNote);
      findOneStub = sandbox.stub().resolves({
        ...updatedSampleNote,
        save: saveStub
      });
    
      noteModelStub = {
        findOne: findOneStub
      };
    

      noteController.__set__('Note', noteModelStub);
    });

    it('should throw invalid argument when no id is passed', (done) => {
      noteController.updateNote(id=undefined, sampleNote)
        .then(() => {
          const error = new Error('⚠️ Unexpected success!');
          done(error);
        })
        .catch(err => {
          expect(err).to.be.instanceOf(Error);
          expect(err.message).to.equal('Invalid item id');
          done()
        })
    });

    it('should throw invalid argument when no note is passed', (done) => {
      noteController.updateNote(id='id', note=undefined)
        .then(() => {
          const error = new Error('⚠️ Unexpected success!');
          done(error);
        })
        .catch(err => {
          expect(err).to.be.instanceOf(Error);
          expect(err.message).to.equal('No update passed');
          done()
        })
    });

    it('should update item successfully', async () => {
      result = await noteController.updateNote('id',updatedSampleNote);
      expect(findOneStub).to.have.been.calledWith('id');
      expect(saveStub).to.have.been.called;
      expect(result).to.eql(updatedSampleNote);
    });
  });

  describe('DELETE /:id', () => {
    let noteModelStub, removeStub, result;

    beforeEach(async () => {
      sandbox.restore();
      removeStub = sandbox.stub().returns({});
      findOneStub = sandbox.stub().resolves({
        ...sampleNote,
        remove: removeStub
      });
    
      noteModelStub = {
        findOne: findOneStub
      };
    

      noteController.__set__('Note', noteModelStub);
    });

    it('should throw invalid argument when no id is passed', (done) => {
      noteController.deleteNote()
        .then(() => {
          const error = new Error('⚠️ Unexpected success!');
          done(error);
        })
        .catch(err => {
          expect(err).to.be.instanceOf(Error);
          expect(err.message).to.equal('Invalid item id');
          done()
        })
    });

    it('should delete item successfully', async () => {
      result = await noteController.deleteNote('id');
      expect(findOneStub).to.have.been.calledWith('id');
      expect(removeStub).to.have.been.called;
      expect(result).to.eql({});
    });
  });
});