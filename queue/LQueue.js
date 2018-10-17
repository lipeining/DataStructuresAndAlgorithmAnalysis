class Link {
    constructor(elment = null, nextVal = null) {
        this.elment = elment;
        this.next = nextVal;
    }
}

class LQueue {
    constructor() {
        // 有一个空的front节点
        this.init();
    }
    init() {
        this.size = 0;
        this.front = null;
        this.rear = null;
    }
    clear() {
        this.init();
    }
    enqueue(e) {
        let t = new Link(e);
        if (!this.size) {
            this.front = t;
            this.rear = t;
        } else {
            this.rear.next = t;
            this.rear = t;
        }
        this.size++;
    }
    dequeue() {
        if (this.empty()) {
            return null;
        }
        let it = this.front.elment;
        this.front = this.front.next;
        if (this.size === 1) {
            this.rear = this.front;
        }
        this.size--;
        return it;
    }
    dequeue2(it) {
        // 每次取到It之后，需要重新初始化It，否则会因为 弱引用 出现问题.
        if (this.empty()) {
            return false;
        }
        it.v = this.front.elment;
        this.front = this.front.next;
        if (this.size === 1) {
            this.rear = this.front;
        }
        this.size--;
        return true;
    }
    frontValue2(it) {
        if (this.empty()) {
            return false;
        }
        it.v = this.front.elment;
        return true;
    }
    frontValue() {
        if (this.empty()) {
            return null;
        }
        return this.front.elment;
    }
    empty() {
        return this.size === 0;
    }
    length() {
        return this.size;
    }
    print() {}
}



module.exports = LQueue;