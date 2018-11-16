describe('remove element', () => {
    it('', () => {
        console.log(removeElement([3, 2, 2, 3], 3));
        console.log(removeElement([0,1,2,2,3,0,4,2], 2));
        console.log(removeElement([1], 1));
    });
});

function removeElement(nums, val) {
    let left = 0; // 第一个val
    while ((left < nums.length) && nums[left] !== val) {
        left++;
    }
    let right = left + 1; //第一个不为val
    while ((right < nums.length) && nums[right] === val) {
        right++;
    }
    // right 不断向后延伸，只有为非val值才和left交换
    // if(left < right) {
    while (right < nums.length) {
        if (nums[right] !== val) {
            swap(nums, left, right);
            right++;
            left++;
        } else {
            right++;
        }
    }
    let cnt = 0;
    for(let t = left; t< right;t++) {
        if(nums[t] === val) {
            cnt++;
        }
    }
    // return nums.length - cnt;
    return nums;
};

function swap(nums, l, r) {
    let tmp = nums[r];
    nums[r] = nums[l];
    nums[l] = tmp;
}