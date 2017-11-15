let _ = require('lodash');
let Helper = require('../helper.js');

class Grid{
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.world = [];
        this.placed_agents = false;
        for (let i=0; i<this.height; i++) {
            this.world.push(Array(this.width));
        }
        this.agent_lookup = {};
        this.agent_pos = {};
        this.helper = new Helper();
    }

    place_agents(agents, seq=true) {
        let i, j, k;
        let that = this;
        if (this.placed_agents) {
            throw Error('Agents have already been placed');
        }
        if (agents.length > (this.width * this.height)) {
            throw Error('Trying to place more agents than number of available grids');
        }
        if (seq) {
            i = 0;
            j = 0;
            agents.forEach(function (agent) {
                let id = agent.id;
                that.agent_lookup[id] = agent;
                that.world[i][j] = id;
                that.agent_pos[id] = [i, j];
                i = (i + 1) % that.height;
                if (i == 0) {
                    j += 1;
                }
            });
        } else {
            let grid_size = this.width * this.height;
            let permu = this.helper.permutation(grid_size);
            k = 0;
            agents.forEach(function (agent) {
                let id = agent.id;
                that.agent_lookup[id] = agent;
                let pos = permu[k];
                k+=1;
                i = Math.floor(pos/that.width);
                j = pos % that.width;
                that.world[i][j] = id;
                that.agent_pos[id] = [i, j];
            });
        }
        this.placed_agents = true;
    }

    get_neighbors(agent_id) {

    }

    update_environment() {
        //This is where the updating of environment occurs.
    }
}

module.exports = Grid;
