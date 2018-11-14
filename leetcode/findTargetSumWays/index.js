describe('find target sum ways ', () => {
    it('', () => {
        let nums = [1, 1, 1, 1, 1];
        let S = 3;
        // assert.equal(findTargetSumWays(nums, S), 5);
        // assert.equal(find(nums, S), 5);
        let nums16 = new Array(16).fill(1);
        assert.equal(findTargetSumWays1(nums, S), 5);
        console.log(findTargetSumWays1(nums16, 0));
        console.log(findTargetSumWays2(nums, S));
    });
});

// 1,递归解决
// int findTargetSumWays(vector<int>& nums, int S) {
//     int res = 0;
//     helper(nums, S, 0, res);
//     return res;
// }
// void helper(vector<int>& nums, int S, int start, int& res) {
//     if (start >= nums.size()) {
//         if (S == 0) ++res;
//         return;
//     }
//     helper(nums, S - nums[start], start + 1, res);
//     helper(nums, S + nums[start], start + 1, res);
// }

function findTargetSumWays1(nums, S) {
    let cnt = { n: 0 };
    helper(nums, S, 0, cnt);
    return cnt.n;
}

function helper(nums, S, start, cnt) {
    if (start >= nums.length) {
        if (S === 0) {
            cnt.n++;
        }
        return;
    }
    helper(nums, S - nums[start], start + 1, cnt);
    helper(nums, S + nums[start], start + 1, cnt);
}

// 需要考虑输入为 16*[1] S=0


// 此时的背包的大小应该可以容纳[-sum(nums),sum(nums)]这个区间的所有数，
// 而我们有len(nums)个元素，所以我们最后需要一个(len(nums)+1)(2*sum_nums + 1)大小的数组用来存储状态。
// 传统背包问题可以用一个数组解决啊？着我们后面再说怎么用一维数组解决这个问题。接下来的过程很清晰，无非就是加上还是减去一个数的问题

// mem[i][j] = mem[i-1][j+nums[i-1]] while j + nums[i-1] < 2*sum_nums + 1
// mem[i][j] = mem[i-1][j-nums[i-1]] while j - nums[i-1] >= 0


// dp[i][j]表示到第i-1个数字且和为j的情况总数

function findTargetSumWays2(nums, S) {
    let dp = new Array(nums.length + 1);
    let sum_nums = _.sum(nums);
    // let zero = new Map();
    // dp.fill(zero);
    // dp[0].set(0, 1);
    dp.fill({});
    dp[0][0] = 1;
    for (let i = 0; i < nums.length; i++) {
        // for (let j = 0; j < dp[i].length; j++) {
        //     while ((j + nums[i - 1]) < (2 * sum_nums + 1)) {
        //         dp[i][j] = dp[i - 1][j + nums[i - 1]];
        //     }
        //     while ((j - nums[i - 1]) >= 0) {
        //         dp[i][j] = dp[i - 1][j - nums[i - 1]];
        //     }
        // }
        for (let key in dp[i]) {
            // key 为sum,value为cnt
            let sum = Number(key);
            let cnt = Number(dp[i][key]);
            if (!dp[i + 1][sum + nums[i]]) {
                dp[i + 1][sum + nums[i]] = 0;
            }
            if (!dp[i + 1][sum - nums[i]]) {
                dp[i + 1][sum - nums[i]] = 0;
            }
            dp[i + 1][sum + nums[i]] += cnt;
            dp[i + 1][sum - nums[i]] += cnt;
        }
    }
    return dp[nums.length][S];
}

// // 状态转换方程
// // dp[i][j] = dp[i][j-1]+ j的值 ，dp[i][j-1] -j的值
// function find(nums, S) {
//     let arr = new Array();
//     arr.push({ n: nums[0], i: 0 });
//     arr.push({ n: -nums[0], i: 0 });
//     // 当arr的长度小于 2^n时
//     while (arr.length !== Math.pow(2, nums.length)) {
//         let tmp = arr.shift();
//         if (tmp.i < nums.length - 1) {
//             arr.push({ i: tmp.i + 1, n: tmp.n + nums[tmp.i + 1] });
//             arr.push({ i: tmp.i + 1, n: tmp.n - nums[tmp.i + 1] });
//         }
//         else {
//             // 当i为length，表示已经加上了最后一个数
//         }
//     }
//     let res = arr.filter((value)=>{
//         return value.n === S;
//     });
//     return res.length;
// }

// function sum(nums, cal) {
//     let sum = 0;
//     for (let i = 0; i < nums.length; i++) {
//         sum += cal[i] === '+' ? nums[i] : -nums[i];
//     }
//     return sum;
// }
// /**
//  * @param {string[]} nums
//  * @param {string} S
//  * @return {number}
//  */
// function findTargetSumWays(nums, S) {
//     let res = new Set(); // 用于记录已经访问过的情况
//     let visited = new Set();
//     let queue = new Array();
//     let len = nums.length;
//     queue.push('+'.repeat(len));
//     while (queue.length) {
//         let tmp = queue.shift();
//         if (sum(nums, tmp) === S) {
//             res.add(tmp);
//         }
//         for (let i = 0; i < len; i++) {
//             // 对各个运算符进行排除
//             let arr = tmp.split('');
//             arr[i] = arr[i] === '+' ? '-' : '+';
//             let str = arr.join('');
//             if (!visited.has(str)) {
//                 queue.push(str);
//                 visited.add(str);
//             }
//         }
//     }
//     return res.size; //返回最终结果
// };