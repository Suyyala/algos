function fib(n, memo= {}) {
    if(n < 2) {
        return 1;
    }
    if (memo[n]) {
        return memo[n];
    }
    memo[n] =  fib(n-1, memo) + fib(n-2, memo);
    return memo[n];
}

function fib2(n) {
    let prev1 = 1;
    let prev2 = 0;
    let fib = 1;
    let i = 1;
    while( i <= n) {
        fib = prev1 + prev2;
        prev2 = prev1;
        prev1 = fib;
        i = i + 1;
        
    }
    return fib;
}

console.log(fib(5));
console.log(fib2(5));