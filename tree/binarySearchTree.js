/**
 *
 *
 * @class node
 */
class Node {
    // js中null可以使用===
    constructor(e = null, l = null, r = null) {
        this.e = e;
        this.l = l;
        this.r = r;
    }
    // setVal(e) {
    //     this.e = e;
    // }
    // setLeft(b) {
    //     this.l = b;
    // }
    // setRight(b) {
    //     this.r = b;
    // }
    isLeaf() {
        return this.l === null && this.r === null;
    }
}
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

const LStack = require('../stack/LStack');
/**
 * 二叉查找树
 * 
 * @class BST
 * @param {Object} cmp 
 * @param {Object} cmp.lt
 * @param {Object} cmp.gt
 * @param {Object} [cmp.eq]
 */
class BST {
    constructor(cmp) {
        this.root = null;
        this.count = 0;
        this.cmp = cmp || cmpHelper;
    }
    clear() {
        this.root = null;
        this.count = 0;
    }
    insert(e) {
        this.root = this.insertHelp(this.root, e);
        this.count++;
        return true;
    }
    insertHelp(subroot, e) {
        if (subroot === null) {
            subroot = new Node(e);
            return subroot;
        } else if (this.cmp.lt(subroot.e, e)) {
            // 插到右边
            subroot.r = this.insertHelp(subroot.r, e);
        } else if (this.cmp.gt(subroot.e, e)) {
            // 插到左边
            subroot.l = this.insertHelp(subroot.l, e);
        } else {
            // 是否允许插入同样的值，即 之前已有e
            throw new Error('insert a e that already exists');
        }
        return subroot;
    }
    remove(k, it) {
        let t = null;
        this.root = this.removeHelp(this.root, k, t);
        if (t === null) {
            return false;
        }
        it.v = t.e;
        this.count--;
        return true;
    }
    removeHelp(subroot, k, t) {
        if (subroot === null) {
            return null;
        } else if (this.cmp.lt(k, subroot.e)) {
            subroot.l = this.removeHelp(subroot.l, k, t);
        } else if (this.cmp.gt(k, subroot.e)) {
            subroot.r = this.removeHelp(subroot.r, k, t);
        } else {
            // find k
            let temp = {};
            t = subroot;
            if (subroot.l === null) {
                // only one right child
                subroot = subroot.r;
            } else if (subroot.r === null) {
                // only one left child
                subroot = subroot.l;
            } else {
                // has left and right child
                subroot.r = deletemin(subroot.r, temp);
                let te = subroot.e;
                subroot.e = temp.e;
                temp.e = te;
                t = temp;
            }
        }
        return subroot;
    }
    deletemin(subroot, min) {
        // 删除值时，并不会真正删除对应值，只会删除该结点的右子树中最小的值所在的结点，然后替换被删除的结点
        if (subroot.l === null) {
            min = subroot;
            return subroot.r;
        } else {
            subroot.l = this.deletemin(subroot.l, min);
            return subroot;
        }
    }
    find(k, it) {
        return this.findHelp(this.root, k, it);
    }
    findHelp(subroot, k, it) {
        if (subroot === null) {
            return false;
        } else if (this.cmp.lt(subroot.e, k)) {
            // 在右边
            return this.findHelp(subroot.r, k, it);
        } else if (this.cmp.gt(subroot.e, k)) {
            // 在左边
            return this.findHelp(subroot.l, k, it);
        } else {
            it.v = subroot.e;
            return true;
        }
    }
    size() {
        return this.count;
    }
    preorder(subroot, arr) {
        if (subroot === null) {
            return;
        }
        arr.push(subroot.e);
        this.preorder(subroot.l, arr);
        this.preorder(subroot.r, arr);
    }
    preOrderToString() {
        let a = [];
        this.preorder(this.root, a);
        return a.toString();
    }
    inorder(subroot, arr) {
        if (subroot === null) {
            return;
        }
        this.inorder(subroot.l, arr);
        arr.push(subroot.e);
        this.inorder(subroot.r, arr);
    }
    inOrderToString() {
        let a = [];
        this.inorder(this.root, a);
        if (!a.length) {
            return 'empty tree';
        }
        return a.toString();
    }
    postorder(subroot, arr) {
        if (subroot === null) {
            return;
        }
        this.postorder(subroot.l, arr);
        this.postorder(subroot.r, arr);
        arr.push(subroot.e);
    }
    postOrderToString() {
        let a = [];
        this.postorder(this.root, a);
        if (!a.length) {
            return 'empty tree';
        }
        return a.toString();
    }
    levelOrderToString() {
        let stack = new LStack();
        let a = [];
        stack.push(this.root);
        while (!stack.empty()) {
            let it = {};
            stack.pop2(it);
            let tmp = it.v;
            // 如果是空的结点
            if (tmp === null) {
                continue;
            }
            a.push(tmp.e);
            // 将左右结点推进栈
            stack.push(tmp.l);
            stack.push(tmp.r);
        }
        console.log(a);
        return a.toString();
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
    height() {
        return this.heightHelp(this.root);
    }
    heightHelp(subroot) {
        if (subroot === null) {
            return 0;
        }
        return Math.max(this.heightHelp(subroot.l) + 1, this.heightHelp(subroot.r) + 1);
    }
}

module.exports = BST;

// /**
//  * Definition for a binary tree node.
//  * function TreeNode(val) {
//  *     this.val = val;
//  *     this.left = this.right = null;
//  * }
//  */
// /**
//  * @param {TreeNode} root
//  * @return {number[]}
//  */
// var inorderTraversal = function(root) {
    
//     let s = new Array();
//     let res = new Array();
//     if(root === null) {
//         return [];
//     }
//     else {
//                 // 需要不断更新root
//         while(root || s.length) {
//             while(root) {
//                 s.push(root);
//                 root = root.left;
//             }
//             root = s.pop();
//             res.push(root.val);
//             root = root.right;
//         }    
//         return res;
//     }
//     //     Set<Node> visited;
// //     Stack<Node> s;
// //     add root to s;
// //     while (s is not empty) {
// //         Node cur = the top element in s;
// //         return true if cur is target;
// //         for (Node next : the neighbors of cur) {
// //             if (next is not in visited) {
// //                 add next to s;
// //                 add next to visited;
// //             }
// //         }
// //         remove cur from s;
// //     }
// //     return false;
// };
