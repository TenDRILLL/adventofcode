const fs = require("node:fs");
fs.readFile("./input.txt", null, (e,data)=> {
    const input = data.toString().split("\r\n");

    const len = input.length;
    const wid = input[0].length;
    let visibleTrees = 0;
    let scenic = 0;

    input.forEach((row,i) => {
        if(i === 0 || i === len - 1) return visibleTrees += row.length;
        row.split("").forEach((tree,j) => {
            if(j === 0 || j === wid - 1) return visibleTrees++;
            const a = checkTree(parseInt(tree),i,j);
            if(a[0]){
                visibleTrees++;
            }
            if(a[1] > scenic) scenic = a[1];
        });
    });

    console.log(`${visibleTrees} trees are visible.`);
    console.log(`The best scenic score is: ${scenic}`);

    function checkTree(tree,row,pos){
        let visibleUP = true;
        let visibleDOWN = true;
        let visibleLEFT = true;
        let visibleRIGHT = true;
        let scenic = [0,0,0,0];
        for(let i = row-1; i >= 0; i--){ //UP
            if(visibleUP) scenic[0]++;
            if(input[i][pos] >= tree) visibleUP = false;
        }
        for(let i = row+1; i <= len-1; i++){ //DOWN
            if(visibleDOWN) scenic[1]++;
            if(input[i][pos] >= tree) visibleDOWN = false;

        }
        for(let i = pos-1; i >= 0; i--){ //LEFT
            if(visibleLEFT) scenic[2]++;
            if(input[row][i] >= tree) visibleLEFT = false;
        }
        for(let i = pos+1; i <= wid-1; i++){ //RIGHT
            if(visibleRIGHT) scenic[3]++;
            if(input[row][i] >= tree) visibleRIGHT = false;
        }
        return [visibleUP || visibleDOWN || visibleLEFT || visibleRIGHT,scenic.reduce((a,b)=>a*b)];
    }
});