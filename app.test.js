const server = require("./app");
const request = require("supertest");



describe('Testing For Routes', () => {

  it('this should goto login page', () => {
    request(server).get("/login").expect(200);
  });

  it('user should login and redirect to countries list', () => {
    request(server).post("/login").expect(200);
  });

  it('this should display list of countries', () => {
    request(server).get("/countries").expect(200);
  });

  it('this should add new country', () => {
    request(server).get("/countries/new").expect(200);
  });

  it('country should be deleted', () => {
    request(server).delete("/countries/:id").expect(200);
  });

});
