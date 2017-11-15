let _ = require('lodash');
let Helper = require('./helper.js');

class Model {
    constructor(opt) {
        let defaults = {
            max_step: 100,
            stop_criteria: undefined,
            agents: [],
            update_order: 'seq'
        };
        let options = _.defaults(opt, defaults);
        this.max_step = options.max_step;
        this.stop_criteria = options.stop_criteria;
        this.agents = options.agents;
        this.update_order = options.update_order;
        this.step_count = 0;
        this.helper = new Helper();
    }

    step(){
        this.update_agents();
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

    start() {
        this.step_til_end();
    }

    set_agents(agents) {
        if (!agents || !agents.length) {
            throw new Error('agents should be an array of at least length 1');
        }
        this.agents = agents
    }

    update_agents(){
        if (! this.agents || !this.agents.length) {
            throw new Error('Trying to update agents while there are no agents in the model');
        }
        switch(this.update_order) {
            case 'seq':
                this.seq_update();
                break;
            case 'rand':
                this.rand_update();
                break;
            case 'rand act':
                this.rand_act_update();
                break;
            default:
                throw new Error('Unknown agent update order, the valid choices are seq, rand, and rand act');
                break;
        }
    }
    seq_update(){
        this.agents.forEach(function (agent) {
            agent.sense();
            agent.act();
        });
    }
    rand_update(){
        let order = this.helper.permutation(this.agents.length);
        for (let j=0; j<this.agents.length; j++){
            let agent = this.agents[order[j]];
            agent.sense();
            agent.act();
        }
    }
    rand_act_update(){
        this.agents.forEach(function (agent) {
            agent.sense();
        });
        let order = this.helper.permutation(this.agents.length);
        for (let j=0; j<this.agents.length; j++) {
            let agent =this.agents[order[j]];
            agent.act();
        }
    }
};

module.exports = Model;