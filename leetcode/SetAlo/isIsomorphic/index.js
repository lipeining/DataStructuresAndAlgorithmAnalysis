/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    let map = new Map();
    if (s.length !== t.length) {
        return false;
    }
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            // 是否已经有映射了
            let t1 = map.get(s[i]);
            console.log(t1);
            if (t1 !== t[i]) {
                return false;
            }
        } else {
            let trans = t[i];
            // 两个字符不能映射到同一个字符上 
            if(t.indexOf(trans) !== i) {
                return false;
            }
            map.set(s[i], trans);
        }
    }
    return true;
};

describe('同构 字符串', () => {
    it('', () => {
        assert(isIsomorphic('ab', 'aa') === false);
        assert(isIsomorphic('ab', 'ca') === true);
    });
});