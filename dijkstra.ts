
/*

Finds short path in a (weighted - non-negative)graph from start to end
Algorithm:
we keep track of the state cost of the travel
   table ->  cost from 'start' to each visited node + visited from (prev)
1. init above table with given start node
2. starting with node 'start', of all its neighbots update distance
3. select the one with short distance and start exploring its neights and update
cost if new cost is lower than prev one
4. repeat until start has recahed end and return the cost from the table


*/

function Node1(value) {
    this.value = value;
    this.parent = null;
    this.left = null;
    this.right = null;
}

let Heap = function() {
    this.root = null;
    this.empty = null;
    this.heapifyUp = function(start) {
        if(!start) {
            return;
        }
        let parent = start.parent;
        while(parent) {
            if (start.value > parent.value) {
                this.swap(start, parent);
            } else {
                break;
            }
        }
    };
    this.heapifyDown = function(start) {
        if (!start) { 
            return;
        }
        let temp = start;
        while (temp) {
           if (temp.left && temp.right) {
               if (temp.left.value > temp.right.value && temp.left.value > temp.value) {
                temp = temp.left;
               } else if (temp.right.value > temp.left.value && temp.right.value > temp.value) {
                temp = temp.right;
               } else {
                   break;
               }
           } else if (temp.left && temp.left.value > temp.value) {
               temp = temp.left;
           } else if(temp.right && temp.right.value > temp.value) {
               temp = temp.right;
           } else {
               break;
           }
        }
        return;

    };
    this.inorderSuccesor = function() {
        // this is level order traversal
        if(!this.root) {
            return null;
        }
        let q = [this.root];
        while (q.length > 0) {
            let node = q.shift();
            if(node.left && node.right) {
                q.push(node.left);
                q.push(node.right);
            } else  {
                return node;
            }
        }
        console.error('shouldnt be reaching here');
        return null;
    };
    this.swap = function(node1, node2) {
        let temp = node1.value;
        node1.value = node2.value;
        node2.value = temp;
    };
    this.insert = function(val) {
        if(!this.root) {
            this.root = new Node1(val);
            return;
        }
        // find inorder - successor
        let newNode = new Node1(val);
        let node = this.inorderSuccesor();
        newNode.parent = node;
        if (!node.left) {
            node.left = newNode;
        }
        if (!node.right) {
            node.right = newNode;
        }
        this.heapifyUp(newNode);
    }

    this.extractLastNode = function() {
        let temp = this.root;
        let q = [this.root];
        while (q.length > 0) {
            let temp  = q.shift();
            if (temp.left) {
                q.push(temp.left);
            }
            if (temp.right) {
                q.push(temp.right);
            }
            if (q.length === 0) {
                if(temp.parent) {
                    if (temp.parent.right) {
                        temp.parent.right = null;
                    } else if (temp.parent.left) {
                        temp.parent.left = null;
                    }
                } else {
                    this.root = null;
                }
                return temp;
            }
        }
        console.error('should never reach here');
        return null;
    };

    this.pop = function() {
        let temp = this.root;
        let node = this.extractLastNode();
        if (temp !== node) {
            this.swap (this.root, this.node);
            this.heapifyDown(this.root);
        }
    };

    this.peek = function() {
        return this.root ? this.root.value : null;
    };

    this.printInorder = function() {
        if(!this.root) {
            return;
        }
        this.printInorder(this.root.left);
        console.log(this.root.value);
        this.printInorder(this.root.right);
        return;
    };
}

let  Graph =  function () {
    this.numberOfVertices = 0;
    this.adjList =  {};

    this.addEdge = function(u, v, w) {
        this.adjList[u][v] = w;
        this.adjList[v][u] = w;
    };

    this.addVertex = function(u) {
        this.numberOfVertices++;
        this.adjList[u] = {};
    }

    this.getNeighbors = function(u) {
        return Object.keys(this.adjList[u]);
    }

    this.bfs = function(start) {
        let q = [start];
        let visited = {};
        while(q.length > 0) {
            let node = q.shift();
            console.log(node);
            visited[node] = true;
            let neighbors = this.getNeighbors(node);
            for(let i=0; i<neighbors.length; i++) {
                let neighbor =  neighbors[i];
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
    }

    this.dfs = function(start, visited ={}) {
        if(visited[start]) {
            return;
        }
        console.log(start);
        visited[start] = true;
        let nbors = this.getNeighbors(start);
        for(let i=0; i < nbors.length; i++) {
            let nbor = nbors[i];
            if (!visited[nbor]) {
                this.dfs(nbor, visited);
            }
        }

    }

    this.dijkstra  = function(start, end) {
        let q = [start];
        let visited = {};
        let cost = {};
        cost[start] = 0;
        let temp = start;
        while (q.length > 0) {
            console.log(cost, visited);
            // get the next shortest one from heap or priority queue
            visited[temp] = true;
            let nbors = this.getNeighbors(temp);
            // update neighors costs from A
            for (let i=0; i < nbors.length; i++) {
                let nbor = nbors[i];
                if(!visited[nbor]) {
                    if (!cost[nbor]) {
                        cost[nbor]  = cost[temp] + this.adjList[temp][nbor];
                    } else if (cost[nbor] > cost[temp] + this.adjList[temp][nbor]) {
                        cost[nbor] = cost[temp] + this.adjList[temp][nbor];
                    }
                }
            }
            console.log('after updating costs', cost, visited);
            // next node to explore -> pick neighbor with min cost from 'A'
            let nextTemp = null;
            for (let i=0; i < nbors.length; i++) {
                let nbor = nbors[i];
                if (!visited[nbor]) {
                    if (!nextTemp) {
                        nextTemp = nbor;
                    } else if (cost[nbor] <  cost[nextTemp]) {
                        nextTemp = nbor;
                    }
                }
            }
            console.log('next node', nextTemp, cost[nextTemp]);
            temp = nextTemp;
        }
        return cost[end];
    }
};

let g = new Graph();
g.addVertex('a');
g.addVertex('b');
g.addVertex('c');
g.addVertex('d');
g.addVertex('e');

g.addEdge('a', 'b', 1);
g.addEdge('a', 'c', 4);
g.addEdge('b', 'd', 3);
g.addEdge('b', 'c', 2);
g.addEdge('d', 'e', 4);
g.addEdge('c', 'e', 3);


console.log('bfs:');
g.bfs('a');
console.log('dfs:');
g.dfs('a');


console.log('Heap...');
let heap  = new Heap();
heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);
heap.insert(6);
heap.insert(7);
heap.printInorder();

console.log('shortest path cost.. dijktra, a to e', g.dijkstra('a', 'e') );
console.log('shortest path cost.. dijktra, a to c', g.dijkstra('a', 'c') );





