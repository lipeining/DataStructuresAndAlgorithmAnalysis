/**
 * 
 * full binary tree满二叉树，每一个结点都是 叶子结点 或者  有左右子结点的分支结点
 * complete binary tree 完全二叉树，一个d层的树，除了d-1层以外，都是满的（有左右结点）
 * 
 * 5.1 满二叉树定理  非空满二叉树的叶结点数等于其分支结点数加一
 * 5.2 一颗非空二叉树空子树的数目等于其结点数目加一
 * 
 */


class node {
    // js中null可以使用===
    constructor(e = null, l = null, r = null) {
        this.e = e;
        this.l = l;
        this.r = r;
    }
    isLeaf() {
        return this.l === null && this.r === null;
    }
}


const BST = require('./binarySearchTree');
const { HuffTree, LeafNode, IntlNode, HuffNode, buildHuff, buildHuffMinHeap } = require('./huffmanTree');
const SortList = require('../List/sortList');
const MinHeap = require('../heap/minheap');

describe('测试BST', () => {
    it('', () => {
        let b = new BST();
        assert.equal(b.preOrderToString(), '');
        b.insert(1);
        assert.equal(b.preOrderToString(), '1');
        b.insert(3);
        assert.equal(b.preOrderToString(), '1,3');
        b.insert(5);
        assert.equal(b.preOrderToString(), '1,3,5');
        b.insert(7);
        assert.equal(b.preOrderToString(), '1,3,5,7');
        b.insert(9);
        assert.equal(b.preOrderToString(), '1,3,5,7,9');
        b.insert(8);
        b.insert(10);
        assert.equal(b.preOrderToString(), '1,3,5,7,9,8,10');
        // console.log(b.inOrderToString());
        // console.log(b.postOrderToString());
        let it = {};
        assert.equal(b.find(10, it), true);
        b.remove(10);
        assert.equal(b.preOrderToString(), '1,3,5,7,9,8');
        b.remove(9);
        assert.equal(b.preOrderToString(), '1,3,5,7,8');
        console.log(smallCount(b.root, 5));
        assert.equal(smallCount(b.root, 5), 3);
        console.log(search(b.root, 5));
        assert.equal(search(b.root, 5), true);
        console.log(b.height()); // should be 5
        assert.equal(b.height(), 5);
        assert.equal(b.levelOrderToString(), '1,3,5,7,8');
        b.insert(10);
        b.insert(9);
        b.insert(11);
        console.log(b.leafCount()); // should be 2 即9,11
        assert.equal(b.leafCount(), 2);
        console.log(b.height()); // should be 7
        assert.equal(b.height(), 7);
        printRange(b.root, 3, 11);
    });
});

/**
 *查找二叉树中是否存在k
 *
 * @param {*} subroot
 * @param {*} k
 * @returns
 */
function search(subroot, k) {
    let tmp = {};
    inorderSearch(subroot, k, tmp);
    return tmp.find;
}

function inorderSearch(subroot, k, tmp) {
    if (subroot === null) {
        return;
    }
    inorderSearch(subroot.l, k, tmp);
    if (subroot.e === k) {
        tmp.find = true;
    }
    inorderSearch(subroot.r, k, tmp);
}


const cmp = {
    lt: (a, b) => {
        return a < b;
    },
    gt: (a, b) => {
        return a > b;
    },
    eq: (a, b) => {
        return _.isEqual(a, b);
    }
};

/**
 *打印一颗搜索二叉树BST中介入low , high的所有结点
 *
 * @param {*} subroot
 * @param {*} low
 * @param {*} high
 */
function printRange(subroot, low, high) {
    if (subroot === null) {
        return;
    }
    if (cmp.lt(subroot.e, low)) {
        // 如果这个结点比low还小,只能向右边 查找打印
        printRange(subroot.r, low, high);
    } else if (cmp.gt(subroot.e, high)) {
        // 如果这个结点比high还大，只能向左边查找打印
        printRange(subroot.l, low, high);
    } else {
        // 这个结点的值在Low和high之间
        console.log(` print range ${subroot.e}`);
        // 继续遍历别的结点
        printRange(subroot.l, low, high);
        printRange(subroot.r, low, high);
    }
}

/**
 *找出 BST中小于k的结点的数量
 *
 * @param {*} subroot
 * @param {*} k
 */
function smallCount(subroot, k) {
    // 因为 subroot和subroot.r结点之间的值对应区间[subroot.e, subroot.r.e];
    // 只需要向左子树出发即可
    if (subroot === null) {
        return 0;
    }
    if (!cmp.gt(subroot.e, k)) {
        console.log(1);
        return 1 + smallCount(subroot.l, k) + smallCount(subroot.r, k);
    }
    // 如果大于了k,那么接下来的右子树都应该大于k.，只能查找左子树
    return smallCount(subroot.l, k);
}

const huffCmpHelper = {
    lt: (a, b) => {
        return a.root.w < b.root.w;
    },
    gt: (a, b) => {
        return a.root.w > b.root.w;
    },
    eq: (a, b) => {
        return _.isEqual(a.root.w, b.root.w);
    }
};


describe('测试huffman tree', () => {
    it('', () => {
        let list = new SortList(huffCmpHelper);
        for (let i = 0; i < 6; i++) {
            // init 5 huffTree into list 
            list.insert(new HuffTree(`test${i}`, i));
        }
        list.insert(new HuffTree(33, 3));
        // console.log(list.toString());
        let tree = buildHuff(list);
        console.log(tree);
    });
});

let CharData = [
    { e: 'A', w: 2 },
    { e: 'B', w: 3 },
    { e: 'C', w: 5 },
    { e: 'D', w: 7 },
    { e: 'E', w: 11 },
    { e: 'F', w: 13 },
    { e: 'G', w: 17 },
    { e: 'H', w: 19 },
    { e: 'I', w: 23 },
    { e: 'J', w: 31 },
    { e: 'K', w: 37 },
    { e: 'L', w: 41 }
];

describe('测试huffman tree 5.21 ABCDEFGHIJKL', () => {
    it('', () => {
        let list = new SortList(huffCmpHelper);
        let total = 0;
        for (let i = 0; i < CharData.length; i++) {
            list.insert(new HuffTree(CharData[i].e, CharData[i].w));
            total += CharData[i].w;
        }
        // console.log(list.toString());
        let tree = buildHuff(list);
        console.log(tree.root.w);
        assert.equal(tree.root.w, total);
        assert.equal(tree.height(), 8);
        console.log(tree.height()); //should be 8
        console.log(tree.leafCount()); //should be 12
        assert.equal(tree.leafCount(), CharData.length);
    });
});


describe('测试huffman tree 使用 min heap 5.21 ABCDEFGHIJKL ', () => {
    it('', () => {
        let total = 0;
        let list = [];
        for (let i = 0; i < CharData.length; i++) {
            list.push(new HuffTree(CharData[i].e, CharData[i].w));
            total += CharData[i].w;
        }
        let heap = new MinHeap(list, undefined, huffCmpHelper);
        // console.log(heap.toString());
        let tree = buildHuffMinHeap(heap);
        console.log(tree.root.w);
        assert.equal(tree.root.w, total);
        assert.equal(tree.height(), 8);
        console.log(tree.height()); //should be 8
        console.log(tree.leafCount()); //should be 12
        assert.equal(tree.leafCount(), CharData.length);

        let itA = {};
        encode(tree.root, CharData[0].e, itA);
        console.log(itA);
        let itDecode = {};
        decode(tree.root, itA.v, itDecode);
        console.log(itDecode);
        itA = {};
        encode(tree.root, 'M', itA);
        console.log(itA);
    });
});

/**
 * 通过传入的arr，依次查找树，如果找到，返回之
 *
 * @param {*} root
 * @param {*} arr
 * @param {*} it
 */
function decode(root, arr, it) {
    let subroot = _.cloneDeep(root);
    try {
        // 如果是错误的arr，那么肯定会报错 不能读取null之类的
        for (let i = 0; i < arr.length; i++) {
            subroot = arr[i] === 0 ? subroot.l : subroot.r;
        }
        it.v = subroot.e;
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

/**
 * 找出huffTree中某一个叶子结点的编码
 *
 * @param {*} root
 * @param {*} e
 * @param {*} it
 * @returns
 */
function encode(root, e, it) {
    // find the e in the root and return 00101 string
    let tmp = {};
    encodeHelp(root, e, [], tmp);
    if (tmp.arr && tmp.arr.length) {
        it.v = tmp.arr;
        return true;
    } else {
        return false;
    }
}
/**
 * path记录走过的01
 * arr 返回结果
 *
 * @param {*} subroot
 * @param {*} e
 * @param {*} path
 * @param {*} arr
 * @returns
 */
function encodeHelp(subroot, e, path, tmp) {
    if (subroot === null) {
        return;
    }
    if (subroot.e === e) {
        // here we find the e;
        tmp.arr = path;
        return;
    }
    // 继续查找左，path添加0
    encodeHelp(subroot.l, e, path.concat(0), tmp);
    encodeHelp(subroot.r, e, path.concat(1), tmp);
}