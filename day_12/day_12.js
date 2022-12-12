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
    let current = start;
    pathfind([]);

    function pathfind(path){
        const left = input[current[0]][current[1]-1];
        const right = input[current[0]][current[1]+1];
        const up = input[current[0]-1][current[1]];
        const down = input[current[0]+1][current[1]];
        //This is the point where I realized I have no way of computing the shortest route, and would essentially be just finding what's the smallest right now.
        //That does NOT guarantee the shortest way from start to goal, and therefore I am unable to compute it.
    }
});
