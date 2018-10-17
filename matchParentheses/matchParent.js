module.exports = matchParent;

/**
 * 
 * @param {String} str 
 * @returns {Number} index
 */
function matchParent(str) {
    let left = 0;
    let right = 0;
    let ptr = 0; // 记录第一个左括号的位置
    if (str[0] !== '(') {
        return 0;
    }
    left++;
    for (let i = 1; i < str.length; i++) {
        if (str[i] === '(') {
            left++;
        } else {
            if (left === right) {
                // 之前已经匹配了一段(),这是多余的右括号
                return i;
            }
            if (right !== left - 1) {
                // 没有完整匹配一段()
                right++;
            } else {
                // 完整匹配(),清零
                right = left = 0;
                ptr = i + 1;
            }
        }
    }
    if (right !== left) {
        // 遍历一遍str,检查匹配结果,如果没有匹配全部左括号
        return ptr;
    }
    return -1;
}