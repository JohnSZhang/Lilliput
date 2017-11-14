let _ = require('lodash');

class Model {
    constructor(opt) {
        let defaults = {
            max_step: 100,
            stop_criteria: undefined,
        };
        let options = _.defaults(opt, defaults);
        this.max_step = options.max_step;
        this.stop_criteria = options.stop_criteria;
        this.step_count = 0;
    }
    step(){
        this.step_agents();
        this.step_count += 1;
    }
    step_til_end(){
        let stop = false;
        if (this.stop_criteria === undefined) {
            while(this.step_count < this.max_step) {
                this.step();
            }
        } else {
            while (!stop) {
                this.step();
                stop = this.stop_criteria(this);
            }
        }
    }
    step_agents(){
        return true;
    }
};

module.exports = Model;