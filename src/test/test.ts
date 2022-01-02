import chai from "chai";
import chaiHttp from "chai-http";
import Server from "../server";

chai.should();
chai.use(chaiHttp);

describe("TofA Test API", () => {
  // GET Route
  describe("GET /api/v1/photos", () => {
    it("It should return all the photos in memory store", (done) => {
      chai
        .request(Server)
        .get("/api/v1/photos")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.data.should.be.a("array");
        });
      done();
    });
  });

  describe("GET /api/v1/photos?orderBy=ASC&limit=50&page=2", () => {
    it("It should return all the photos based on the query", (done) => {
      chai
        .request(Server)
        .get("/api/v1/photos?orderBy=DESC&limit=70&page=2")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.data.should.be.a("array");
        });
      done();
    });
  });
});
