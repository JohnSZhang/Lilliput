let _ = require('lodash');

class Helper{
    permutation(length) {
        let range = Array(length);
        for (let i=0; i<length; i++){
            range[i] = i;
        }
        return _.shuffle(range);
    }
}

module.exports = Helper;