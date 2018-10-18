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
const {HuffTree, LeafNode, IntlNode, HuffNode, buildHuff} = require('./huffmanTree');
const SortList = require('../List/sortList');

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
    });
});

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
 *找出 BST中小于k的结点的数量
 *
 * @param {*} subroot
 * @param {*} k
 */
function smallCount(subroot, k) {
    // 因为 subroot和subroot.r结点之间的值对应区间[subroot.e, subroot.r.e];
    // 只需要向左子树出发即可
    if(subroot === null) {
        return 0;
    }
    if(!cmp.gt(subroot.e, k)) {
        console.log(1);
        return 1 + smallCount(subroot.l, k) + smallCount(subroot.r, k);
    }
    // 如果大于了k,那么接下来的右子树都应该大于k.，只能查找左子树
    return smallCount(subroot.l, k);
}
// describe('测试huffman tree', () => {
//     it('', () => {
//         const cmpHelper = {
//             lt: (a, b) => {
//                 return a.e.w < b.e.w;
//             },
//             gt: (a, b) => {
//                 return a.e.w > b.e.w;
//             },
//             eq: (a, b) => {
//                 return _.isEqual(a.e, b.e);
//             }
//         }
//         let list = new SortList(cmpHelper);
//         for (let i = 0; i < 6; i++) {
//             // init 5 leafNode into list
//             list.insert(new LeafNode(`test${i}`, i));
//         }
//         list.insert(new LeafNode(33, 3));
//         list.toString();
//         // let tree = buildHuff(list);
//         // console.log(tree);
//     });
// });