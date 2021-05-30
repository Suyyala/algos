function gridTravel(m , n, mem={}) {
    let key = m + ',' + n;
    if (m == 0 || n==0) {
        return 0;
    }

    if (m === 1 || n == 1) {
        return 1;
    }
    if (key in mem) {
        return mem[key];
    }
    
    // two choces -> Down or Right
    mem[key] = gridTravel(m-1, n, mem) + gridTravel(m, n-1, mem);
    return mem[key];
}


console.log(gridTravel(2, 3));

