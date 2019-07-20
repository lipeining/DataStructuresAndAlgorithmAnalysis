var intersection = function(nums1, nums2) {
    return [...intersection1(new Set(nums1), nums2)];
};

function intersection1(setA, arrB) {
    let _intersection = new Set();
    for (let elem of arrB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    // console.log(_intersection);
    return _intersection;
}