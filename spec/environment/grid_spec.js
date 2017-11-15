let _ = require('lodash');
let Helper = require("../../src/lib/helper.js");
let Grid = require("../../src/lib/environment/grid.js");

describe("A test suite for grid environments", function () {
    let grid;
    let agents;

    let create_agents = function (j) {
        let list = [];
        for (let i =0; i<j; i++) {
            list.push({id: i});
        }
        return list;
    };

    beforeEach(function () {
        grid = new Grid(2, 3);
        agents = create_agents(5);
    });

    it('creates the right shaped grid world', function () {
        grid = new Grid(3, 5);
        expect(grid.width).toBe(3);
        expect(grid.height).toBe(5);
        expect(grid.world.length).toBe(5);
        expect(grid.world[0].length).toBe(3);
    });

    it('does not allow double placement of agents', function () {
        grid.place_agents(agents);
        expect(function () {
            grid.place_agents(agents);
        }).toThrowError(Error, 'Agents have already been placed');
    });

    it('does not allow more agents then number of grid space', function () {
        grid = new Grid(2, 2);
        expect(function () {
            grid.place_agents(agents);
        }).toThrowError(Error, 'Trying to place more agents than number of available grids');
    });

    it('sequentially places agents', function () {
        grid = new Grid(5, 5);
        grid.place_agents(agents);
        console.log(grid.agent_pos)
        console.log(grid.world)
        expect(grid.agent_pos[0]).toEqual([0, 0]);
        expect(grid.agent_pos[3]).toEqual([0, 2]);
        expect(grid.world[0][4]).toEqual(4)
    });

    it('randomly places agents', function () {

    });

});
