/**
 *nums = [2, 7, 11, 15], target = 9
 *
 * @param {*} nums
 */
function twoSum(nums, target) {
    let map = {};
    for(let i = 0; i<nums.length;i++) {
        let minus = target - nums[i];
        if(map.hasOwnProperty(minus)) {
            // 有可能map[minus]=0
            return [map[minus], i];
        } else {
            map[nums[i]] = i;
        }
    }
}
/**
 *
 *
 * @param {*} nums
 * @param {*} target
 * @param {*} left
 * @param {*} right
 * @returns
 */
function twoSumHelper(nums, target, left, right) {
    let n = right-left + 1;
    if(n<2) {
        return new Set();
    }
    let start = nums[l-1];
    let ret = new Set();
    let map = {};
    for(let i = l; i<r+1;i++) {
        let other = target - nums[i];
        if(map.hasOwnProperty(other)) {
            // 有可能map[minus]=0
            ret.add([start, other, nums[i]]);
        } else {
            map[nums[i]] = i;
        }
    }
    return ret;
}

function threeSum(nums) {
   if(nums.length<3) {
       return [];
   }
   nums.sort();
   ret = new Set();
}
// def twoSum(self, nums, target, l, r):
// """
// :type nums: List[int]
// :type target: int
// :rtype: List[int]
// """

// n = len(nums[l: r+1])
// if n < 2:
//     return set()

// start = nums[l - 1]
// dict1 = dict()
// ret = set()
// for i in range(l, r+1):
//     other = target - nums[i]
//     if other in dict1:
//         ret.add((start, other, nums[i]))
//     dict1[nums[i]] = i

// return ret

// def threeSum(self, nums):
// """
// :type nums: List[int]
// :type target: int
// :rtype: List[int]
// """

// n = len(nums)
// if n < 3:
//     return []

// nums.sort()

// ret = set()
// for i in range(n):
//     # nums[i] 为正数，表示后面不可能有两数之后为负
//     if nums[i] > 0:
//         break
//     if (i >= 1 and nums[i] == nums[i-1]):
//         continue
//     ll = self.twoSum(nums, -nums[i], i+1, n-1)
//     if (ll == set()):
//         continue
//     ret = ret | ll
// return list(ret)


describe('arr sum ', () => {
    it('', () => {

    });
});