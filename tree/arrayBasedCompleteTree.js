/**
 * 
 * n表示二叉树结点的总数， r表示数组下标[0,n-1]
 * 
 * Parent = Math.floor((r-1)/2) r!=0
 * 
 * LeftChirld = 2*r+1, when 2*r+1<n
 * 
 * RightChrild = 2*r+2, when 2*r+2<n
 * 
 * LeftSibling = r-1, r is even and r in [0,n-1]
 * 
 * RightSibling = r+1, r is odd and r+1<n 
 * 
 * 
 */