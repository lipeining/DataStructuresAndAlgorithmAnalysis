const arrayBasedList = require('./arrayBasedList');
const linkList = require('./linkList');
const prevNextList = require('./prevNextList');

function equal(a, b) {
    return _.isEqual(a, b);
}

describe('测试线性表', () => {
    it('测试表 arrayBasedList', () => {
        let list = new arrayBasedList();
        assert.equal(list.print(), '<|>');
        assert.equal(list.leftLength(), 0);
        assert.equal(list.rightLength(), 0);
        // insert one element
        list.insert(0);
        assert.equal(list.print(), '<|0 >');
        list.insert(1);
        assert.equal(list.print(), '<|1 0 >');
        console.log(list.remove());
        console.log(list.remove());
        assert.equal(list.print(), '<|>');
        list.insert(1);
        assert.equal(list.rightLength(), 1);
    });
    it('测试表 LinkList', () => {
        let list = new linkList(equal);
        assert(list.print(), '<|>');
        list.insert(0);
        assert.equal(list.print(), '<|0 >');
        assert.equal(list.rightLength(), 1);
        list.insert(1);
        assert.equal(list.print(), '<|1 0 >');
        assert.equal(list.rightLength(), 2);
        list.insert(2);
        list.print();
        assert.equal(list.rightLength(), 3);
        console.log(list.remove());
        console.log(list.remove());
        assert.equal(list.print(), '<|0 >');
        assert.equal(list.rightLength(), 1);
    });
    it('测试表 prevNextList', () => {
        let list = new prevNextList(equal);
        assert(list.print(), '<|>');
        list.insert(0);
        assert.equal(list.print(), '<|0 >');
        assert.equal(list.rightLength(), 1);
        list.insert(1);
        assert.equal(list.print(), '<|1 0 >');
        assert.equal(list.rightLength(), 2);
        list.insert(2);
        list.print();
        assert.equal(list.rightLength(), 3);
        console.log(list.remove());
        console.log(list.remove());
        assert.equal(list.print(), '<|0 >');
        assert.equal(list.rightLength(), 1);
    });
});