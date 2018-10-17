class Link {
    constructor(elment = null, prevVal = null, nextVal = null) {
        this.elment = elment;
        this.prev = prevVal;
        this.next = nextVal;
    }
}

class LinkList {
    constructor(equal) {
        // 有一个空的head节点
        this.equal = equal;
        this.init();
    }
    removeAll() {
        while (!this.equal(this.head, null)) {
            this.fence = this.head;
            this.head = this.head.next;
            delete this.fence;
        }
    }
    init() {
        let t = new Link();
        this.head = t;
        this.tail = t;
        this.fence = t;
        this.leftcnt = 0;
        this.rightcnt = 0;
    }
    clear() {
        // this.removeAll();
        this.init();
    }
    insert(e) {
        // insert at the front of right partition
        this.fence.next = new Link(e, this.fence, this.fence.next);
        if (!this.equal(this.fence.next.next, null)) {
            this.fence.next.next.prev = this.fence.next;
        }
        if (this.equal(this.tail, this.fence)) {
            // add to the tail
            this.tail = this.fence.next;
        }
        this.rightcnt++;
        return true;
    }
    append(e) {
        let tmp = new Link(e, this.tail, null);
        this.tail.next = tmp;
        this.tail = tmp;
        this.rightcnt++;
        return true;
    }
    remove2(it) {
        // remove the first element in the right partition
        if (this.equal(this.fence.next, null)) {
            return false;
        }
        it.v = this.fence.next.elment;
        let tmp = this.fence.next;
        this.fence.next = tmp.next;
        // 如果是tail
        if (this.equal(tmp, this.tail)) {
            this.tail = this.fence;
        } else {
            tmp.next.prev = this.fence;
        }
        // delete tmp;
        this.rightcnt--;
        return true;
    }
    remove() {
        // remove the first element in the right partition
        if (this.equal(this.fence.next, null)) {
            return false;
        }
        let it = this.fence.next.elment;
        let tmp = this.fence.next;
        this.fence.next = tmp.next;
        // 如果是tail
        if (this.equal(tmp, this.tail)) {
            this.tail = this.fence;
        } else {
            tmp.next.prev = this.fence;
        }
        // delete tmp;
        this.rightcnt--;
        return it;
    }
    setStart() {
        this.fence = this.head;
        this.leftcnt += this.rightcnt;
        this.rightcnt = 0;
    }
    setEnd() {
        this.fence = this.tail;
        this.rightcnt += this.leftcnt;
        this.leftcnt = 0;
    }
    prev() {
        if (!this.equal(this.fence, this.head)) {
            this.fence = this.fence.prev;
            this.leftcnt--;
            this.rightcnt++;
        }
    }
    next() {
        if (!this.equal(this.fence, this.tail)) {
            this.fence = this.fence.next;
            this.leftcnt++;
            this.rightcnt--;
        }
    }
    leftLength() { return this.leftcnt; }
    rightLength() { return this.rightcnt; }
    setPos(pos) {
        if (pos < 0 || (pos > this.rightcnt + this.leftcnt)) {
            return false;
        }
        this.fence = this.head;
        for (let i = 0; i < pos; i++) {
            this.fence = this.fence.next;
        }
        return true;
    }
    getValue2(it) {
        if (this.rightLength === 0) {
            return false;
        } else {
            it.v = this.fence.next.elment;
            return true;
        }
    }
    getValue() {
        if (this.rightLength === 0) {
            return false;
        } else {
            return this.fence.next.elment;
        }
    }
    print() {
        let str = '<';
        let i = this.head;
        while (!this.equal(i, this.fence)) {
            str += `${i.next.elment} `;
            i = i.next;
        }
        str += `|`;
        while (!this.equal(i.next, null)) {
            str += `${i.next.elment} `;
            i = i.next;
        }
        str += `>`;
        console.log(str);
        // console.log(this);
        return str;
    }
}



module.exports = LinkList;