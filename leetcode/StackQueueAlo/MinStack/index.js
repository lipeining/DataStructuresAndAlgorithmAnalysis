describe('min stack', () => {
    it('', () => {
        let minstack = new MinStack();
        // minstack.push(-2);
        // minstack.push(0);
        // minstack.push(-3);
        // assert(minstack.getMin() === -3);
        // minstack.pop();
        // assert(minstack.top() === 0);
        // assert(minstack.getMin() === -2);
        // [null,null,null,null,2147483647,null,2147483646,null,2147483646,null,null,2147483647,2147483647,null,-2147483648,-2147483648,null,2147483647]
        minstack.push(6);
        minstack.push(6);
        minstack.push(7);
        assert( minstack.top() === 7);
        minstack.pop();
        assert(minstack.getMin() === 6);
        minstack.pop();
        assert(minstack.getMin() === 6);
        minstack.pop();
        minstack.push(7);
        assert( minstack.top() === 7);
        assert(minstack.getMin() === 7);
        minstack.push(-8);
        assert(minstack.top()===-8);
        assert(minstack.getMin()===-8);
        minstack.pop();
        assert(minstack.getMin()===7);
    });
});

// ["MinStack","push",      "push",      "push",     "top", "pop", "getMin", "pop", "getMin",  "pop", "push","
// [[],       [2147483646], [2147483646],[2147483647],[],    [],    [],      [],    [],          [],   [2147483647],
//                                                      7            6               6 

// top","getMin","push",       "top","getMin","pop","getMin"]
// [],    [],    [-2147483648],[],    [],     [],    []]
function min(arr) {
    // return _.min(arr);
    if (!arr.length) {
        return { min: undefined, ptr: undefined };
    }
    let min = arr[0];
    let ptr = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
            ptr = i;
        }
    }
    return { min, ptr };
}

class MinStack {
    constructor() {
        this.min = Number.MAX_SAFE_INTEGER; // 关于最小值的一个拷贝
        this.ptr = -1; // 指向最小的元素，不断更新
        this.arr = new Array();
    }
    getMin() {
        return this.ptr === -1 ? null : this.arr[this.ptr];
    }
    push(e) {
        this.arr.push(e);
        if (e < this.min) {
            this.ptr = this.arr.length - 1;
            this.min = e;
        }
        return true;
    }
    pop() {
        // 判断是否删除了最小值，需要吗?
        // 重要，应该使用ptr判断是否已经删除了最小值
        this.arr.pop();
        let last = this.arr.length;
        if (last === this.ptr) {
            //
            // let m = min(this.arr);
            // this.min = m || Number.MAX_SAFE_INTEGER;
            // this.ptr = m ? this.arr.findIndex((v) => { return v === m; }) : -1;
            let res = min(this.arr);
            this.min = res.min === undefined ? Number.MAX_SAFE_INTEGER : res.min;
            this.ptr = res.ptr === undefined ? -1 : res.ptr;
        }
        return true;
    }
    top() {
        return this.arr.length ? this.arr[this.arr.length - 1] : null;
    }
    isEmpty() {
        return !!this.arr.length;
    }
}