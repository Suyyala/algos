function swap(arr, i, j) {
    let t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
}

function bubbleSort(arr) {
    // in place
    // bubble max element to the end
    // repeat above for all except already bubbled
    for(let i=0; i < arr.length; i++) {
        for(let j=0; j < arr.length - i - 1; j++) {
            // lets bubble now
            if (arr[j] > arr[j+1]) {
                swap(arr, j, j+1);
            }
        }
    }
    return arr;
}

console.log(bubbleSort([2, 3, 4, 1, 6, 5, 4]));
console.log(bubbleSort([1]));
console.log(bubbleSort([2, 1]));


function quickSort(arr) {
    // in place sort
    if (!arr || arr.length < 2) {
        return arr;
    }
    let pivot = arr[0];
    let partitionHelper = function(arr, ) {

    };
    return arr;
}