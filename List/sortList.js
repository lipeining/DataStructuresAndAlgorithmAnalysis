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

class SortList {
    constructor(cmp = cmpHelper) {
        this.cmp = cmp;
        this.arr = new Array();
    }
    insert(e) {
        // 插入需要保持有序
        let i;
        for (i = 0; i < this.arr.length; i++) {
            if (this.cmp.gt(this.arr[i], e)) {
                break;
            }
        }
        // insert after i
        this.arr.splice(i, 0, e);
        return true;
    }
    popHead(it) {
        if (!this.arr.length) {
            return false;
        }
        let tmpArr = this.arr.splice(0, 1);
        it.v = tmpArr[0];
        return true;
    }
    popEnd(it) {
        if (!this.arr.length) {
            return false;
        }
        let tmpArr = this.arr.splice(this.arr.length - 1, 1);
        it.v = tmpArr[0];
        return true;
    }
    find(e) {
        return this.arr.findIndex((v, i) => {
            return this.cmp.eq(v, e);
        });
    }
    length() {
        return this.arr.length;
    }
    toString() {
        return this.arr.toString();
    }
}

module.exports = SortList;