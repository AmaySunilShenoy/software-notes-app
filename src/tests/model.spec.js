const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const ValidationError = mongoose.Error.ValidationError;

var Note = require('../models/note.model');

describe('Testing Note model', () => {
  let sampleNote;

  beforeEach(() => {
    sampleNote = {
      title: 'sample title',
      content: 'sample content'
    };
  });

  it('it should throw an error due to missing fields', (done) => {
    const note = new Note();

    note.validate((err) => {
      if (err) {
        expect(err).to.be.instanceOf(ValidationError);
        done();
      } else {
        const unexpectedSuccessError = new Error('⚠️ Unexpected success!');
        done(unexpectedSuccessError);
      }
    });
  });

  it('it should create the item successfully with correct parameters', (done) => {
    const note = new Note(sampleNote);

    note.validate((err) => {
      if (err) {
        const unexpectedFailureError = new Error('⚠️ Unexpected failure!');
        done(unexpectedFailureError);
      } else {
        expect(note.title).to.equal('sample title');
        expect(note.content).to.equal('sample content');
        done();
      }
    });
  });
});