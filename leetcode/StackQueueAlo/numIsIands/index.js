function numIslands(grid) {
    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j]) {
                dfs(grid, i, j);
                count++;
            }
        }
    }
    return count;
}

function dfs(grid, x, y) {
    if (x < 0 || x > grid.length - 1 || y < 0 || y > grid[0].length - 1 || grid[x][y] === 0 || grid[x][y] === 0) {
        return;
    }
    //越界或者碰到0或2 都直接返回
    grid[x][y] = 0; //将当前节点染色
    dfs(grid, x + 1, y); //对周围四个点做相同操作
    dfs(grid, x - 1, y);
    dfs(grid, x, y + 1);
    dfs(grid, x, y - 1);
}

let data = [{
        grid: [
            [1, 1, 1, 1, 0],
            [1, 1, 0, 1, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ],
        count: 1
    },
    {
        grid: [
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1],
        ],
        count: 3
    }
];

let grid = [
    [1, 1, 1, 1, 0],
    [1, 1, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
];

describe('test numIslands', () => {
    it('', () => {
        for (let i = 0; i < data.length; i++) {
            assert.equal(numIslands([...data[i].grid]), data[i].count);
        }
        assert.equal(numIslands(grid), 1);
    });
});



// class Solution {
//     public:
//         int numIslands(vector<vector<char>>& grid) {
//             int count = 0;
//             for(int i=0;i<grid.size();i++){
//                 for(int j=0;j<grid[i].size();j++){
//                     if(grid[i][j]=='1') { //如果找到1 将这个点作为种子进行涂色
//                         dfs(grid,i,j); 
//                         count++;
//                     }
//                 }
//             }
//             return count;
//         }
//         void dfs(vector<vector<char>>& grid,int x,int y){
//             if(x<0||x>grid.size()-1||y<0||y>grid[0].size()-1||grid[x][y]=='0'||grid[x][y]=='2') return; //越界或者碰到0或2 都直接返回
//             grid[x][y] = '2'; //将当前节点染色
//             dfs(grid,x+1,y); //对周围四个点做相同操作
//             dfs(grid,x-1,y);
//             dfs(grid,x,y+1);
//             dfs(grid,x,y-1);
//         }
//     };