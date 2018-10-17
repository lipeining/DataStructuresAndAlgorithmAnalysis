const defaultSize = 16;

class AQueue {
    constructor(size = defaultSize) {
        // 构造一个n+1的数组，只存储n个元素， 循环队列
        this.front = 0;
        this.rear = 1;
        this.size = size + 1;
        this.array = new Array(this.size);
    }
    clear() {
        this.front = this.rear;
    }
    enqueue(e) {
        if (this.full()) {
            return false;
        }
        this.rear = (this.rear + 1) % this.size;
        this.array[this.rear] = e;
        return true;
    }
    dequeue() {
        if (this.empty()) {
            return null;
        }
        let it = this.array[this.front];
        this.front = (this.front + 1) % this.size;
        return it;
    }
    dequeue2(it) {
        if (this.empty()) {
            return null;
        }
        it.v = this.array[this.front];
        this.front = (this.front + 1) % this.size;
        return true;
    }
    frontValue2(it) {
        if (this.empty()) {
            return false;
        }
        it.v = this.array[this.front];
        return true;
    }
    frontValue() {
        if (this.empty()) {
            return null;
        }
        return this.array[this.front];
    }
    full() {
        return (this.rear + 2) % this.size === this.front;
    }
    empty() {
        return this.length() === 0;
    }
    length() {
        return (this.rear + this.size - this.front + 1) % this.size;
    }
}

module.exports = AQueue;