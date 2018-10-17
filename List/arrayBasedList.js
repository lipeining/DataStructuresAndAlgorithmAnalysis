const defaultSize = 16;

class ArrayBasedList {
    constructor(size = defaultSize) {
        this.maxSize = size;
        this.listSize = 0;
        this.fence = 0;
        this.listArray = new Array(size);
    }
    clear() {
        this.listSize = 0;
        this.fence = 0;
        this.listArray = new Array(this.maxSize);
    }
    insert(e) {
        // insert at the front of right partition
        if (this.listSize === this.maxSize) {
            return false;
        } else {
            let i = this.listSize;
            while (i > this.fence) {
                this.listArray[i] = this.listArray[i - 1];
                i--;
            }
            this.listArray[i] = e;
            this.listSize++;
            return true;
        }
    }
    append(e) {
        if (this.listSize === this.maxSize) {
            return false;
        } else {
            this.listArray[this.listSize++] = e;
            return true;
        }
    }
    remove2(it) {
        // remove the first element in the right partition
        if (this.rightLength() === 0) {
            return false;
        } else {
            it.v = this.listArray[this.fence];
            for (let i = this.fence; i < this.listSize - 1; i++) {
                this.listArray[i] = this.listArray[i + 1];
            }
            this.listSize--;
            return true;
        }
    }
    remove() {
        // remove the first element in the right partition
        if (this.rightLength() === 0) {
            return false;
        } else {
            let e = this.listArray[this.fence];
            for (let i = this.fence; i < this.listSize - 1; i++) {
                this.listArray[i] = this.listArray[i + 1];
            }
            this.listSize--;
            return e;
        }
    }
    setStart() {
        this.fence = 0;
    }
    setEnd() {
        this.fence = this.listSize;
    }
    prev() {
        if (this.fence !== 0) this.fence--;
    }
    next() {
        if (this.fence <= this.listSize) this.fence++;
    }
    leftLength() {
        return this.fence;
    }
    rightLength() {
        return this.listSize - this.fence;
    }
    setPos(pos) {
        let check = pos >= 0 && pos <= this.listSize;
        if (check) {
            this.fence = pos;
        }
        return check;
    }
    getValue2(it) {
        if (this.rightLength() === 0) {
            return false;
        } else {
            it.v = this.listArray[this.fence];
            return true;
        }
    }
    getValue() {
        if (this.rightLength() === 0) {
            return false;
        } else {
            return this.listArray[this.fence];
        }
    }
    print() {
        let str = '<';
        let i = 0;
        while (i < this.fence) {
            str += `${this.listArray[i++]} `;
        }
        str += `|`;
        while (i < this.listSize) {
            str += `${this.listArray[i++]} `;
        }
        str += `>`;
        console.log(str);
        // console.log(this.listArray);
        return str;
    }
}

module.exports = ArrayBasedList;