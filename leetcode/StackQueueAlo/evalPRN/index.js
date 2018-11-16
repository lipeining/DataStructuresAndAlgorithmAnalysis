describe('eval PRN', () => {
    it('', () => {
        let tokens = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"];
        assert(evalRPN(tokens) === 22);
    });
});

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    number = new Array();
    for (let i = 0; i < tokens.length; i++) {
        let n = parseInt(tokens[i], 10);
        if (Object.is(n, NaN)) {
            // + - * /
            // 取前面的两个数字进行运算，然后重新push back
            let b = number.pop();
            let a = number.pop();
            let res;
            let tmp; // js和c语言，对于负数的取整不一样floor
            switch (tokens[i]) {
                case '+':
                    res = a + b;
                    break;
                case '-':
                    res = a - b;
                    break;
                case '*':
                    res = a * b;
                    break;
                case '/':
                    // res = Math.floor(a / b) >= 0 ? Math.floor(a / b) : Math.floor(a / b) + 1;
                    // res = Math.floor(a/b);
                    tmp = Math.floor(Math.abs(a) / Math.abs(b));
                    res = a * b < 0 ? -tmp : tmp;
                    break;
            }
            number.push(res);
        } else {
            number.push(n);
        }
    }
    return number.pop();
};