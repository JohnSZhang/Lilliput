Model = require("../../src/lib/model.js");

describe("A test suite of model tests", function () {
    let model;
    let mock_agents, agents, sense_order, act_order;

    var create_mock_agents = function () {
        let sense_order = [];
        let act_order = [];
        let num_agents = 5;
        let agents = [];
        let agent_sense = function (i) {
            return function () {
                this.idx = i;
                sense_order.push(this.idx);
            }.bind(this);
        };
        let agent_act = function (i) {
            return function () {
                this.idx = i;
                act_order.push(this.idx);
            }.bind(this);
        };
        for (let j=0; j<num_agents; j++){
            agent = {};
            agent.sense = agent_sense(j);
            agent.act = agent_act(j);
            agents.push(agent);
        }
        return [agents, sense_order, act_order]
    };

    beforeEach(function () {
        model = new Model();
        mock_agents = create_mock_agents();
        agents = mock_agents[0];
        sense_order = mock_agents[1];
        act_order = mock_agents[2];
        model.set_agents(agents);
    });

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
        model.update_order = 'seq';
        model.update_agents();
        expect(sense_order).toEqual([0, 1, 2, 3, 4]);
        expect(act_order).toEqual([0, 1, 2, 3, 4]);
    });

    it ('correctly updates agents in random action mode', function () {
        model.update_order = 'rand';
        model.update_agents();
        expect(sense_order).not.toEqual([0, 1, 2, 3, 4]);
        expect(act_order).not.toEqual([0, 1, 2, 3, 4]);
    });

    it ('correctly updates agents in random action mode', function () {

    });


});