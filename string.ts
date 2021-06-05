

// Also called EditDistance Problem -  Cheapest way to transform s -> t

function minTransform(s, t, mem={}) {
    // base case 
    if (!s || s.length === 0) {
        return t.length;
    }

    if (!t || t.length === 0) {
        return s.length;
    }

    if (s === t) {
        return 0;
    }

    if (s.length === 1 && t.length === 1) {
        return 1;
    }
    let key = s + ';' + t;
    if (key in mem) {
        console.log('cache hit', key);
        return mem[key];
    }

    if (s[0] === t[0]) {
        mem[key] = minTransform(s.slice(1), t.slice(1), mem);
        return mem[key];
    }

    mem[key] = Math.min(
        // replace
        1 + minTransform(s.slice(1), t.slice(1), mem),
        // insert
        1  + minTransform(s, t.slice(1), mem),
        // delete
        1 + minTransform(s.slice(1), t, mem));
    return mem[key];
    
}

console.log(minTransform("sunday", "saturday"));
console.log(minTransform("cat", "cut"));
console.log(minTransform("scat", "cut"));
console.log(minTransform("abc", "def"));
console.log(minTransform("abc", "bcd"));