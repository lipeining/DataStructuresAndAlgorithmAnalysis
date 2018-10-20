const SortList = require('../List/sortList');
const MinHeap =  require('../heap/minheap');

/**
 *  node abstract base class
 *
 * @class HuffNode
 */
class HuffNode {
    constructor() {
    }
}

/**
 * 有权值的叶子结点，比如 w:1, val: z
 *
 * @class LeafNode
 */
class LeafNode {
    constructor(e, w) {
        this.l = null;
        this.r = null;
        this.e = e;
        this.w = w;
    }
    ifLeaf() {
        return true;
    }
}

/**
 * 两个 HuffNode的父结点，只有权值
 *
 * @class IntlNode
 */
class IntlNode {
    constructor(l, r) {
        this.w = l.w + r.w;
        this.l = l;
        this.r = r;
    }
    ifLeaf() {
        return false;
    }
}



/**
 *
 *
 * @class HuffTree
 */
class HuffTree {
    constructor(l, r) {
        if(l instanceof HuffTree && r instanceof HuffTree) {
            this.root = new IntlNode(l.root, r.root);
        } else {
            // 使用 e(l),w(r) 生成一个只有叶子结点的huffTree
            this.root = new LeafNode(l, r);
        }
    }
    height() {
        return this.heightHelp(this.root);
    }
    heightHelp(subroot) {
        if (subroot === null) {
            return 0;
        }
        return Math.max(this.heightHelp(subroot.l) + 1, this.heightHelp(subroot.r) + 1);
    }
    leafCount() {
        return this.leafCountHelp(this.root);
    }
    leafCountHelp(subroot) {
        if (subroot === null) {
            return 0;
        }
        if (subroot.l === null && subroot.r === null) {
            return 1;
        }
        return this.leafCountHelp(subroot.l) + this.leafCountHelp(subroot.r);
    }
}


/**
 *
 *
 * @param {*} list 需要是SList实例，有序列表，并且使用 a.w这个 cmpHelper, 里面每一个都是HuffTree实例
 */
function buildHuff(list) {
    if (!list instanceof SortList) {
        throw new Error('list is not a sortlist');
    }
    let temp1 = {};
    let temp2 = {};
    let temp3;
    while(list.length() > 1) {
        list.popHead(temp1);
        list.popHead(temp2);
        temp3 = new HuffTree(temp1.v, temp2.v);
        list.insert(temp3);
    }
    return temp3;
}



/**
 *
 *
 * @param {*} heap 最小堆，并且使用 a.w这个 cmpHelper, 里面每一个都是HuffTree实例
 */
function buildHuffMinHeap(heap) {
    if (!heap instanceof MinHeap) {
        throw new Error('heap is not a min heap');
    }
    let temp1 = {};
    let temp2 = {};
    let temp3;
    while(heap.size() > 1) {
        heap.removeMin(temp1);
        heap.removeMin(temp2);
        temp3 = new HuffTree(temp1.v, temp2.v);
        heap.insert(temp3);
    }
    return temp3;
}

module.exports = {
    LeafNode,
    IntlNode,
    HuffNode,
    HuffTree,
    buildHuff,
    buildHuffMinHeap
}