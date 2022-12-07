const fs = require("node:fs");
fs.readFile("./input.txt", null, (e,data)=>{
    let arr = data.toString().split("\r\n\r");
    arr.forEach((x,i) => arr[i] = x.split("\r\n"));
    let results = [];
    arr.forEach((set,i) => {
        let calories = 0;
        set.forEach(item => {
            calories = calories + parseInt(item);
        });
        results[i] = calories;
    });
    console.log(`Most calories in snacks are with Elf #${results.indexOf(Math.max(...results)) + 1} - ${Math.max(...results)} calories`);
    let top3 = [];
    for(let i = 0; i < 3; i++){
        const x = results.splice(results.indexOf(Math.max(...results)),1);
        top3.push(+x);
    }
    const total = top3.reduce((a,b)=> a+b);
    console.log(`Top 3 are carrying: ${top3.join(" + ")} = ${total}`);
});