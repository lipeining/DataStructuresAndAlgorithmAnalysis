// 给定一个经过编码的字符串，返回它解码后的字符串。

// 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

// 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

// 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

// 示例:

// s = "3[a]2[bc]", 返回 "aaabcbc".
// s = "3[a2[c]]", 返回 "accaccacc".
// s = "2[abc]3[cd]ef", 返回 "abcabccdcdcdef".
const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
/**
 * @param {string} s
 * @return {string}
 */
function decodeString(s) {
    // stack
    let sstack = new Array();
    let nstack = new Array();
    let result = '';
    for (let i = 0; i < s.length; i++) {
        let t = s[i];
        if (number.indexOf(parseInt(t, 10)) !== -1) {
            // 这是一个数字，加入数字栈
            // 100[leetcode]
            let j = i + 1;
            while (number.indexOf(parseInt(s[j], 10)) !== -1) {
                t += s[j];
                j++;
            }
            i = j - 1;
            nstack.push(Number(t));
        } else {
            // 如果是括号里面的字符
            if (sstack.length) {
                if (t === ']') {
                    // 说明有初步一个[]配对了，取出来，解压 multi* [str]
                    let multi = nstack.pop();
                    let str = '';
                    let char;
                    while ((char = sstack.pop()) !== '[') {
                        str = char + str;
                    }
                    str = str.repeat(multi);
                    // 如果这个时候，sstack为空的话，说明已经完整地匹配一个[]，加到result
                    if (sstack.length) {
                        sstack.push(str);
                    } else {
                        result += str;
                    }
                } else {
                    // 不管是[, 还是普通的字符，都直接入栈sstack
                    sstack.push(t);
                }
            } else {
                if (t === '[') {
                    sstack.push(t);
                } else {
                    // ef的那种类型的字符
                    result += t;
                }
            }
        }
    }
    return result;
}


describe('decode string', () => {
    it('', () => {
        assert(decodeString("3[a]2[bc]") === "aaabcbc");
        assert(decodeString("3[a2[c]]") === "accaccacc");
        assert(decodeString("2[abc]3[cd]ef") === "abcabccdcdcdef");
        assert(decodeString("ef2[abc]3[cd]ef") === "efabcabccdcdcdef");
        assert(decodeString("10[a]") === "a".repeat(10));
    });
});