const MaxHeap = require('../heap/maxheap');


const cmpHelper = {
    lt: (a, b) => {
        return a.priority < b.priority;
    },
    gt: (a, b) => {
        return a.priority > b.priority;
    },
    eq: (a, b) => {
        return a.priority === b.priority;
    }
}
/**
 *
 * 
 * @class PQueue
 */
class PQueue {
    constructor(cmp = cmpHelper) {
        this.heap = new MaxHeap([], undefined, cmp);
    }
    /**
     *
     * 有priority, id的对象
     * @param {*} id
     * @memberof PQueue
     */
    enqueue(id, priority) {
        this.heap.insert({ id, priority });
    }
    dequeue(it) {
        let tmp = {};
        if (this.heap.removeMax(tmp)) {
            // 取到了最大值
            it.v = tmp.v.id;
            return true;
        } else {
            // 没有元素
            return false;
        }
    }
    peek(it) {
        let tmp = {};
        if (this.heap.getMax(tmp)) {
            // 取到了最大值
            it.v = tmp.v.id;
            return true;
        } else {
            // 没有元素
            return false;
        }
    }
    findIndex(id) {
        return this.heap.findIndex((element, index, array) => {
            return element.id === id;
        });
    }
    changePriority(id, newPriority) {
        let pos = this.heap.findIndex((element, index, array) => {
            return element.id === id;
        });
        if (pos === -1) {
            return false;
        }
        this.heap.remove(pos, {});
        this.heap.insert({ id, priority: newPriority });
        return true;
    }
    toString() {
        return this.heap.toString();
    }
}

describe('测试优先队列', () => {
    it('', () => {
        let Q = new PQueue();
        for (let i = 1; i < 6; i++) {
            Q.enqueue(`id:${i}`, i);
        }
        let peek = {};
        assert.equal(Q.peek(peek), true);
        assert.equal(peek.v, `id:5`);
        assert.equal(Q.findIndex(`id:5`), 0);
        Q.toString();
        assert.equal(Q.dequeue(peek), true);
        assert.equal(peek.v, `id:5`);
        assert.equal(Q.findIndex(`id:5`), -1);
        assert.equal(Q.changePriority(`id:5`, 6), false);
        assert.equal(Q.changePriority(`id:4`, 40), true);
        Q.toString();
    });
});