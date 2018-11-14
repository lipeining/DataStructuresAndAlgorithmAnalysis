
describe('flood fill', ()=>{

    it('', ()=>{
        let image = [[1,1,1],[1,1,0],[1,0,1]];
        let sr = 1; 
        let sc = 1;
        let newColor = 2;
        console.log(floodFill(image, sr, sc, newColor));
    })
});

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
function floodFill(image, sr, sc, newColor) {
    let queue = new Array();
    let oldColor = image[sr][sc];
    queue.push({x: sr, y: sc});
    let visited = new Set();
    while(queue.length) {
        let tmp = queue.shift();
        let x = tmp.x;    
        let y = tmp.y;
        if(x<0 || x>= image.length || y<0 || y>=image[0].length) {
            continue;
        }
        if(image[x][y] === oldColor && !visited.has(`${x},${y}`)) {
            image[x][y] = newColor;
            visited.add(`${x},${y}`);
            queue.push({x: x-1,y:y});
            queue.push({x: x+1,y:y});
            queue.push({x: x,y:y-1});
            queue.push({x: x,y:y+1});
        }
    }
    return image;
    
    // ---------- 下面的是bfs--------
    // let oldColor = image[sr][sc];
    // let visited = new Set();
    // bfs(image, sr, sc, newColor, oldColor, visited);
    // return image;
};

function bfs(image, x, y, newColor, oldColor, visited) {
    if(x<0 || x>= image.length || y<0 || y>=image[0].length) {
        return;
    }
    if(image[x][y] === oldColor && !visited.has(`${x},${y}`)) {
        image[x][y] = newColor;
        visited.add(`${x},${y}`);
        bfs(image, x-1,y,newColor, oldColor, visited);
        bfs(image, x+1,y,newColor, oldColor, visited);
        bfs(image, x,y-1,newColor, oldColor, visited);
        bfs(image, x,y+1,newColor, oldColor, visited);
    }    
}


