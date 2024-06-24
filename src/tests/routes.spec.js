const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");
const request = require("supertest");

const healthCheckController = require("../controllers/health.controller");
const noteController = require("../controllers/note.controller");

const sandbox = sinon.createSandbox();

let app = rewire("../app");

describe("Testing notes app routes", () => {
  afterEach(() => {
    app = rewire("../app");
    sandbox.restore();
  });

  describe("GET /health", () => {
    beforeEach(() => {
      sandbox.stub(healthCheckController, "healthCheckSync").returns("OK");
      sandbox.stub(healthCheckController, "healthCheckAsync").resolves("OK");
    });

    it("/sync should succeed", (done) => {
      request(app)
        .get("/health/sync")
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.have.property("health").to.equal("OK");
          done(err);
        });
    });

    it("/async should succeed", (done) => {
      request(app)
        .get("/health/async")
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.have.property("health").to.equal("OK");
          done(err);
        });
    });
  });

  describe("Testing /note route", () => {
    let sampleNote;

    beforeEach(() => {
      id = 12;
      sampleNote = {
        title: 'sample title',
        content: 'sample content'
      };
      updatedSampleNote = {
        title: 'updated title',
        content: 'updated content'
      };
      sandbox.stub(noteController, "createNote").resolves(sampleNote);
      sandbox.stub(noteController, "getNotes").resolves([sampleNote]);
      sandbox.stub(noteController, "getNote").resolves(sampleNote);
      sandbox.stub(noteController, "updateNote").resolves(updatedSampleNote);
      sandbox.stub(noteController, "deleteNote").resolves({});

    });

    it("GET / should return all notes", (done) => {
      request(app)
        .get(`/note/`)
        .expect(200)
        .end((err, response) => {
          expect(response.body)
            .to.have.property("message")
            .to.equal("Note read successfully!");
          expect(response.body)
            .to.have.property("note")
            .to.be.an("array")
            .to.have.lengthOf(1);
          expect(response.body.note[0])
            .to.have.property("title")
            .to.equal("sample title");
          expect(response.body.note[0])
            .to.have.property("content")
            .to.equal("sample content");
          done(err);
        });
    });

    it("POST / should create a new note", (done) => {
      request(app)
        .post("/note/")
        .send(sampleNote)
        .expect(200)
        .end((err, response) => {
          expect(response.body)
            .to.have.property("message")
            .to.equal("Note created successfully!");
            expect(response.body)
            .to.have.property("note")
            .to.have.property("title")
            .to.equal("sample title");
          expect(response.body)
            .to.have.property("note")
            .to.have.property("content")
            .to.equal("sample content");
          done(err);
        });
    });

    it("GET /:id should return specific note", (done) => {
      request(app)
        .get(`/note/${id}`)
        .expect(200)
        .end((err, response) => {
          expect(response.body)
            .to.have.property("message")
            .to.equal("Note read successfully!");
          expect(response.body)
            .to.have.property("note")
            .to.have.property("title")
            .to.equal("sample title");
          expect(response.body)
            .to.have.property("note")
            .to.have.property("content")
            .to.equal("sample content");
          done(err);
        });
    });

    it("PUT /:id should successfully update a note of a specific id", (done) => {
      request(app)
        .put(`/note/${id}`)
        .send(updatedSampleNote)
        .expect(201)
        .end((err, response) => {
          expect(response.body)
            .to.have.property("message")
            .to.equal("Note updated successfully!");
          expect(response.body)
            .to.have.property("note")
            .to.have.property("title")
            .to.equal("updated title");
            expect(response.body)
            .to.have.property("note")
            .to.have.property("content")
            .to.equal("updated content");
          done(err);
        });
    });

    it("DELETE /:id should successfully delete a note with a specific id", (done) => {
      request(app)
        .delete(`/note/${id}`)
        .expect(200)
        .end((err, response) => {
          expect(response.body)
            .to.have.property("message")
            .to.equal("Note deleted successfully!");
          done(err);
        });
    });
  });
});
