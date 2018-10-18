const maxheap = require('./maxheap');
const minheap = require('./minheap');

describe('测试最大堆', () => {
    it('', () => {
        let h = new maxheap([1, 2, 3, 4, 5, 6, 7]);
        assert.equal(h.toString(), '7,5,6,4,2,1,3');
        let it = {};
        h.removeMax(it);
        assert.equal(it.v, 7);
        assert.equal(h.toString(), '6,5,3,4,2,1');
    });
    it('', () => {
        let h = new maxheap([1, 2, 3, 4, 5, 6, 7]);
        assert.equal(h.toString(), '7,5,6,4,2,1,3');
        let it = {};
        h.remove(0, it);
        assert.equal(it.v, 7);
        assert.equal(h.toString(), '6,5,3,4,2,1');
        h.insert(7);
        assert.equal(h.toString(), '7,5,6,4,2,1,3');
    });
    it('', () => {
        let h = new maxheap([1, 2, 3, 4, 4, 5, 5, 6, 6, 7]);
        console.log(h.toString());
    });
});

describe('测试最小堆', () => {
    it('', () => {
        let h = new minheap([1, 2, 3, 4, 5, 6, 7]);
        assert.equal(h.toString(), '1,2,3,4,5,6,7');
        let it = {};
        h.removeMin(it);
        assert.equal(it.v, 1);
        assert.equal(h.toString(), '2,4,3,7,5,6');
    });
    it('', () => {
        let h = new minheap([1, 2, 3, 4, 5, 6, 7]);
        assert.equal(h.toString(), '1,2,3,4,5,6,7');
        let it = {};
        h.remove(0, it);
        assert.equal(it.v, 1);
        assert.equal(h.toString(), '2,4,3,7,5,6');
        h.insert(1);
        assert.equal(h.toString(), '1,4,2,7,5,6,3');
    });
    it('查找最大的k个数', () => {
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 7];
        let res = findKmax(arr, 3);
        res.sort();
        console.log(res);
        assert.equal(res[0], 10);
    });
});

/**
 * @param {Array} arr 输入的数组
 * @returns {Array} res 返回的最大的k个数
 */
function findKmax(arr, k) {
    let h = new minheap(arr.slice(0, k), k);
    console.log(h.toString());
    for (let i = k; i < arr.length; i++) {
        h.findInsert(arr[i]);
        // console.log(h.findInsert(arr[i]));
    }
    // console.log(h.toString());
    return h.toString().split(',');
}