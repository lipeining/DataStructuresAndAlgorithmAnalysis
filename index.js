const util = require('util');
global._ = require('lodash');
global.assert = require('power-assert');

global.logObjDepth = function(obj, depth = 5) {
    console.log(util.inspect(obj, { depth }));
}

// require('./matchParentheses');


// require('./binarySearch');

// require('./List');

// require('./TOH');

// require('./stack');


// require('./queue');

// require('./tree');

// require('./heap');


// require('./priorityQueue');


// require('./GenTree');


require('./Sort');

// require('./leetcode');

// require('./Graph');