/**
 * 2-3树的结点
 *
 * @class TTNode
 */
class TTNode {
    // js中null可以使用===
    constructor(lkey=null, rkey=null, left, center, right) {
        this.lkey = lkey;
        this.rkey = rkey;
        this.left = null;
        this.center = null;
        this.right = null;
    }
    isLeaf() {
        return this.l === null;
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


class TTTree {
    constructor(cmp) {
        this.root = null;
        this.count = 0;
        this.cmp = cmp || cmpHelper;
    }
    find(k, it) {
        return this.findHelp(this.root, k, it);
    }
    findHelp(subroot, k, it) {
        if (subroot === null) {
            return false;
        }
        if (this.cmp.eq(subroot.lkey, k)) {
            // 如果是左key
            it.v = subroot.lkey;
            return true;
        }
        if (subroot.rkey !== null && (this.cmp.eq(subroot.rkey, k))) {
            // 如果是左key
            it.v = subroot.rkey;
            return true;
        }
        if (this.cmp.lt(k, subroot.lkey)) {
            // 在left
            return this.findHelp(subroot.left, k, it);
        } else if (subroot.rkey === null) {
            // 在center
            return this.findHelp(subroot.center, k, it);
        } else if (this.cmp.lt(k, subroot.rkey)) {
            // 在center
            return this.findHelp(subroot.center, k, it);
        } else {
            // 在right
            return this.findHelp(subroot.right, k, it);
        }
    }
    insertHelp(subroot, e, retval, retptr) {
        let myretv;
        let myretp;
        if(subroot === null) {
            // empty tree make new node
            subroot = new TTNode(e);
        }
        else if (subroot.isLeaf()) {
            // 在叶子结点，直接插入
            if (subroot.rkey === null) {
                // 这个结点还没有full
                // 保证插入的正确顺序，左小右大
                if(this.cmp.gt(e, subroot.lkey)) {
                    subroot.rkey = e;
                }
                else {
                    subroot.rkey = subroot.lkey;
                    subroot.lkey = e;
                }
            }
            else {
                // 这个需要提升结点的插入
                this.splitnode(subroot, e, null, retval, retptr);
            }
        }
        else if(this.cmp.lt(e, subroot.lkey)) {
            // insert a child
            this.insertHelp(subroot.lkey, e, myretv, myretp);
        }
        else if((subroot.rkey === null) && (this.cmp.lt(e, subroot.rkey))) {
            // 这个新节点比右结点小
            this.insertHelp(subroot.center, e, myretv, myretp);
        }
        else {
            // 这个新结点比右结点大
            this.insertHelp(subroot.right, e, myretv, myretp);
        }
        if (myretp !== null) {
            // child split : receive promoted value
            if(subroot.rkey!==null) {
                // full split node
                this.splitnode(subroot, myretv, myretp, retval, retptr);
            }
            else {
                // not full:add to this node
                if(this.cmp.lt(myretv, subroot.lkey)) {
                    subroot.rkey = subroot.lkey;
                    subroot.lkey = myretv;
                    subroot.right = subroot.center;
                    subroot.center = myretp;
                }
                else {
                    subroot.rkey = myretv;
                    subroot.right = myretp;
                }
            }
        }
        return true;
    }
    splitnode(subroot, inval, inptr, retval, retptr) {
        retptr = new TTNode();
        if(this.cmp.lt(inval, subroot.lkey)) {
            // add at left
            retval = subroot.lkey;
            retptr.lkey = subroot.rkey;
            retptr.left = subroot.center;
            retptr.center = subroot.right;
            subroot.center = inptr;
        }
        else if(this.cmp.lt(inval, subroot.rkey)) {
            // center
            retval = inval;
            retptr.lkey = subroot.rkey;
            retptr.lfet = inptr;
            retptr.center = subroot.right;
        }
        else {
            // add at right
            retval = subroot.rkey;
            retptr.lkey = inval;
            retptr.left = subroot.right;
            retptr.center = inptr;
        }
        subroot.rkey = null;
    }
}