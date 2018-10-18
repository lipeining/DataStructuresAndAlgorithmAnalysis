class Link {
    constructor(element = null, nextVal = null) {
        this.element = element;
        this.next = nextVal;
    }
}

class LStack {
    constructor() {
        this.top = null;
        this.size = 0;
    }
    clear() {
        this.top = null;
    }
    push(e) {
        this.top = new Link(e, this.top);
        this.size++;
    }
    pop2(it) {
        if (!this.size) {
            return false;
        }
        it.v = this.top.element;
        this.top = this.top.next;
        this.size--;
        return true;
    }
    top2(it) {
        if (!this.size) {
            return false;
        }
        it.v = this.top.element;
        return true;
    }
    pop() {
        if (!this.size) {
            return null;
        }
        let it = this.top.element;
        this.top = this.top.next;
        this.size--;
        return it;
    }
    top() {
        if (!this.size) {
            return null;
        }
        return this.top.element;
    }
    empty() {
        return this.size === 0;
    }
    length() {
        return this.size;
    }
}

module.exports = LStack;