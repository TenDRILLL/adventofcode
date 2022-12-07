const fs = require("node:fs");
fs.readFile("./input.txt", null, (e,data)=>{
    const arr = data.toString().split("\r\n");
    let total = 0;
    let total2 = 0;
    arr.forEach(pair => {
        pair = pair.split(",");
        const pair0_0 = parseInt(pair[0].split("-")[0]);
        const pair0_1 = parseInt(pair[0].split("-")[1]);
        const pair1_0 = parseInt(pair[1].split("-")[0]);
        const pair1_1 = parseInt(pair[1].split("-")[1]);
        if(pair0_0 <= pair1_0 && pair0_1 >= pair1_1){
            total++;
        } else if(pair1_0 <= pair0_0 && pair1_1 >= pair0_1){
            total++;
        }
        if(pair1_0 >= pair0_0 && pair1_0 <= pair0_1){
            total2++;
        } else if(pair1_1 >= pair0_0 && pair1_1 <= pair0_1){
            total2++;
        } else if(pair0_0 >= pair1_0 && pair0_0 <= pair1_1){
            total2++;
        } else if(pair0_1 >= pair1_0 && pair0_1 <= pair1_1){
            total2++;
        }
    });
    console.log(`${total} pairs overlap completely.`);
    console.log(`${total2} pairs overlap partially.`);
});