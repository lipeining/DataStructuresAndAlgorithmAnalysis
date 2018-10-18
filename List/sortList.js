const LinkList = require('./linkList');

const cmpHelper = {
    lt: (a, b) => {
        return a < b;
    },
    gt: (a, b) => {
        return a > b;
    },
    eq: (a, b) => {
        return _.isEqual(a, b);
    }
}

class Link {
    constructor(element = null, nextVal = null) {
        this.element = element;
        this.next = nextVal;
    }
}

class SortList {
    constructor(cmp = cmpHelper) {
        this.cmp = cmp;
        this.list = new LinkList(cmp.eq);
    }
    insert(e) {
        // 插入需要保持有序
        let p = this.list.head.next;
        let q = this.list.head;
        let i = 0;
        let len = this.list.leftLength() + this.list.rightLength();
        while (p !== null && i < len) {
            if (this.cmp.gt(p.element, e)) {
                // p 大于e时，插入到p的前面，也就是q的后面
                break;
            }
            p = p.next;
            q = q.next;
            i++;
        }
        // 插入到i这个位置后面,也就是q的后面
        q.next = new Link(e, q.next);
        if (i === len) {
            this.list.tail = q.next;
        }
        if (i < this.list.leftLength()) {
            this.list.leftcnt++;
        } else {
            this.list.rightcnt++;
        }
        return;
    }
    remove(it) {
        return this.list.remove2(it);
    }
    setStart() {
        this.list.setStart();
    }
    setEnd() {
        this.list.setEnd();
    }
    find(e) {
        this.list.find(e);
    }
    leftLength() {
        return this.list.leftLength();
    }
    rightLength() {
        return this.list.rightLength();
    }
    toString() {
        return this.list.print();
    }
}

module.exports = SortList;