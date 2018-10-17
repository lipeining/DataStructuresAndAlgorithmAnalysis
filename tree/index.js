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
    });
});