const matchParent = require('./matchParent');
const LStack = require('../stack/LStack');

const list = [
    { str: '((())())()', should: -1 },
    { str: ')()(', should: 0 },
    { str: '()(', should: 2 },
    { str: '())', should: 2 },
    { str: '(', should: 0 },
    { str: ')', should: 0 },
];

describe('测试圆括号匹配', () => {
    it('should loop the list and get result', () => {
        for (let i = 0; i < list.length; i++) {
            assert.equal(matchParent(list[i].str), list[i].should, `${i} failed`);
        }
    });
    it('use stack', () => {
        for (let i = 0; i < list.length; i++) {
            assert.equal(matchParentStack(list[i].str), list[i].should, `${i} failed`);
        }
    });
});


function matchParentStack(str) {
    let stack = new LStack();
    let ptr = -1;
    // stack 存放的是ptr
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            stack.push(i);
        } else {
            if (stack.empty()) {
                // 多余的  )
                return i;
            }
            stack.pop();
        }
    }
    let it = {}
    while (stack.pop2(it)) {
        // 有多余的 (
        ptr = it.v;
        it = {};
    }
    return ptr;
}