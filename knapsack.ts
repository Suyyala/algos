/*
Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack. 

In other words, given two integer arrays val[0..n-1] and wt[0..n-1] which represent values and weights associated with n items respectively.
 Also given an integer W which represents knapsack capacity, find out the maximum value subset of val[] such that sum of the weights of this 
 subset is smaller than or equal to W. You cannot break an item, either pick the complete item or don’t pick it (0-1 property).
*/
function knapsack(val, wt, W) {
    if (W <= 0) {
        return [];
    }
    if (val.length === 1) {
        if (W - wt[0] >= 0) {
            return [val[0]];
        } else {
            return [];
        }
    }
    let maxSet = [];
    const maxVal = 0;
    for (let i=0; i<val.length; i++) {
        if (W - wt[i] >= 0) {
            const newV = val.filter( (v, index) =>  i !== index );
            const newW = wt.filter( (w, index) =>  i !== index);
            const set = [val[i], ...knapsack(newV, newW, W - wt[i])];
            const setVal = set.reduce( (p, c) =>  p + c );
            if (setVal > maxVal) {
                maxSet = set;
            }
        }
    }
    return maxSet;
}


/*

Partition problem is to determine whether a given set can be partitioned into two subsets such that the sum of elements in both subsets is the same. 

Examples: 

arr[] = {1, 5, 11, 5}
Output: true 
The array can be partitioned as {1, 5, 5} and {11}

arr[] = {1, 5, 3}
Output: false 
The array cannot be partitioned into equal sum sets.

*/

function sumSubset(arr, t) {
    if(t === 0) {
        return true;
    }
    if (arr.length === 1) {
        if (arr[0] === t) {
            return true;
        } else {
            return false;
        }
    }
    for(let i=0; i<arr.length; i ++) {
        if (t - arr[i] >= 0) {
            if (sumSubset(arr.filter( (e, index) =>  i !== index), t - arr[i]) ||
            sumSubset(arr.filter( (e, index) =>  i !== index), t)) {
                return true;
            }

        }
    }
    return false;
}

function equalParition(arr) {
    if (!arr || arr.length < 2) {
        return false;
    }
    /*
    If total array sum is even -> yes its possibel to have paritioned sum
    else return false;

    If its even -> even/2 -> Find subset that adds to sum 
    */

    let total  = arr.reduce( (p, c) =>  p + c);
    if (total % 2) {
        return false;
    }

    total = total / 2;
    return sumSubset(arr, total);
}

console.log(knapsack( [2, 3, 4], [10, 20, 30], 50));
console.log(knapsack( [2, 3, 4], [30, 20, 10], 50));
console.log(knapsack( [2, 3, 4], [20, 20, 10], 50));


console.log(equalParition([1,  3, 4, 6]));
console.log(equalParition([10,  3, 1, 7, 2, 11]));
console.log(equalParition([1,  1, 1, 1]));
console.log(equalParition([1,  2, 3]));

console.log(equalParition([1, 4, 6]));
console.log(equalParition([10,  11, 2]));
console.log(equalParition([100,  2, 97]));
console.log(equalParition([1,  2, 3, 4]));



