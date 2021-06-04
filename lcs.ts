
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

function lcs(s1, s2, mem={}) {
    // base case
    if (s1.length === 0 || s2.length == 0) {
        return '';
    }
    let key = s1 + ';' + s2;
    if (key in mem) {
        return mem[key];
    }


    let maxSequence = '';

    for (let i=0; i<s1.length; i++) {
        let s2Index = s2.indexOf(s1[i]);
        if (s2Index != -1) {
            let sequence = s1[i] + lcs(s1.slice(i+1), s2.slice(s2Index+1));
            if (sequence.length > maxSequence.length) {
                maxSequence = sequence;
            }
        }
    }
    mem[key] = maxSequence;

    return maxSequence;
}

function lcs_iter(s1, s2) {
    
}

console.log(lis([2, 11, 7, 10, 15, 12]))
console.log(lis([50, 3, 10, 7, 40, 80]));
console.log(lis([10,9,2,5,3,7,101,18]));
console.log(lcs("ABCDGH", "AEDFHR"));
console.log(lcs("AGGTAB", "GXTXAYB"));
// console.log(lis2(25));