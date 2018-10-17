const LStack = require('../stack/LStack');
const LQueue = require('./LQueue');

describe('非空队列 倒置', () => {
    it('', () => {
        reverseQueue();
    });
});

function reverseQueue() {
    let Q = new LQueue();
    let S = new LStack();
    let original = [];
    for (let i = 1; i < 5; i++) {
        original.push(i);
        Q.enqueue(i);
    }
    // let it;
    // // 如果有一个元素0的话，无法继续循环
    // while (it = Q.dequeue()) {
    //     S.push(it);
    // }
    let it = {};
    while(Q.dequeue2(it)) {
        // 通过v取得值，然后再次初始化
        S.push(it.v);
        it = {};
    }
    while (it = S.pop()) {
        Q.enqueue(it);
    }
    original.reverse();
    for (let i = 0; i < original.length; i++) {
        assert.equal(original[i], Q.dequeue());
    }
}