const ROOT = -1;

class GenTree {
    constructor(size) {
        this.arr = new Array(size);
        this.size = size;
        this.init();
    }
    init() {
        this.arr.fill(-1);
    }
    /**
     *return true when a and b root is difference
     *
     * @param {*} a
     * @param {*} b
     * @returns
     * @memberof GenTree
     */
    differ(a, b) {
        let root1 = this.find(a);
        let root2 = this.find(b);
        return root1 !== root2;
    }
    /**
     * b union into a if it should
     *
     * @param {*} a
     * @param {*} b
     * @returns
     * @memberof GenTree
     */
    union(a, b) {
        let root1 = this.find(a);
        let root2 = this.find(b);
        if (root1 !== root2) {
            this.arr[root2] = root1;
        }
    }
    find(curr) {
        while (this.arr[curr] !== ROOT) {
            curr = this.arr[curr];
        }
        return curr;
    }
    union2(a, b) {
        let root1 = this.find2(a);
        let root2 = this.find2(b);
        if (root1 !== root2) {
            this.arr[root2] = root1;
        }
    }
    find2(curr) {
        if (this.arr[curr] === ROOT) {
            return curr;
        }
        return (this.arr[curr] = this.find2(this.arr[curr]));
    }
    toString() {
        return this.arr.join(' | ');
    }
}
// 5 0 0 5 3 -1 5 2 5 -1
// A B c D E F  G H I  J
const AJ = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const treeAJ = [
    { a: AJ.indexOf('A'), b: AJ.indexOf('B') },
    { a: AJ.indexOf('C'), b: AJ.indexOf('H') },
    // { a: AJ.indexOf('G'), b: AJ.indexOf('F') },
    { a: AJ.indexOf('F'), b: AJ.indexOf('G') },
    { a: AJ.indexOf('D'), b: AJ.indexOf('E') },
    // { a: AJ.indexOf('I'), b: AJ.indexOf('F') },
    { a: AJ.indexOf('F'), b: AJ.indexOf('I') },
    // { a: AJ.indexOf('H'), b: AJ.indexOf('A') },
    { a: AJ.indexOf('A'), b: AJ.indexOf('H') },
    { a: AJ.indexOf('E'), b: AJ.indexOf('G') },
    // { a: AJ.indexOf('H'), b: AJ.indexOf('E') },
    { a: AJ.indexOf('E'), b: AJ.indexOf('H') },
];
describe('测试GenTree', () => {
    // 结果不正确
    // it('', () => {
    //     let gentree = new GenTree(AJ.length);
    //     for (let i = 0; i < treeAJ.length; i++) {
    //         gentree.union(treeAJ[i].a, treeAJ[i].b);
    //     }
    //     console.log(gentree.toString());
    // });
    // it('', () => {
    //     let gentree = new GenTree(AJ.length);
    //     for (let i = 0; i < treeAJ.length; i++) {
    //         gentree.union2(treeAJ[i].a, treeAJ[i].b);
    //     }
    //     console.log(gentree.toString());
    // });   
});