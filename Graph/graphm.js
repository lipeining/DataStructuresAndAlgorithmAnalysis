class Edge {
    constructor(vertex = -1, weight = -1) {
        this.vertex = vertex;
        this.weight = weight;
    }
}
const UNVISITED = Number.MAX_SAFE_INTEGER;
/**
 *相邻矩阵实现图
 *
 * @class Graphm
 */
class Graphm {
    constructor(numVertex) {
        this.numVertex = numVertex;
        this.numEdge = 0;
        this.mark = new Array(numVertex);
        this.mark.fill(UNVISITED);
        this.matrix = new Array(numVertex);
        for (let i = 0; i < numVertex; i++) {
            // this.matrix[i] = new Array(numVertex);
            this.matrix[i] = new Array(numVertex).fill(0);
        }
        // for(let i=0;i<numVertex;i++) {
        //     for(letj=0;j<numVertex;j++) {
        //         this.matrix[i][j] = 0;
        //     }
        // }
    }
    n() {
        return this.numVertex;
    }
    e() {
        return this.numEdge;
    }
    first(v) {
        let i;
        for ( i = 0; i < this.numVertex; i++) {
            if (this.matrix[v][i]) {
                return i;
            }
        }
        return i;
        // return n if none
    }
    next(v1, v2) {
        // get v1's neighbor after v2
        let i;
        for (i = v2 + 1; i < this.numVertex; i++) {
            if (this.matrix[v1][i]) {
                return i;
            }
        }
        return i;
    }
    setEdge(v1, v2, wgt) {
        assert(wgt > 0);
        if (this.matrix[v1][v2] === 0) {
            this.numEdge++;
        }
        this.matrix[v1][v2] = wgt;
    }
    delEdge(v1, v2) {
        if (this.matrix[v1][v2]) {
            this.numEdge--;
        }
        this.matrix[v1][v2] = 0;
    }
    weight(v1, v2) {
        return this.matrix[v1][v2];
    }
    getMark(v) {
        return this.mark[v];
    }
    setMark(v, val) {
        this.mark[v] = val;
    }
}


module.exports = Graphm;