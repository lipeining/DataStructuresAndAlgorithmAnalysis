const LStack = require('./LStack');
const data = [
    { n: 3, should: 8 },
    { n: 4, should: 12 },
    { n: 5, should: 17 }

]
describe('递归转栈', () => {
    it('test T(n)', () => {
        for (let t of data) {
            assert.equal(T(t.n), t.should);
        }
    })
    it('use LStack', () => {
        for (let t of data) {
            assert.equal(TwithStack(t.n), t.should);
        }
    });
});

/**
 * T(n) = T(floor(n/2)) + T(ceil(n/2)) + n; T(1) = 1;
 */
function T(n) {
    if (n === 1) {
        return 1;
    } else if (n === 2) {
        return 4;
    }
    return T(Math.floor(n / 2)) + T(Math.ceil(n / 2)) + n;
}


function TwithStack(n) {
    let stack = new LStack();
    // 初始化栈
    stack.push({ n: n });
    let t;
    let res = 0;
    while (t = stack.pop()) {

        if (t.n === 1) {
            // 终止条件
            res += 1;
        } else if (t.n === 2) {
            res += 4;
        } else {
            res += t.n;
            stack.push({ n: Math.floor(n / 2) });
            stack.push({ n: Math.ceil(n / 2) });
        }
        t = undefined;
    }
    return res;
}