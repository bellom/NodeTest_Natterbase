const camp = require("../models/campground");
const middlewareObj = require("./index");
const request = require("supertest");


// TESTING FUNCTION; isLoggedIn
describe('Testing Functions', () => {

  it('testing isLoggedIn func; user is Authenticated', () => {
    let req = {};
    let next = jest.fn();
    let res = jest.fn();

    req.isAuthenticated = jest.fn(() => true);

    middlewareObj.isLoggedIn(req, res, next);

    expect(req.isAuthenticated).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(res).not.toHaveBeenCalled();
  });

  it('testing isLoggedIn func; user is not Authenticated', () => {
    let req = {};
    let res = {};
    let next = jest.fn();

    req.isAuthenticated = jest.fn(() => false);
    res.redirect = jest.fn();
    req.flash = jest.fn();

    middlewareObj.isLoggedIn(req, res, next);

    expect(req.isAuthenticated).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(req.flash).toHaveBeenCalledWith("error", "Please login first !");
    expect(res.redirect).toHaveBeenCalledWith("/login");
  });
})
