
// Problem1:  return if possible to generate targetSum from given numbers
// without repeating the numbers.
// Asumptions: Numbers are postive  

function canSum(targetSum, numbers) {
    if (targetSum === 0) {
        return true;
    }
    if (numbers.length === 0 && targetSum > 0) {
        return false;
    }
    if (numbers.length === 1) {
        if (targetSum == numbers[0]) {
            return true;
        } else {
            return false;
        }
    }
    return canSum(targetSum-numbers[0], numbers.slice(1)) || canSum(targetSum, numbers.slice(1));
}



// Problem2:  return if possible to generate targetSum from given numbers
// with repeating the numbers.
// Asumptions: Numbers are postive  


function canSumRepeat(targetSum, numbers, mem = {}) {

    if (targetSum === 0) {
        return true;
    }

    if (targetSum < 0) {
        return false;
    }

    if (targetSum in mem) {
        return mem[targetSum];
    }
    
    for (let i=0; i <numbers.length; i++) {
        if ( canSumRepeat(targetSum-numbers[i], numbers, mem)) {
            mem[targetSum] = true;
            return true;
        } 
    }
    mem[targetSum] = false;
    return false;
}

// Problem3:  return numbers  to generate targetSum from given numbers
// withrepeating the numbers. 

// Asumptions: Return null if not possible other return combination

function howSum(targetSum, numbers, mem = {}) {

    if (targetSum === 0) {
        return [];
    }

    if (targetSum < 0) {
        return null;
    }

    if (targetSum in mem) {
        return mem[targetSum];
    }
    
    for (let i=0; i <numbers.length; i++) {
        const result = howSum(targetSum-numbers[i], numbers,  mem);
        if (result != null) {
            mem[targetSum] = [...result, numbers[i]];
            return mem[targetSum];
        } 
    }
    mem[targetSum] = null;
    return null;
}

// Problem3:  return shortest numbers  to generate targetSum from given numbers
// with repeating the numbers. 

// Asumptions: Return null if not possible other return combination

function bestSum(targetSum, numbers, mem = {}) {

    // Same as above problem but we have to check shortest path in 
    // the recursive treee


    if (targetSum === 0) {
        return [];
    }

    if (targetSum < 0) {
        return null;
    }

    if (targetSum in mem) {
        return mem[targetSum];
    }
    let results = [];
    for (let i=0; i <numbers.length; i++) {
        const result = bestSum(targetSum-numbers[i], numbers,  mem);
        if (result != null) {
            mem[targetSum] = [...result, numbers[i]];
            results.push(mem[targetSum]);
        } 
    }
    if (results.length > 0) {
        let min = results[0];
        for(let i=0; i < results.length; i++) {
            if(results[i].length < min.length) {
                min =  results[i];
            }
        }
        return min;
    }
    mem[targetSum] = null;
    return null;
}

// can we construct target string based on wordBank repeating
// words any times possible
function canConstruct(targetString, wordBank, mem={}) {
    console.log('callstack', targetString);
    if (targetString.length === 0) {
        return true;
    }

    if (targetString.length < 0) {
        return false;
    }

    if (targetString in mem) {
        return mem[targetString];
    }

    for (let i=0; i<wordBank.length; i++) {
        const word = wordBank[i];
        if (targetString.startsWith(word)) {
            if (canConstruct(targetString.slice(word.length), wordBank)) {
                mem[targetString.slice(word.length)] = true;
                return true;
            }
        }
    }

    mem[targetString] = false;
    return false;
}





console.log(canSum(20, [1, 2, -5, 3, 2, 1, 5, 18]));
console.log(canSum(20, [1, 2, -5, 3, 2, 1, 5, 8]));
console.log(canSum(20, [1, 2, -5, 3, 2, 1, 5, 31]));

console.log(canSumRepeat(21, [3, 7]));

console.log(howSum(21, [3, 7]));

console.log(howSum(7, [5, 3, 4, 7]));

console.log(bestSum(7, [5, 3, 4, 7]));

console.log(canConstruct('helloworld', ['hello', 'not', 'world']));