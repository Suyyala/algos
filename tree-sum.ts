/*
Print all sums in all paths in binary tree

Example
            8  <------ root
           / \
         3    10
        / \     \
       1   6     14
          / \    / \
         4   7  13  1           
output =  (12, 21, 24, 45, 33) 

*/
function TreeSum() {

    function TreeNode (val: number) {
        this.val = val;
        this.left = this.right = null;
    }

    function traverse(root) {
        if (!root) {
            return;
        }
        console.log(root.val);
        traverse(root.left);
        traverse(root.right);
    }

    function pathSum(root) {
        let pathSums = [];
        if (!root) {
            return pathSums;
        }
        console.log(root.val);
        traverse(root.left);
        traverse(root.right);
    }
    
    let root1 = new TreeNode(8);
    root1.left = new TreeNode(3);
    root1.right = new TreeNode(10);
    root1.left.left = new TreeNode(1);
    root1.left.right = new TreeNode(6);
    root1.left.right.left = new TreeNode(4);
    root1.left.right.right= new TreeNode(7);
    root1.right.right = new TreeNode(14);
    root1.right.right.left = new TreeNode(13);
    root1.right.right.right = new TreeNode(1);
    
    
    traverse(root1);

}

TreeSum();