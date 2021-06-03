
// Longest increasing subsequence

// Example: find increasing subsequence longest
// Find all  increasing subsequence and return the longest one

function lis(numbers, memo={}) {

    // base case
    if(!numbers || numbers.length < 1) {
        return [];
    }
    let key = numbers.reduce( (acc, cur) =>  acc + ';' + cur.toString());
    if (key in memo) {
        console.log('cache hit key', key);
        return memo[key];
    }
    let maxSequence = [];
    for (let i=0; i<numbers.length; i++) {
        let seqNumber = numbers[i];
        let numbersFiltered = numbers.slice(i+1).filter( (number) => number > seqNumber);
        let sequence = [seqNumber, ...lis(numbersFiltered, memo)];
        if (sequence.length >=  maxSequence.length) {
            maxSequence = sequence;
        }
    }
    memo[key] = maxSequence;
    return maxSequence;
}

console.log(lis([2, 11, 7, 10, 15, 12]))
console.log(lis([50, 3, 10, 7, 40, 80]));
console.log(lis([10,9,2,5,3,7,101,18]));
// console.log(lis2(25));