const fs = require("node:fs");
fs.readFile("./input.txt", null, (e,data)=>{
    const input = data.toString().split("");
    let tempArr = [];
    let found = false;
    input.forEach((packet,i) =>{
        tempArr.push(packet);
        if(tempArr.length >= 5){
            tempArr.splice(0,1);
        }
        if(tempArr.length === 4 && !containsDuplicates(tempArr)){
            if(!found){
                console.log(`Start-of-packet signal found at packet ${i+1}
The signal: ${tempArr.join("")}`);
                found = true;
            }
        }
    });
    tempArr = [];
    found = false;
    input.forEach((packet,i) =>{
        tempArr.push(packet);
        if(tempArr.length >= 15){
            tempArr.splice(0,1);
        }
        if(tempArr.length === 14 && !containsDuplicates(tempArr)){
            if(!found){
                console.log(`Start-of-message signal found at packet ${i+1}
The signal: ${tempArr.join("")}`);
                found = true;
            }
        }
    });
});

function containsDuplicates(array) {
    let dupes = false;
    array.forEach(elem => {
        if(array.filter(x => x === elem).length > 1){
            dupes = true;
        }
    });
    return dupes;
}