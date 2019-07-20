


require('./StackQueueAlo/numIsIands');
require('./StackQueueAlo/openLock');
require('./StackQueueAlo/numSquares');
require('./StackQueueAlo/MinStack');
require('./StackQueueAlo/evalPRN');
require('./StackQueueAlo/findTargetSumWays');
require('./StackQueueAlo/decodeString');
require('./StackQueueAlo/floodFill');
require('./StackQueueAlo/zeroOneMatrix');
require('./StackQueueAlo/canVisitAllRooms');
require('./ArrayAlo');
require('./SetAlo');


// /*
//  * Return true if there is a path from cur to target.
//  */
// boolean DFS(Node cur, Node target, Set<Node> visited) {
//     return true if cur is target;
//     for (next : each neighbor of cur) {
//         if (next is not in visited) {
//             add next to visted;
//             return true if DFS(next, target, visited) == true;
//         }
//     }
//     return false;
// }

// /*
//  * Return true if there is a path from cur to target.
//  */
// boolean DFS(int root, int target) {
//     Set<Node> visited;
//     Stack<Node> s;
//     add root to s;
//     while (s is not empty) {
//         Node cur = the top element in s;
//         return true if cur is target;
//         for (Node next : the neighbors of cur) {
//             if (next is not in visited) {
//                 add next to s;
//                 add next to visited;
//             }
//         }
//         remove cur from s;
//     }
//     return false;
// }
