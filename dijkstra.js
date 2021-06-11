
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
        while (q.length > 0 && temp && temp !== end) {
            console.log(cost, visited);
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
console.log('shortest path cost.. dijktra, a to e', g.dijkstra('a', 'e') );
console.log('shortest path cost.. dijktra, a to c', g.dijkstra('a', 'c') );





