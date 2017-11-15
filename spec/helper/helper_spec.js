let _ = require('lodash');
let Helper = require("../../src/lib/helper.js");

describe("A test suite of helper tests", function () {
    let helper = new Helper();
    it('correctly creates a range permutation', function () {
       let x = helper.permutation(5);
       expect(x.length).toBe(5);
       expect(x).not.toEqual([0, 1, 2, 3, 4])
    });

});