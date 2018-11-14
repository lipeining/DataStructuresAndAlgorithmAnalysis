let deadends = ["0201", "0101", "0102", "1212", "2002"];
let target = "0202";
// console.log(openLock(deadends, target));
describe('open lock ', ()=>{
    it('', ()=>{
        assert.equal(openLock(deadends, target), 6);
    });
});

/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
function openLock(deadends, target) {
    // 对于target,从图的各条边，即0-3的下标开始回滚到0000
    let dead = new Set(deadends);
    let beginStr = '0000';
    let visited = new Set(); // 用于记录已经访问过的情况
    let queue = new Array();
    visited.add(beginStr);
    queue.push({ cnt: 0, str: beginStr });
    if (dead.has("0000")) return -1; //如果dead中有0000 直接返回-1
    let count = Number.MAX_SAFE_INTEGER;
    while (queue.length) {
        let tmp = queue.shift();
        if (tmp.str === target && tmp.cnt < count) {
            count = tmp.cnt;
        }
        if (tmp.cnt > count) {
            // 剪枝
            continue;
        }
        for (let i = 0; i < 4; i++) {
            //对于密码中的每一位做+1 -1 操作
            let str_plus = tmp.str.split('');
            let str_subs = tmp.str.split('');
            if (str_plus[i] === '9') {
                //9->0
                str_plus[i] = '0';
            }
            else {
                str_plus[i] = `${(parseInt(str_plus[i], 10) + 1)}`;
            }
            if (str_subs[i] === '0') {
                //0->9
                str_subs[i] = '9';
            }
            else {
                str_subs[i] = `${(parseInt(str_subs[i], 10) - 1)}`;
            }
            str_plus = str_plus.join('');
            str_subs = str_subs.join('');
            if (!dead.has(str_plus) && !visited.has(str_plus)) { //如果dead与visited中都不存在 str_plus，则将其放入队列。
                queue.push({ cnt: tmp.cnt + 1, str: str_plus });
                visited.add(str_plus);
            }
            if (!dead.has(str_subs) && !visited.has(str_subs)) { //如果dead与visited中都不存在 str_subs，则将其放入队列。
                queue.push({ cnt: tmp.cnt + 1, str: str_subs });
                visited.add(str_subs);
            }
        }
    }
    return count === Number.MAX_SAFE_INTEGER ? -1 : count; //返回最终结果
};








// class Solution {
//     public:
//         int openLock(vector<string>& deadends, string target) {
//             string beginStr = "0000"; //初始字符
//             set<string> dead(deadends.begin(),deadends.end()); //将deadends转化为set 用来提高检索速度
//             set<string> visited; //用来记录已经访问过的号码
//             char flag_1 = '9'+1; //用来处理9->0
//             char flag_2 = '0'-1; //用来处理0->9
//             int min_length = INT_MAX;//用来记录最短路径的长度
//             visited.insert(beginStr); //将初始字符设置为访问
//             queue<pair<int,string>> que; //建立一个队列 队列中记录当前节点与深度
//             que.push({0,beginStr});//放入其实节点
//             if(dead.count("0000")) return -1; //如果dead中有0000 直接返回-1
//             while(!que.empty()){
//                 auto tmp = que.front(); //取出队列中第一个元素
//                 que.pop();
//                 if(tmp.second == target && tmp.first<min_length){ //如果当前节点就是target 且深度小于当前的min_length，更新min_length。
//                     min_length = tmp.first;
//                 }
//                 if(tmp.first>min_length) continue; //剪枝 如果当前深度大于min_length则不需要再搜索
//                 for(int i=0;i<4;i++){ //对于密码中的每一位做+1 -1 操作
//                     string str_plus = tmp.second;
//                     string str_subs = tmp.second;
//                     str_plus[i]+=1;
//                     str_subs[i]-=1;
//                     if(str_plus[i]==flag_1){ //9->0
//                         str_plus[i] = '0';
//                     }
//                     if(str_subs[i]==flag_2){ //0->9
//                         str_subs[i] = '9';
//                     }
//                     if(!dead.count(str_plus) && !visited.count(str_plus)) { //如果dead与visited中都不存在 str_plus，则将其放入队列。
//                         que.push({tmp.first+1,str_plus});
//                         visited.insert(str_plus);
//                     }
//                     if(!dead.count(str_subs) && !visited.count(str_subs)) { //如果dead与visited中都不存在 str_subs，则将其放入队列。
//                         que.push({tmp.first+1,str_subs});
//                         visited.insert(str_subs);
//                     }
//                 }
//             }
//             return min_length == INT_MAX? -1: min_length; //返回最终结果
//         }
//     };