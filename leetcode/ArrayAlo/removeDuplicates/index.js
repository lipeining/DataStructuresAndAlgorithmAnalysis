describe('remove element', () => {
    it('', () => {
        console.log(removeDuplicates([1,1,1,2,2,3]), 5);
        console.log(removeDuplicates([0,0,1,1,1,1,2,3,3]), 7);
        console.log(removeDuplicates([0,0,1,1,2,2,3,3]), 8);
    });
});

/**
 *
 *
 * @param {*} nums
 */
function removeDuplicates(nums) {
    if (nums.length <= 2) {
        return nums.length;
    }
    let k = 0;
    for (let i = 0; i < nums.length; i++) {
        if (k < 2 || nums[i] !== nums[k - 2]) {
            if (i !== k) {
                nums[k] = nums[i];
                k++;
            } else {
                k++;
            }
        }
    }
    return k;
}

//    k = 0
//     for i, num in enumerate(nums):
//         if k < 2 or num != nums[k - 2]:
//             if i != k:
//                 nums[k] = num 
//                 k += 1
//             else:
//                 k += 1