const fs = require("node:fs");
fs.readFile("./testinput.txt", null, (e,data)=> {
    const input = data.toString().split("\r\n");
    let start, goal;
    input.forEach((row,i) => {
        row = row.split("");
        if(row.includes("S")){
            start = [i,row.indexOf("S")];
        }
        if(row.includes("E")){
            goal = [i,row.indexOf("E")];
        }
        row.forEach((x,j) => {
            if(x.charCodeAt(0) > 96){
                row[j] = x.charCodeAt(0)-96;
            }
        });
        input[i] = row;
    });
    let paths = [];
    pathfind(start);

    function pathfind(current){
        if(paths.filter(x => x.startsWith(`${current[0]}$${current[1]}`)).length === 1) return;
        const left = input[current[0]][current[1]-1] !== undefined ? input[current[0]][current[1]-1] : 100;
        const right = input[current[0]][current[1]+1] !== undefined ? input[current[0]][current[1]+1] : 100;
        const up = input[current[0]-1] !== undefined ? input[current[0]-1][current[1]] : 100;
        const down = input[current[0]+1] !== undefined ? input[current[0]+1][current[1]] : 100;
        let tocheck = [];
        console.log(current);
        if(left - current[0] <= 1) tocheck.push([0,-1,left]); console.log("L");
        if(right - current[0] <= 1) tocheck.push([0,1,right]); console.log("R");
        if(up - current[1] <= 1) tocheck.push([-1,0,up]); console.log("U");
        if(down - current[1] <= 1) tocheck.push([1,0,down]); console.log("D");
        tocheck.forEach(coordinate => {
            const visitedEntryNodes = paths.map(x => parseInt(x.split("$")[0]));
            const entryNode = current[0] + coordinate[0];
            const exitNode = current[1] + coordinate[1];
            const value = coordinate[2];
            if(visitedEntryNodes.includes(exitNode)) return;
            paths.push(`${entryNode}$${exitNode}$${value}`);
            pathfind([entryNode,exitNode]);
        });
    }
    console.log(paths);
});
