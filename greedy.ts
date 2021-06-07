// Slow sums

/*

Suppose we have a list of N numbers, Choose any two adjacent numbers and replace them with their sum. Lets call the value of the new number as "cost".
Repeat the following operation until we're left with only a single number and add costs for each "merge" operation.
The goal of the problem is to find the "max cost" possible for a given input.

For example, given the list [1, 2, 3, 4, 5], we could choose 4 and 5 for the first operation, which would transform the list into [1, 2, 3, 9] and incur a cost of 9.
Signature:
int getTotalTime(int[] arr)
Input:
An array arr containing N integers, denoting the numbers in the list.
Output format:
An int representing the max cost.
Constraints:
1 ≤ N ≤ 106
1 ≤ Ai ≤ 107, where *Ai denotes the ith initial element of an array.
The sum of values of N over all test cases will not exceed 5 * 106.
Example
arr = [4, 2, 1, 3]
output = 23
First, add 4 + 2 for a cost of 6. Now the array is [6, 1, 3]
Add 6 + 1 for a cost of 7. Now the array is [7, 3]
Add 7 + 3 for a cost of 10. The costs sum to 23.

arr_2 = [2, 3, 9, 8, 4]
output = 88

*/


function slowSums(arr) {
    if (!arr || arr.length <= 1) {
        return 0;
    }

    console.log(arr);
    // find adjacent pair with max sum
    let maxSum = 0;
    let maxIndex = 0;
    for(let i=0; i < arr.length - 1; i++) {
        let sum = arr[i] + arr[i+1];
        if (sum > maxSum) {
            maxSum = sum;
            maxIndex = i;
        }
    }
    let  cost = arr[maxIndex] + arr[maxIndex+1];
    arr[maxIndex] = cost;
    arr.splice(maxIndex+1, 1);

    // replace pair with sum and rinse and repeat
    return cost + slowSums(arr);
}

console.log(slowSums([2, 3, 9, 8, 4]));
console.log(slowSums([4, 2, 1, 3]));
