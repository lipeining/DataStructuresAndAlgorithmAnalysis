function isHappy(n) {
    let visited = new Set();
    while (true) {
        if (n === 1) {
            return true;
        }
        let total = 0;
        while (n) {
            let t = n % 10;
            total += t * t;
            n = Math.floor(n / 10);
        }
        if(visited.has(total)) {
            return false;
        }
        visited.add(total);
        n = total;
    }
}
// while True:
// if n == 1:
//     return True
// total = 0
// while n:
//     total += (n % 10) * (n %10)
//     n = n // 10
// if total in ss:
//     return False

// ss.add(total)
// n = total

function sumTotal(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
describe('happy', () => {
    it('', () => {
        assert(isHappy(19) === true);
        // console.log(isHappy(19));
        assert(isHappy(2) === false);
        // console.log(isHappy(2));
    });
});