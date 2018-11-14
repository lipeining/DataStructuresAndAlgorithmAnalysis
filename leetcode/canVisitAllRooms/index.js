describe('can visit all rooms ', () => {
    it('', () => {
        assert(canVisitAllRooms([
            [1],
            [2],
            [3],
            []
        ]) === true);
        assert(canVisitAllRooms([
            [1, 3],
            [3, 0, 1],
            [2],
            [0]
        ]) === false);
    });
});




function canVisitAllRooms(rooms) {
    let N = rooms.length - 1; // 共N个房间
    // let res = new Array(N + 1).fill(0); // 假定N个房间都不能进入
    // res[0] = 1; // 房间0可以进入
    let visited = new Set();
    let queue = new Array(); // 只取大于0的
    // 取得房间0的全部钥匙
    for (let i = 0; i < rooms[0].length; i++) {
        if (rooms[0][i]) {
            queue.push(rooms[0][i]); // 只取大于0的
        }
    }
    while (queue.length) {
        let now = queue.shift();
        let able = rooms[now]; // 可以去的房间列表，可能为空
        if (!visited.has(now)) {
            // 没有进过的房间，可以继续加入队列
            visited.add(now);
            // res[now] = 1; // 现在房间now是可以进入的。
            for (let i = 0; i < able.length; i++) {
                if (able[i]) {
                    queue.push(able[i]); // 只取大于0的
                }
            }
        }
    }
    // return res.every((value) => { return value === 1; });
    return visited.size === N;
}