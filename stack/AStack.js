const defaultSize = 16;

class AStack {
    constructor(size = defaultSize) {
        this.top = 0;
        this.size = size;
        this.array = new Array(this.size);
    }
    clear() {
        this.top = 0;
    }
    push(e) {
        if (this.top === this.size) {
            return false;
        }
        this.array[this.top++] = e;
    }
    pop() {
        if (!this.top) {
            return null;
        }
        return this.array[--this.top];
    }
    pop2(it) {
        if (!this.top) {
            return false;
        }
        it.v = this.array[--this.top]
        return true;
    }
    top2(it) {
        if (!this.top) {
            return false;
        }
        it.v = this.array[this.top - 1];
        return true;
    }
    top() {
        if (!this.top) {
            return null;
        }
        return this.array[this.top - 1];
    }
    empty() {
        return this.top === 0;
    }
    length() {
        return this.top;
    }
}

module.exports = AStack;