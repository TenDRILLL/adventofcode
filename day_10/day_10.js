const fs = require("node:fs");
const signalStrength = [];
const inspectArr = [20,60,100,140,180,220]
fs.readFile("./input.txt", null, (e,data)=> {
    const input = data.toString().split("\r\n");
    let cycle = 1;
    let x = 1;
    check(cycle,x);
    input.forEach(cmd => {
        if(cmd === "noop") cycle++;
        if(cmd.startsWith("addx")){
            cycle++;
            check(cycle,x);
            x += parseInt(cmd.split("addx")[1]);
            cycle++;
        }
        check(cycle,x);
    });
    console.log(`Sum of signal strengths at ${inspectArr.join(", ")}
> ${signalStrength.reduce((a,b)=> a+b)}`);
});

let renderstr = "";
function check(cycle, register){
    if(inspectArr.includes(cycle)){
        signalStrength.push(cycle*register);
    }
    if([(register % 40) - 1, register % 40, (register % 40) + 1].includes((cycle-1) % 40)){
        renderstr += "#";
    } else {
        renderstr += ".";
    }
    if(cycle % 40 === 0){
        console.log(renderstr);
        renderstr = "";
    }
}