Model = require("../../src/lib/model.js");

describe("A test suite of model tests", function () {
    var model;

    it('has correct initial step', function () {
        expect(model.step_count).toEqual(0);
    });

    it('steps correctly', function () {
        for (let i = 0; i < 5; i++){
            model.step();
        }
        expect(model.step_count).toEqual(5)
    });

    it('stops correctly on max step', function () {
        model.max_step = 10;
        model.step_til_end();
        expect(model.step_count).toEqual(10);
    });

    it('stops correctly on stop function', function(){
        let stop_crit = function (model) {
            if (model.step_count >= 10){
                return true;
            }
            return false;
        }
        model.max_step = 1000;
        model.stop_criteria = stop_crit;
        model.step_til_end();
        expect(model.step_count).toEqual(10);
    });

    it('correctly updates agents in sequential mode', function () {

    });

    it ('correctly updates agents in random action mode', function () {

    });


});