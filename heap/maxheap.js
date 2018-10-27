const defaultMax = 16;
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
/**
 * 
 * n表示二叉树结点的总数， r表示数组下标[0,n-1]
 * 
 * Parent = Math.floor((r-1)/2) r!=0
 * 
 * LeftChirld = 2*r+1, when 2*r+1<n
 * 
 * RightChrild = 2*r+2, when 2*r+2<n
 * 
 * LeftSibling = r-1, r is even and r in [0,n-1]
 * 
 * RightSibling = r+1, r is odd and r+1<n 
 * 
 * 
 */

/**
 *
 *
 * @class maxheap
 */
class maxheap {
    constructor(arr = [], max = defaultMax, cmp) {
        // 使用数组初始化,最多max个元素
        this.heap = [...arr].concat(new Array(max - arr.length));
        this.n = arr.length;
        this.max = max;
        this.cmp = cmp || cmpHelper;
        this.buildHeap();
    }
    size() {
        return n;
    }
    isLeaf(pos) {
        // true if the pos is leaf 是否是叶结点
        return (pos >= Math.floor(this.n / 2)) && (pos < this.n);
    }
    leftChild(pos) {
        // return left child position
        return pos * 2 + 1;
    }
    rightChild(pos) {
        // return right child position
        return pos * 2 + 2;
    }
    parent(pos) {
        return Math.floor((pos - 1) / 2);
    }
    /**
     *
     *
     * @param {*} fn (element, index, array)
     * @memberof maxheap
     */
    findIndex(fn) {
        let index = this.heap.findIndex(fn);
        return index >= this.n ? -1 : index;
    }
    insert(e) {
        // 将e置于数组末尾位n，与其父结点比较，如果小于等于，那么已经处于正确的位置，否则和父结点交换位置。
        if (this.n >= this.max) {
            // 已满
            return false;
        }
        let cur = this.n++;
        this.heap[cur] = e;
        // 一直和父结点比较
        while ((cur != 0) && this.cmp.gt(this.heap[cur], this.heap[this.parent(cur)])) {
            swap(this.heap, cur, this.parent(cur));
            cur = this.parent(cur);
        }
        return true;
    }
    getMax(it) {
        if (this.n === 0) {
            return false;
        }
        it.v = this.heap[0];
        return true;
    }
    removeMax(it) {
        // remove the max value,
        // 直接将第一个元素取出，放在最后的位置，然后n--，那么堆的大小减一。重新排堆
        if (this.n === 0) {
            return false;
        }
        swap(this.heap, 0, --this.n);
        // swap(this.heap, 0, this.n-1);
        // this.n--;
        if (this.n != 0) {
            this.shiftDown(0);
        }
        it.v = this.heap[this.n];
        return true;
    }
    remove(pos, it) {
        // remove the value from given ${pos} position
        if ((pos < 0) || (pos >= this.n)) {
            return false;
        }
        swap(this.heap, pos, --this.n);
        while ((pos != 0) && (this.cmp.gt(this.heap[pos], this.heap[this.parent(pos)]))) {
            // 不断往上传递值
            swap(this.heap, pos, this.parent(pos));
        }
        this.shiftDown(pos);
        it.v = this.heap[this.n];
        return true;
    }
    buildHeap() {
        for (let i = Math.floor(this.n / 2) - 1; i >= 0; i--) {
            this.shiftDown(i);
        }
    }
    shiftDown(pos) {
        while (!this.isLeaf(pos)) {
            // stop if it is a leaf,
            let j = this.leftChild(pos);
            let r = this.rightChild(pos);
            if ((r < this.n) && (this.cmp.lt(this.heap[j], this.heap[r]))) {
                // 如果存在右结点，并且右结点大于左结点。
                // 将j设置为最大的子结点位置
                j = r;
            }
            if (!this.cmp.lt(this.heap[pos], this.heap[j])) {
                // 如果pos不小于最大的子结点，那么可以了
                return;
            }
            // 否则，这个结点需要继续向下移动
            swap(this.heap, pos, j);
            pos = j;
        }
    }
    toString() {
        console.log(this);
        return this.heap.slice(0, this.n).toString();
    }
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}


module.exports = maxheap;