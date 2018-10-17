
const listNotRepeat = [
    { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9], target: 5 },
    { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9], target: 10 },
    { arr: [1, 3, 5, 7, 9, 11, 13, 15], target: 5 },
    { arr: [1, 3, 5, 7, 9, 11, 13, 15], target: 6 },
];

const listRepeat = [
    { arr: [1, 2, 3, 3, 4, 5, 5, 5, 6, 7, 8, 9], target: 5 },
    { arr: [1, 2, 3, 3, 4, 5, 5, 5, 6, 7, 8, 9, 10], target: 5 },
    { arr: [1, 2, 3, 3, 4, 5, 5, 5, 6, 7, 8, 9, 10], target: 3 },
    { arr: [1, 3, 5, 7, 9, 11, 11, 11, 13, 13, 15], target: 5 },
    { arr: [1, 3, 5, 7, 9, 11, 11, 11, 13, 13, 15], target: 6 },
];

const listMaxSmall = [
    { arr: [1, 2, 3, 3, 5, 5, 5, 6, 7, 8, 9], target: 4, should: 3 },
    { arr: [1, 2, 3, 3, 5, 5, 5, 6, 7, 8, 9], target: 5, should: 4 },
    { arr: [1, 2, 3, 3, 5, 5, 5, 6, 7, 8, 9, 10], target: 4, should: 3 },
    { arr: [3, 3, 4, 5, 5, 5, 6, 7, 8, 9, 10], target: 2, should: -1 },
    { arr: [3, 3, 4, 5, 5, 5, 6, 7, 8, 9, 10], target: 11, should: 10 },
    { arr: [1, 3, 5, 7, 9, 11, 11, 11, 13, 13, 15], target: 6, should: 2 },
    { arr: [1, 3, 5, 7, 9, 11, 11, 11, 13, 13, 15], target: 8, should: 3 },
];


const listMaxBig = [
    { arr: [1, 2, 3, 3, 5, 5, 5, 6, 7, 8, 9], target: 4, should: 4 },
    { arr: [1, 2, 3, 3, 5, 5, 5, 6, 7, 8, 9], target: 5, should: 6 },
    { arr: [1, 2, 3, 3, 5, 5, 5, 6, 7, 8, 9, 10], target: 4, should: 4 },
    { arr: [3, 3, 4, 5, 5, 5, 6, 7, 8, 9, 10], target: 2, should: 0 },
    { arr: [3, 3, 4, 5, 5, 5, 6, 7, 8, 9, 10], target: 11, should: -1 },
    { arr: [1, 3, 5, 7, 9, 11, 11, 11, 13, 13, 15], target: 6, should: 3 },
    { arr: [1, 3, 5, 7, 9, 11, 11, 11, 13, 13, 15], target: 8, should: 4 },
];


describe('测试二分查找', () => {
    it('不重复元素的二分查找', () => {
        for (let i = 0; i < listNotRepeat.length; i++) {
            let should = listNotRepeat[i].arr.indexOf(listNotRepeat[i].target);
            assert.equal(binaryNotRepeat(listNotRepeat[i].arr, listNotRepeat[i].target), should, `${i} failed`);
        }
    });
    it('重复元素的二分查找,最左一个', () => {
        for (let i = 0; i < listRepeat.length; i++) {
            let should = listRepeat[i].arr.indexOf(listRepeat[i].target);
            let find = binaryLeft(listRepeat[i].arr, listRepeat[i].target);
            assert.equal(find, should, `${i} failed`);
        }
    });
    it('重复元素的二分查找,最右一个', () => {
        for (let i = 0; i < listRepeat.length; i++) {
            let should = listRepeat[i].arr.lastIndexOf(listRepeat[i].target);
            let find = binaryRight(listRepeat[i].arr, listRepeat[i].target);
            assert.equal(find, should, `${i} failed`);
        }
    });
    it('重复元素的二分查找, k不存在时，返回数组中小于k的最大元素的位置', () => {
        for (let i = 0; i < listMaxSmall.length; i++) {
            let should = listMaxSmall[i].should;
            let find = binaryMaxSmallThanK(listMaxSmall[i].arr, listMaxSmall[i].target);
            assert.equal(find, should, `${i} failed`);
        }
    });
    it('重复元素的二分查找, n>=K, 返回n的位置', () => {
        for (let i = 0; i < listMaxBig.length; i++) {
            let should = listMaxBig[i].should;
            let find = binaryMinBigThanK(listMaxBig[i].arr, listMaxBig[i].target);
            assert.equal(find, should, `${i} failed`);
        }
    });
});


function binaryNotRepeat(arr, target) {
    let left = -1;
    let right = arr.length;
    while (left + 1 != right) {
        let i = Math.floor((left + right) / 2);
        if (arr[i] < target) {
            // on the rigth side
            left = i;
        } else if (arr[i] > target) {
            // on the left side
            right = i;
        } else {
            return i;
        }
    }
    return -1;
}

function binaryLeft(arr, target) {
    let left = -1;
    let right = arr.length;
    while (left < right) {
        let i = Math.floor((left + right) / 2);
        if (arr[i] < target) {
            // on the rigth side
            left = i + 1;
        } else {
            // (arr[i] >= target) 
            // on the left side
            right = i;
        }
    }
    assert.equal(left, right, `left is not equal right : [${left}] !== [${right}]`)
    return arr[left] === target ? left : -1;
}

function binaryRight(arr, target) {
    let left = -1;
    let right = arr.length;
    while (left < right) {
        // left和right可能相等，可能是left+1=right。
        let i = Math.ceil((left + right) / 2);
        if (arr[i] <= target) {
            // on the rigth side
            left = i;
        } else {
            // (arr[i] > target) 
            // on the left side
            right = i - 1;
        }
    }
    return arr[right] === target ? right : -1;
}


function binaryMaxSmallThanK(arr, target) {
    let left = -1;
    let right = arr.length;
    while (left < right) {
        let i = Math.floor((left + right) / 2);
        if (arr[i] < target) {
            // on the rigth side
            left = i + 1;
        } else {
            // (arr[i] >= target) 
            // on the left side
            right = i;
        }
    }
    assert.equal(left, right, `left is not equal right : [${left}] !== [${right}]`);
    // 当没有target时，就返回left - 1; 如果有，返回什么呢？left
    if (left !== -1) {
        return arr[left] !== target ? left - 1 : left;
    } else {
        return -1;
    }
}


function binaryMinBigThanK(arr, target) {
    let left = -1;
    let right = arr.length;
    while (left < right) {
        // left和right可能相等，可能是left+1=right。
        let i = Math.ceil((left + right) / 2);
        if (arr[i] <= target) {
            // on the rigth side
            left = i;
        } else {
            // (arr[i] > target) 
            // on the left side
            right = i - 1;
        }
    }
    if (arr[right] >= target) {
        return right;
    } else {
        return right === arr.length - 1 ? -1 : right + 1;
    }
}