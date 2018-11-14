describe('zero one matrix', () => {

    it('', () => {
        let image = [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ];
        console.log(updateMatrix(image));
        console.log(updateMatrix([
            [0, 0, 0],
            [0, 1, 0],
            [1, 1, 1]
        ]));
        let t = [
            [0, 0, 1, 0, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
            [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
            [0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
            [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 0]
        ];
        let tres = [
            [0, 0, 1, 0, 1, 2, 1, 0, 1, 2],
            [1, 1, 2, 1, 0, 1, 1, 1, 2, 3],
            [2, 1, 2, 1, 1, 0, 0, 0, 1, 2],
            [1, 0, 1, 0, 1, 1, 1, 0, 1, 2],
            [0, 0, 1, 1, 1, 0, 1, 1, 2, 3],
            [1, 0, 1, 2, 1, 1, 1, 2, 1, 2],
            [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [0, 1, 0, 0, 0, 1, 0, 0, 1, 2],
            [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 2, 1, 0]
        ];
        console.log(updateMatrix(t));
    });
});


// 这道题使用广度优先遍历可以很快做出来，深度优先遍历的话会出现超时等各种问题。。具体思路如下：

// 创建队列，遍历矩阵，将值为0的坐标入列，值不为0的坐标设置为MAX
// 遍历队列，查看队列中取出的坐标四周是否有未被赋值的节点，压入队列
// 如果当前坐标元素的值小于队列遍历的值，则赋值
const directions = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];

function updateMatrix(matrix) {
    let queue = new Array();
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 0) {
                queue.push({ i, j });
            } else {
                matrix[i][j] = Number.MAX_SAFE_INTEGER;
            }
        }
    }
    while (queue.length) {
        let tmp = queue.shift();
        let i = tmp.i;
        let j = tmp.j;
        for (let k = 0; k < directions.length; k++) {
            let x = i + directions[k].x;
            let y = j + directions[k].y;
            if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[0].length) {
                continue;
            }
            if (matrix[x][y] <= matrix[i][j] + 1) {
                continue;
            }
            matrix[x][y] = matrix[i][j] + 1;
            queue.push({ i: x, j: y });
        }
    }
    return matrix;
}
