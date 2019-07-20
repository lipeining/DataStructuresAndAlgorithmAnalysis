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
const THRESHOLD = 5;
const MaxHeap = require('../heap/maxheap');
const MaxBLength = 32;
const LinkList = require('../List/linkList');

function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

class ExSort {
    constructor(cmp = cmpHelper) {
        this.cmp = cmp;
    }
    // 将j向前插入到正确的位置，为此，需要不断地交换顺序
    inssort(arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = i;
                (j > 0) && (this.cmp.lt(arr[j], arr[j - 1])); j--) {
                swap(arr, j, j - 1);
            }
        }
    }
    // 用于shell排序的插入排序，incr为增量
    inssort2(arr, n, incr) {
        for (let i = incr; i < n; i += incr) {
            for (let j = i;
                (j >= incr) && (this.cmp.lt(arr[j], arr[j - incr])); j -= incr) {
                swap(arr, j, j - incr);
            }
        }
    }
    shellsort(arr) {
        // i为增量
        for (let i = Math.floor(arr.length / 2); i > 2; i = Math.floor(i / 2)) {
            for (let j = 0; j < i; j++) {
                this.inssort2(arr, arr.length - j, i);
            }
        }
        // 最后一次是为1的插入排序
        this.inssort2(arr, arr.length, 1);
    }

    // 第i次执行时，前i个一定是已经排序的了
    bubsort(arr) {
        // 这里将小的往数组头部冒泡
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = arr.length - 1; j >= 1 + i; j--) {
                if (this.cmp.lt(arr[j], arr[j - 1])) {
                    swap(arr, j, j - 1);
                }
            }
        }

        // 这里将大的往数组尾部冒泡
        // for (let i = 0; i < arr.length - 1; i++) {
        //     for (let j = 0; j < arr.length - 1 - i; j++) {
        //         if (this.cmp.gt(arr[j], arr[j + 1])) {
        //             swap(arr, j, j + 1);
        //         }
        //     }
        // }
    }
    // 选择排序，第i次选择第i小的记录，放在数组的第i个位置
    selsort(arr) {
        // 只排序n-1次，因为，n-1可以通过交换得到正确的顺序了
        // for (let i = 0; i < arr.length - 1; i++) {
        //     let low = i;
        //     // 假定最小为i
        //     // 从j开始，j前面的一定排序正确
        //     for (let j = i; j < arr.length; j++) {
        //         if (this.cmp.lt(arr[j], arr[low])) {
        //             low = j;
        //         }
        //     }
        //     swap(arr, i, low);
        // }

        // 排序，从大到小
        for (let i = arr.length - 1; i > 0; i--) {
            let high = i;
            // 假定最大为i
            // 从j开始，j后面的一定排序正确
            for (let j = i; j >= 0; j--) {
                if (this.cmp.gt(arr[j], arr[high])) {
                    high = j;
                }
            }
            swap(arr, i, high);
        }
    }

    qsort(arr, left, right) {
        if (right <= left) {
            return;
        }
        let pivot = arr[left];
        let l = left;
        let r = right;
        // pivot   | <= l|  ? ? |r > | 
        // 在l左边的是小于等于，在r右边的是大于 pivot的值1
        // 两者的关系可以调换2
        // 关于 里面的while中的(l<r)可以考虑，数组都是同样的1， 或者[1, n *2 ]
        while (l < r) {
            // 1
            // while ((l < r) && this.cmp.gt(arr[r], pivot)) {
            //     r--;
            // }
            // //   
            // swap(arr, l, r);
            // while ((l < r) && !this.cmp.gt(arr[l], pivot)) {
            //     l++;
            // }
            // swap(arr, l, r);

            // 2
            while ((l < r) && !this.cmp.lt(arr[r], pivot)) {
                r--;
            }
            //   
            swap(arr, l, r);
            while ((l < r) && this.cmp.lt(arr[l], pivot)) {
                l++;
            }
            swap(arr, l, r);
        }
        arr[r] = pivot;
        this.qsort(arr, left, l - 1);
        this.qsort(arr, l + 1, right);
    }
    mergesort(A, temp, left, right) {
        let mid = Math.floor((left + right) / 2);
        if (left === right) {
            return; // only one element
        }
        // 分治
        this.mergesort(A, temp, left, mid);
        this.mergesort(A, temp, mid + 1, right);
        // copy A to temp
        for (let i = left; i <= right; i++) {
            temp[i] = A[i];
        }
        let i1 = left;
        let i2 = mid + 1;
        // do the merge operation back to A
        for (let curr = left; curr <= right; curr++) {
            if (i1 === mid + 1) {
                // left sublist exhausted
                A[curr] = temp[i2++];
            } else if (i2 > right) {
                // right sublist exhausted
                A[curr] = temp[i1++];
            } else if (this.cmp.lt(temp[i1], temp[i2])) {
                A[curr] = temp[i1++];
            } else {
                A[curr] = temp[i2++];
            }
        }
    }
    mergesort2(A, temp, left, right) {
        if ((right - left) <= THRESHOLD) {
            // small list
            // let tmpArr = A.slice(left);
            // // this.inssort(&A[left], right - left + 1);
            // this.inssort(tmpArr, right - left + 1);
            // return;
            for (let i = left; i < right - left + 1; i++) {
                for (let j = i;
                    (j > left) && (this.cmp.lt(arr[j], arr[j - 1])); j--) {
                    swap(arr, j, j - 1);
                }
            }
            return;
        }
        let mid = Math.floor((left + right) / 2);
        let i;
        let j;
        let k;
        // 分治
        this.mergesort(A, temp, left, mid);
        this.mergesort(A, temp, mid + 1, right);
        // copy A to temp
        for (i = mid; i >= left; i--) {
            temp[i] = A[i];
        }
        for (j = 1; j < right - mid; j++) {
            temp[right - j + 1] = A[j + mid];
        }
        // do the merge operation back to A
        for (i = left, j = right, k = left; k <= right; k++) {
            if (temp[i] < temp[j]) {
                A[k] = temp[i++];
            } else {
                A[k] = temp[j--];
            }
        }
    }
    heapsort(A) {
        // 最大堆得到 从小到大的排序结果
        let h = new MaxHeap(A, A.length, this.cmp);
        let it = {};
        for (let i = 0; i < A.length; i++) {
            h.removeMax(it);
        }
        return h.heap;
        // A = [...h.heap];
    }
    binsort(A) {
        // 可以使用_.maxBy得到最大的A的值，那么就可以确定B的长度了
        let B = new Array(MaxBLength);
        let it = {};
        for (let i = 0; i < B.length; i++) {
            B[i] = new LinkList(this.cmp.eq);
        }
        for (let i = 0; i < A.length; i++) {
            B[A[i]].append(A[i]);
        }
        for (let i = 0; i < MaxBLength; i++) {
            console.log(`---i:${i} start ----`);
            for (B[i].setStart(); B[i].getValue2(it); B[i].next()) {
                console.log(it.v);
            }
            console.log(`---i:${i} end   ----`);
        }
    }
    radix(A, B, n, k, r, cnt) {
        // cnt[i] stores number of records in bin[i]
        let j;
        let i = 0;
        let rtok = 1;
        for (; i < k; i++, rtok *= r) {
            // for k digits
            for (j = 0; j < r; j++) {
                cnt[j] = 0;
            }
            // count the number of records for each bin on this pass
            for (j = 0; j < n; j++) {
                let index = Math.floor((A[j] / rtok) % r);
                cnt[index]++;
            }
            // index B;cnt[j] will be index for last slot of bin j
            for (j = 1; j < r; j++) {
                cnt[j] = cnt[j - 1] + cnt[j];
            }
            // put records into bins, work from bottom of each bin
            // since bins fill from botoom , j counts downwards
            for (j = n - 1; j >= 0; j--) {
                let index = Math.floor((A[j] / rtok) % r);
                B[--cnt[index]] = A[j];
            }
            // copy B back to A
            for (j = 0; j < n; j++) {
                A[j] = B[j];
            }
        }
    }
}


function mergesort(list) {
    if (list.length <= 1) {
        return list;
    }
    let half = Math.floor(list.length / 2);
    let l = list.slice(0, half);
    let r = list.slice(half, list.lenght);
    return merge(mergesort(l), mergesort(r));
}

function merge(left, right) {
    let list = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
        if (cmpHelper.lt(left[i], right[j])) {
            list.push(left[i]);
            i++;
        } else {
            list.push(right[j]);
            j++;
        }
    }
    for (; i < left.length; i++) {
        list.push(left[i]);
    }
    for (; j < right.length; j++) {
        list.push(right[j]);
    }
    return list;
}



// function quick_sort(array, l, r) {
//     if (l < r) {
//         let q = partition(array, l, r);
//         quick_sort(array, l, q - 1);
//         quick_sort(array, q + 1, r);
//     }
// }


// function partition(array, l, r) {
//     let x = array[r];
//     let i = l - 1;
//     for (let j = l; j <= r; j++) {
//         if (array[j] <= array[x]) {
//             i++;
//             swap(array, i, j);
//         }
//     }
//     swap(array, i + 1, r);
//     return i + 1;
// }


const data = [
    [2, 3, 7, 5, 6, 9, 5, 10, 3, 5, 6, 1]
];
describe('测试交换排序', () => {
    it('bubsort', () => {
        let exSort = new ExSort();
        let arr = [...data[0]];
        exSort.bubsort(arr);
        console.log(arr);
    });
    it('inssort', () => {
        let exSort = new ExSort();
        let arr = [...data[0]];
        exSort.inssort(arr);
        console.log(arr);
    });
    it('selsort', () => {
        let exSort = new ExSort();
        let arr = [...data[0]];
        exSort.selsort(arr);
        console.log(arr);
    });
    it('shellsort', () => {
        let exSort = new ExSort();
        let arr = [...data[0]];
        exSort.shellsort(arr);
        console.log(arr);
    });
    it('quick sort', () => {
        let exSort = new ExSort();
        let arr = [...data[0]];
        exSort.qsort(arr, 0, arr.length - 1);
        console.log(arr);
    });
    it('merge sort', () => {
        let arr = [...data[0]];
        let res = mergesort(arr);
        console.log(res);
    });
    it('merge sort', () => {
        let exSort = new ExSort();
        let arr = [...data[0]];
        let temp = [];
        exSort.mergesort(arr, temp, 0, arr.length - 1);
        console.log(arr);
    });
    // it('merge sort 2', () => {
    // // 无法使用指针排序A
    //     let exSort = new ExSort();
    //     let arr = [...data[0]];
    //     let temp = [];
    //     exSort.mergesort2(arr, temp, 0, arr.length - 1);
    //     console.log(arr);
    // });
    it('heap sort', () => {
        let exSort = new ExSort();
        let arr = [...data[0]];
        console.log(exSort.heapsort(arr));
    });
    it('bin sort', () => {
        let exSort = new ExSort();
        let arr = [...data[0]];
        exSort.binsort(arr);
    });
    it('radix sort', () => {
        let exSort = new ExSort();
        let arr = [27, 91, 1, 97, 17, 23, 84, 28, 72, 5, 67, 25];
        let B = new Array(12);
        let cnt = new Array(10);
        exSort.radix(arr, B, B.length, 2, 10, cnt);
        console.log(arr);
    });
});










// 带测试的代码，测试不通过

// qsort(arr, left, right) {
//     if (right <= left) {
//         // don't sort 0 or 1 elem
//         return;
//     }
//     let pivotIndex = this.findpivot(arr, left, right);
//     swap(arr, pivotIndex, right);
//     // 将pivot放到最后
//     // k 会是右数组的第一个位置
//     let k = this.partition(arr, left - 1, right, arr[right]);
//     swap(arr, k, right);
//     this.qsort(arr, left, k - 1);
//     this.qsort(arr, k + 1, right);
// }
// // 可以使用数组的中间点作为开始的pivot
// findpivot(arr, i, j) {
//     return Math.floor((i + j) / 2);
// }
// partition(arr, l, r, pivot) {
//     do {
//         while (this.cmp.lt(arr[++l], pivot))
//         ;
//         while ((r != 0) && this.cmp.gt(arr[--r], pivot))
//         ;
//         swap(arr, l, r);
//     } while (l < r);
//     return l;
// }