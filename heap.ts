function heapifyRoot(maxHeap) {
    let index = 0;
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let max = index;
    
    while ( index < maxHeap.length ) {
      if (left < maxHeap.length && maxHeap[left] > maxHeap[max]) {
        max = left;
      }
      
      if (right < maxHeap.length && maxHeap[right] > maxHeap[max]) {
        max = right;
      }
      // swap
      let t = maxHeap[index];
      maxHeap[index] = maxHeap[max];
      maxHeap[max] = t;
      index = max;
      left = 2 * index + 1;
      right = 2 * index + 2;
    }
  }
  
  function extractMax(maxHeap) {
    if (maxHeap.length < 0) {
      return -1;
    }
    let root = maxHeap[0];
    if (maxHeap.length === 1) {
      maxHeap.length = 0;
      return root;
    }
    maxHeap[0] = maxHeap[maxHeap.length - 1];
    maxHeap.length = maxHeap.length - 1;
    heapifyRoot(maxHeap);
    return root;
    
  }
  
  function heapify(maxHeap) {
    let index = maxHeap.length - 1;
    let parent = Math.floor(index / 2);
    while (parent >= 0) {
      if (maxHeap[parent] < maxHeap[index]) {
        let t = maxHeap[parent];
        maxHeap[parent] = maxHeap[index];
        maxHeap[index] = t;
      }
      index = parent;
      parent = Math.floor (index / 2);
    }
  }
  function buildHeap(arr) {
    let maxHeap = [];
    for (let i=0; i<arr.length; i++) {
      // inset at the end of the current heap
      maxHeap.push(arr[i]);
      heapify(maxHeap)
    }
    return maxHeap;
  }
  
  function isEmpty(maxHeap) {
    return maxHeap.length <= 0;
  }