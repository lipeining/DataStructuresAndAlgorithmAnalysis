const LStack = require('../stack/LStack');

describe('测试迭代的TOH', () => {
    it('use Link Stack', () => {
        let statck = new LStack();
        TOHStack(3, 1, 3, 2, statck);
    });
});

function TOHStack(num, start, goal, tmp, stack) {
    stack.push({ op: 'DOTOH', num, start, goal, tmp });
    let t;
    while (t = stack.pop()) {
        if (t.op === 'DOMOVE') {
            console.log(`move start:${t.start} to goal ${t.goal}`);
        } else if (t.num > 0) {
            // do 3 statement of recursion
            let newnum = t.num;
            let newtmp = t.tmp;
            let newstart = t.start;
            let newgoal = t.goal;
            // 与递归的必须逆序，然后栈才能倒序输出正确的结果
            stack.push({ op: 'DOTOH', num: newnum - 1, start: newtmp, goal: newgoal, tmp: newstart });
            stack.push({ op: 'DOMOVE', start: newstart, goal: newgoal });
            stack.push({ op: 'DOTOH', num: newnum - 1, start: newstart, goal: newtmp, tmp: newgoal });
        }
    }
}

console.log('---递归---');
function TOH(n, start, goal, temp) {
    if (n == 0) return;
    // 将n-1个盘子放到临时的柱子tmp
    TOH(n - 1, start, temp, goal);
    // 将第n个盘子从start放到正确的goal
    console.log(`move start:${start} to goal ${goal}`);
    // 将n-1个盘子同样地移到正确的goal上
    TOH(n - 1, temp, goal, start);
}
// 3个盘子，从start:1,到goal3,temp:2
TOH(3, 1, 3, 2);
// console.log('next-');
// TOH(3, 1, 2, 3);