const UNVISITED = Number.MAX_SAFE_INTEGER;
const VISITED = Number.MIN_SAFE_INTEGER;
const INFINITY = Number.MAX_SAFE_INTEGER;

const Graphm = require('./graphm');
const Graphl = require('./graphl');

const A2DMatrix = new Graphm(6);
const A2DLink = new Graphl(6);
const data = [
    { v1: 'A', v2: 'C', wgt: 1 },
    { v1: 'A', v2: 'E', wgt: 1 },
    { v1: 'B', v2: 'C', wgt: 1 },
    { v1: 'B', v2: 'F', wgt: 1 },
    { v1: 'C', v2: 'A', wgt: 1 },
    { v1: 'C', v2: 'B', wgt: 1 },
    { v1: 'C', v2: 'D', wgt: 1 },
    { v1: 'C', v2: 'F', wgt: 1 },
    { v1: 'D', v2: 'C', wgt: 1 },
    { v1: 'D', v2: 'F', wgt: 1 },
    { v1: 'E', v2: 'A', wgt: 1 },
    { v1: 'E', v2: 'F', wgt: 1 },
    { v1: 'F', v2: 'B', wgt: 1 },
    { v1: 'F', v2: 'C', wgt: 1 },
    { v1: 'F', v2: 'D', wgt: 1 },
    { v1: 'F', v2: 'E', wgt: 1 }
];
const indexArr = 'ABCDEF'.split('');
for (let i = 0; i < data.length; i++) {
    A2DMatrix.setEdge(indexArr.indexOf(data[i].v1), indexArr.indexOf(data[i].v2), data[i].wgt);
    // A2DLink.setEdge(indexArr.indexOf(data[i].v1), indexArr.indexOf(data[i].v2), data[i].wgt);
}
const J1TO7 = new Graphm(7);
const data2 = [
    { v1: 'J1', v2: 'J2', wgt: 1 },
    { v1: 'J1', v2: 'J3', wgt: 1 },
    { v1: 'J2', v2: 'J4', wgt: 1 },
    { v1: 'J2', v2: 'J5', wgt: 1 },
    { v1: 'J2', v2: 'J6', wgt: 1 },
    { v1: 'J3', v2: 'J4', wgt: 1 },
    { v1: 'J4', v2: 'J5', wgt: 1 },
    { v1: 'J5', v2: 'J7', wgt: 1 }
];
const indexArr2 = 'J1,J2,J3,J4,J5,J6,J7'.split(',');
for (let i = 0; i < data2.length; i++) {
    J1TO7.setEdge(indexArr2.indexOf(data2[i].v1), indexArr2.indexOf(data2[i].v2), data2[i].wgt);
}
const A2EShort = new Graphm(5);
const data3 = [
    { v1: 'A', v2: 'B', wgt: 10 },
    { v1: 'A', v2: 'C', wgt: 3 },
    { v1: 'A', v2: 'D', wgt: 20 },
    { v1: 'B', v2: 'D', wgt: 5 },
    { v1: 'C', v2: 'B', wgt: 2 },
    { v1: 'C', v2: 'E', wgt: 15 },
    { v1: 'D', v2: 'E', wgt: 11 }
];
for (let i = 0; i < data3.length; i++) {
    A2EShort.setEdge(indexArr.indexOf(data3[i].v1), indexArr.indexOf(data3[i].v2), data3[i].wgt);
}
describe('测试图的 遍历', () => {
    it('', () => {
        console.log(A2DMatrix);
        // topsort(A2DMatrix);
        topsort(J1TO7);
        topsort2(J1TO7);
        let D = new Array(A2EShort.n()).fill(INFINITY);
        D[0] = 0;
        DijKstra(A2EShort, D);
        console.log(D);
        Floyd(A2EShort);
    });
});


function graphTraverse(G) {
    for (let v = 0; v < G.n(); v++) {
        G.setMark(v, UNVISITED);
    }
    for (let v = 0; v < G.n(); v++) {
        if (G.getMark(v) === UNVISITED) {
            // doTraverse(G, v);
            // 使用以下任意一种方式 周游 图
        }
    }
}

// DFS 利用栈 将顶点v的所有相关边 入栈， 然后弹出栈顶元素，再递归这个栈顶元素的边.
// PreVisit 指定再 子树被访问前需要对根节点进行处理，PostVisit则是要求再进入DFS的下一层递归前对节点进行处理
function DFS(G, v) {
    // PreVisit(G, v);
    G.setMark(v, VISITED);
    for (let w = G.first(v); w < G.n(); w = G.next(v, w)) {
        if (G.getMark(w) === UNVISITED) {
            DFS(G, w);
        }
    }
    // PostVisit(G, v);
}


// BFS 利用队列 将顶点v的所有相关边 入队， 然后弹出队头元素，再递归这个队头元素的边.
/**
 * Params{Array} Q
 */
function BFS(G, start, Q) {
    let v;
    let w;
    Q.push(start);
    G.setMark(v, VISITED);
    while (Q.length) {
        v = Q.shift();
        // PreVisit(G, v);
        for (w = G.first(v); w < G.n(); w = G.next(v, w)) {
            if (G.getMark(w) === UNVISITED) {
                G.setMark(w, VISITED);
                Q.push(w);
            }
        }
        // PostVisit(G, v);
    }
}

// 拓扑排序，如果我们需要为一组任务安排进度，只有一项任务的先决条件任务完成之后才可以开始这项任务，希望
// 以线性的顺序组织这些任务，以便能够满足先决条件的情况下逐个完成各项任务，
// 可以用一个 【有向无环图】为该问题建模
// 任务有先决条件，表示顶点之间有方向性 topological sort
// 可以对图进行深度优先搜索来查找拓扑序列，即 访问某一个节点时，PreVisit不做任何事，
// 当递归返回这个节点时，PostVisit打印这个节点，这样会产生一个逆序的 拓扑序列


// 可以使用队列 替代 递归
// 首先访问所有的边，计算指向每一个顶点的边数，也就是每一个顶点的先决条件数目。
// 将所有先决条件为0的放入队列，然后开始处理队列
// 当从队列中删除一个顶点时，把它打印出来，同时将所有相邻的顶点的先决条件-1， 当某一个顶点的先决条件为0时，入队。
// 如果还有顶点未打印，并且队列为空，则图必然包含回路。
function topsort(G) {
    for (let v = 0; v < G.n(); v++) {
        G.setMark(v, UNVISITED);
    }
    for (let v = 0; v < G.n(); v++) {
        if (G.getMark(v) === UNVISITED) {
            topHelp(G, v);
            // 使用以下任意一种方式 周游 图
        }
    }
}

function topHelp(G, v) {
    // PreVisit(G, v);
    G.setMark(v, VISITED);
    for (let w = G.first(v); w < G.n(); w = G.next(v, w)) {
        if (G.getMark(w) === UNVISITED) {
            topHelp(G, w);
        }
    }
    // PostVisit(G, v);
    // console.log(v);
    console.log(indexArr[v], indexArr2[v]);
}


function topsort2(G) {
    let q = new Array();
    let cnt = new Array(G.n());
    cnt.fill(0);
    let v;
    let w;
    for (v = 0; v < G.n(); v++) {
        for (w = G.first(v); w < G.n(); w = G.next(v, w)) {
            cnt[w]++; // add to w prereq point
        }
    }
    // 先决条件为0的入队
    for (v = 0; v < G.n(); v++) {
        if (!cnt[v]) {
            q.push(v);
        }
    }
    while (q.length) {
        v = q.shift();
        // console.log(v);
        console.log(indexArr2[v]);
        for (w = G.first(v); w < G.n(); w = G.next(v, w)) {
            cnt[w]--;
            if (!cnt[w]) {
                q.push(w);
            }
        }
    }
}



// Dijkstra 算法
function DijKstra(G, D, s) {
    let i;
    let v;
    let w;
    for (i = 0; i < G.n(); i++) {
        v = minVertex(G, D);
        if (D[v] === INFINITY) {
            return;
        }
        G.setMark(v, VISITED);
        for (w = G.first(v); w < G.n(); w = G.next(v, w)) {
            if (D[w] > (D[v] + G.weight(v, w))) {
                D[w] = D[v] + G.weight(v, w);
            }
        }
    }
}

function minVertex(G, D) {
    // 寻找未访问顶点最小D值
    let i;
    let v;
    for (i = 0; i < G.n(); i++) {
        if (G.getMark(i) === UNVISITED) {
            // set v to an unvisited vertex
            v = i;
            break;
        }
    }
    for (i++; i < G.n(); i++) {
        // find smallest D 
        if (G.getMark(i) === UNVISITED && (D[i] < D[v])) {
            v = i;
        }
    }
    return v;
}

function Floyd(G) {
    let D = new Array(G.n());
    for (let i = 0; i < G.n(); i++) {
        D[i] = new Array(G.n());
    }
    for (let i = 0; i < G.n(); i++) {
        for (let j = 0; j < G.n(); j++) {
            D[i][j] = G.weight(i, j);
        }
    }
    for (let i = 0; i < G.n(); i++) {
        for (let j = 0; j < G.n(); j++) {
            for (let k = 0; k < G.n(); k++) {
                if (D[i][j] > (D[i][k] + D[k][j])) {
                    D[i][j] = D[i][k] + D[k][j];
                }
            }
        }
    }
    console.log(D);
}