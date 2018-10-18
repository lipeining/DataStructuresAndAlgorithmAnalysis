const SortList = require('../List/sortList');

/**
 *只有weight的HuffmanNode结点，是两个叶子结点的父结点
 *
 * @class HuffNode
 */
class HuffNode {
    constructor(w, l, r) {
        this.weight = w;
        this.l = l;
        this.r = r;
    }
    ifLeaf() {
        return this.l === null && this.r === null;
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
        this.root = new IntlNode(l.root, r.root);
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
    for (list.setStart(); list.leftLength() + list.rightLength() > 1; list.setStart()) {
        list.remove(temp1);
        list.remove(temp2);
        temp3 = new HuffTree(temp1.v, temp2.v);
        list.insert(temp3);
    }
    return temp3;
}

module.exports = {
    LeafNode,
    IntlNode,
    HuffNode,
    HuffTree,
    buildHuff
}