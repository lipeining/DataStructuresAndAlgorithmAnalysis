describe('num squares', () => {
    it('', () => {
        // assert.equal(numSquares(12), 3);
        // assert.equal(numSquares(13), 2);
        // console.log(numSquares(151));
        // console.log(numSquares(1));
        console.log(numSquares(4));
    });
});

function min(x, y) {
    return Math.min(x, y);
}

function numSquares(n) {
    // if (n === 1) {
    //     return 1;
    // }
    let dp = new Array(n + 1);
    dp.fill(Number.MAX_SAFE_INTEGER);
    //将所有的平方数都置为1
    for (let i = 1; i * i <= n; i++) {
        dp[i * i] = 1;
    }
    for (let i = 1; i < n; i++) {
        // i为普通数
        for (let j = 1; i + j * j <= n; j++) {
            // j为平方数的根
            //状态转移方程
            dp[i + j * j] = min(dp[i] + 1, dp[i + j * j]);
        }
    }
    return dp[n];
}

// int numSquares(int n) {
//     //DP[i]表示 i可以表示为DP[i]个平方数的和
//     vector<int> dp(n+1,INT_MAX); //初始化一个DP数组 全部初始化为INT_MAX
//     for(int i=1;i*i<=n;i++)
//         dp[i*i] = 1; //将所有的平方数都置为1
//     for(int i=1;i<n;i++){ //i为普通数
//         for(int j=1;i+j*j<=n;j++){ //j为平方数的根
//             dp[i+j*j] = min(dp[i]+1,dp[i+j*j]); //状态转移方程
//         }
//     }
//     return dp[n]; //最终结果
// }
// DP的思路：一个非平方数可以看成是一个平方数+一个非平方数。
// DP[i]表示i可以表示为DP[i]个平方数的和，则非平方数都可以看作是i+jj，i表示一个普通数，j表示一个平方数的根。
// 状态转移方程为dp[i+jj] = min(dp[i]+1,dp[i+jj]),求出能够组成i的最小个数。
// 所有的平方数都只需要自己就可以组成自己，所以是1，其他初始化为无穷。
// 例子：
// n=12
// dp[2] = dp[1+11] = min(dp[1]+1，dp[2]) = 2
// dp[8] = dp[4+22] = min(dp[4]+1,dp[8]) = 2
// dp[12] = dp[8+22] = min(dp[8]+1,dp[12]) = 3


// DFS超时


// function sum(arr) {
//     return _.sum(arr);
// }

// function numSquares(num) {
//     // let max = Math.floor(Math.sqrt(num));
//     let count = Number.MAX_SAFE_INTEGER;
//     // 使用递归
//     let queue = new Array();
//     let visited = new Array();
//     // 不应该贪心算法开头的
//     queue.push({ cnt: 0, sum: [], str: '0' });
//     while (queue.length) {
//         let tmp = queue.shift();
//         if (sum(tmp.sum) === num && tmp.cnt < count) {
//             console.log(`get the correct answer: ${tmp.str}`);
//             count = tmp.cnt;
//         }
//         // 如果sum都大于num，那么肯定是不对的
//         if (sum(tmp.sum) > num) {
//             continue;
//         }
//         if (tmp.cnt > count) {
//             // 剪枝
//             continue;
//         }
//         // 对于比较大的数字，如何更高效地 剪枝 比如151
//         // 将sum改为数组，保存，包含的结果，然后
//         // 设置一个visited数组，保存失败的例子，将可以去除的平方数去除
//         // 取sum中的最大值，将相同的sqrt(sum)都去除


//         // 对max进行限制，这样可以减少一定数量
//         let max = Math.floor(Math.sqrt(num - sum(tmp.sum)));
//         for (let i = max; i >= 1; i--) {
//             let str = `${tmp.str} + ${i*i}`;
//             let s = i * i;
//             let j = tmp.sum.findIndex((value) => {
//                 return  value != s && (!(value % s) || !(s % value));
//             });
//             if (j !== -1) {
//                 continue;
//             }
//             queue.push({ cnt: tmp.cnt + 1, sum: [...tmp.sum, i * i], str: str });
//             // visited.push(`${sum} + ${i*i}`);
//         }

//         // for (let i = max; i >= 1; i--) {
//         //     let str = `${tmp.str} + ${i*i}`;
//         //     let s = i * i;
//         //     let j = tmp.sum.findIndex((value) => {
//         //         return !(value % s) && value != s;
//         //     });
//         //     if (j !== -1) {
//         //         continue;
//         //     }
//         //     queue.push({ cnt: tmp.cnt + 1, sum: [...tmp.sum, i * i], str: str });
//         //     // visited.push(`${sum} + ${i*i}`);
//         // }


//         // // 找出<=max中的所有可能的平方数的组合
//         // for (let i = 1; i <= max; i++) {
//         //     let str = `${tmp.str} + ${i*i}`;
//         //     console.log(str);
//         //     queue.push({ cnt: tmp.cnt + 1, sum: tmp.sum + i * i, str: str });
//         //     // visited.push(`${sum} + ${i*i}`);
//         // }
//         // 找出<=max中的所有可能的平方数的组合
//         // for (let i = max; i >= 1; i--) {
//         //     let str = `${tmp.str} + ${i*i}`;
//         //     // console.log(str);
//         //     queue.push({ cnt: tmp.cnt + 1, sum: [...tmp.sum, i * i], str: str });
//         //     // visited.push(`${sum} + ${i*i}`);
//         // }
//     }
//     return count === Number.MAX_SAFE_INTEGER ? -1 : count;
// }