class Edge {
    constructor(vertex = -1, weight = -1) {
        this.vertex = vertex;
        this.weight = weight;
    }
}
const UNVISITED = Number.MAX_SAFE_INTEGER;
const LinkList = require('../List/linkList');
const equal = (a, b) => {
    return a === b;
}
/**
 *链接表实现图
 * 因为许多图的算法是从一个给定顶点开始，利用first,next扩展，来处理所有的边，如果 setEdge,delEdge,weight一开始
 * 就检查需要的边是否是相关链表中的当前的边，会节省很多时间.
 * @class Graphl
 */
class Graphl {
    constructor(numVertex) {
        this.numVertex = numVertex;
        this.numEdge = 0;
        this.mark = new Array(numVertex);
        this.mark.fill(UNVISITED);
        this.matrix = new Array(numVertex);
        this.vertex = new Array(numVertex);
        for (let i = 0; i < numVertex; i++) {
            this.vertex[i] = new LinkList(equal);
        }
    }
    n() {
        return this.numVertex;
    }
    e() {
        return this.numEdge;
    }
    first(v) {
        let it = {};
        this.vertex[v].setStart();
        if (this.vertex[v].getValue2(it)) {
            return it.v.vertex;
        } else {
            return this.numVertex;
        }
        // return n if none
    }
    next(v1, v2) {
        // get v1's neighbor after v2
        let it = {};
        this.vertex[v1].getValue2(it);
        if (it.v.vertex === v2) {
            this.vertex[v1].next();
        } else {
            // start from the beginning of list
            this.vertex[v1].setStart();
            while (this.vertex[v1].getValue2(it) && (it.v.vertex <= v2)) {
                this.vertex[v1].next();
            }
        }
        if (this.vertex[v1].getValue2(it)) {
            return it.v.vertex;
        } else {
            return this.numVertex;
        }
    }
    setEdge(v1, v2, wgt) {
        assert(wgt > 0);
        let curr = {};
        this.vertex[v1].getValue2(curr);
        if (curr.v.vertex !== v2) {
            // 查找v2这条边
            for (this.vertex[v1].setStart(); this.vertex[v1].getValue2(curr); this.vertex[v1].next()) {
                if (curr.v.vertex >= v2) {
                    break;
                }
            }
        }
        if (curr.v.vertex === v2) {
            // clear out the current one
            this.vertex[v1].remove2(curr);
        } else {
            this.numEdge++;
        }
        let e = new Edge(v2, wgt);
        this.vertex[v1].insert(e);
    }
    delEdge(v1, v2) {
        let curr = {};
        this.vertex[v1].getValue2(curr);
        if (curr.v.vertex !== v2) {
            for (this.vertex[v1].setStart(); this.vertex[v1].getValue2(curr); this.vertex[v1].next()) {
                if (curr.v.vertex >= v2) {
                    break;
                }
            }
        }
        if (curr.v.vertex === v2) {
            // if not then there is none
            this.vertex[v1].remove2(curr);
            this.numEdge--;
        }
    }
    weight(v1, v2) {
        let curr = {};
        this.vertex[v1].getValue2(curr);
        if (curr.v.vertex !== v2) {
            for (this.vertex[v1].setStart(); this.vertex[v1].getValue2(curr); this.vertex[v1].next()) {
                if (curr.v.vertex >= v2) {
                    break;
                }
            }
        }
        if (curr.v.vertex === v2) {
            return curr.v.weight;
        } else {
            return 0;
        }
    }
    getMark(v) {
        return this.mark[v];
    }
    setMark(v, val) {
        this.mark[v] = val;
    }
}


module.exports = Graphl;