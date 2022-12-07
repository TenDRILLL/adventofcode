const fs = require("node:fs");
fs.readFile("./input.txt", null, (e,data)=>{
    const arr = data.toString().split("\r\n");
    let total = 0;
    arr.forEach(sack => {
        const a = sack.split("");
        const b = a.splice(0,a.length/2);
        let c = a.filter(x => b.includes(x));
        let dupes = [];
        c = c.filter(x => {if(dupes.includes(x)){return false;} else {dupes.push(x);return true;}});
        c.forEach(item => {
            total += item === item.toUpperCase() ? item.charCodeAt(0)-38 : item.charCodeAt(0)-96;
        });
    });
    console.log(`Priority of same items in both compartments in all sacks: ${total}`);
    let badges = 0;
    for(let i = 0; i < arr.length; i += 3){
        const badge = arr[i].split("").filter(x => arr[i+1].split("").includes(x)).filter(x => arr[i+2].split("").includes(x))[0];
        badges += badge === badge.toUpperCase() ? badge.charCodeAt(0)-38 : badge.charCodeAt(0)-96;
    }
    console.log(`Priority of badges is: ${badges}`);
});