function find_neighbors(v) {
return [];
}

function bfs(s) {
    let q = [];
    q.push(s);
    while (q.length > 0) {
        let v = q.pop();
        if (v.visted) {
            continue;
        }
        v.visted = true;
        console.log(v);
        let n = find_neighbors(v);
        q = [q, ...n];
    }
}

function dfs(s) {
    s.visted = true;
    console.log(s);
    let n = find_neighbors(s);
    for (let i=0; i <= n.length; i++) {
        if (!n[i].visted) {
            dfs(n[i]);
        }
       
    }
 }

 function preorder() {

 }

 function postOrder() {

 }

 function isConnected(s, v) {
    return false;
 }