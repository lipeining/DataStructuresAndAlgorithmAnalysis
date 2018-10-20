const util = require('util');
global._ = require('lodash');
global.assert = require('assert');

global.logObjDepth = function(obj, depth = 5) {
    console.log(util.inspect(obj, { depth }));
}

// require('./matchParentheses');


// require('./binarySearch');

// require('./List');

// require('./TOH');

// require('./stack');


// require('./queue');

require('./tree');

// require('./heap');
