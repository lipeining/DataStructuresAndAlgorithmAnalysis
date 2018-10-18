class Link {
    constructor(element = null, nextVal = null) {
        this.element = element;
        this.next = nextVal;
    }
}

class LinkList {
    constructor(equal) {
        // 有一个空的head节点
        this.equal = equal;
        this.init();
    }
    reverse() {
        // 需要处理空的头节点
        let t = this.head;
        let n = this.head.next;
        this.head.next = null;
        this.tail = this.head;
        while (!this.equal(n, null)) {
            let tmp = n.next;
            n.next = t;
            t = n;
            n = tmp;
        }
        this.head = t;
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
    find(e) {
        let temp = this.head.next;
        for (let i = 0; i < this.leftcnt + this.rightcnt; i++) {
            if(this.equal(temp.element, e)) {
                return i;
            }
        }
    }
    insert(e) {
        // insert at the front of right partition
        this.fence.next = new Link(e, this.fence.next);
        if (this.equal(this.fence, this.tail)) {
            this.tail = this.fence.next;
        }
        this.rightcnt++;
        return true;
    }
    append(e) {
        this.tail.next = new Link(e, null);
        this.tail = this.tail.next;
        this.rightcnt++;
        return true;
    }
    remove2(it) {
        // remove the first element in the right partition
        if (this.equal(this.fence.next, null)) {
            return false;
        }
        it.v = this.fence.next.element;
        let tmp = this.fence.next;
        this.fence.next = tmp.next;
        if (this.equal(tmp, this.tail)) {
            this.tail = this.fence;
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
        let it = this.fence.next.element;
        let tmp = this.fence.next;
        this.fence.next = tmp.next;
        if (this.equal(tmp, this.tail)) {
            this.tail = this.fence;
        }
        // delete tmp;
        this.rightcnt--;
        return it;
    }
    setStart() {
        this.fence = this.head;
        this.rightcnt += this.leftcnt;
        this.leftcnt = 0;
    }
    setEnd() {
        this.fence = this.tail;
        this.leftcnt += this.rightcnt;
        this.rightcnt = 0;
    }
    prev() {
        let h = this.head;
        if (h === this.fence) return;
        while (!this.equal(h.next, this.fence)) {
            h = h.next;
        }
        this.fence = h;
        this.leftcnt--;
        this.rightcnt++;
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
            it.v = this.fence.next.element;
            return true;
        }
    }
    getValue() {
        if (this.rightLength === 0) {
            return false;
        } else {
            return this.fence.next.element;
        }
    }
    print() {
        let str = '<';
        let i = this.head;
        while (!this.equal(i, this.fence)) {
            str += `${i.next.element} `;
            i = i.next;
        }
        str += `|`;
        while (i.next !== null) {
            str += `${i.next.element} `;
            i = i.next;
        }
        str += `>`;
        console.log(str);
        // console.log(this);
        return str;
    }
}



module.exports = LinkList;