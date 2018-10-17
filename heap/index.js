const maxheap = require('./maxheap');

describe('测试最大堆', () => {
    it('', () => {
        let h = new maxheap([1, 2, 3, 4, 5, 6, 7]);
        console.log(h.toString());
        assert.equal(h.toString(), '7,5,6,4,2,1,3');
    });
});