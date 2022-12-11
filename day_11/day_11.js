const fs = require("node:fs");
let monkeys = [];
let monkeyStorage = [];
let productOfDivideBy = 1;
fs.readFile("./input.txt", null, (e,data)=> {
    const input = data.toString().split("\r\n");
    input.forEach((info,i) => {
        if(info.startsWith("Monkey")){
            const monkey = {
                items: input[i+1].split(": ")[1].split(", "),
                operation: input[i+2].split("= ")[1],
                test: {
                    divisibleBy: parseInt(input[i+3].split("by ")[1]),
                    true: parseInt(input[i+4].split("monkey ")[1]),
                    false: parseInt(input[i+5].split("monkey ")[1])
                },
                inspected: 0
            };
            monkeys[parseInt(info.split(" ")[1].substring(-1))] = monkey;
            monkeyStorage[parseInt(info.split(" ")[1].substring(-1))] = JSON.parse(JSON.stringify(monkey));
            productOfDivideBy *= parseInt(input[i+3].split("by ")[1]);
        }
    });
    for(let i = 0; i < 20; i++){
        monkeyBusiness(true);
    }
    monkeys = monkeys.sort((a,b) => b.inspected - a.inspected);
    console.log(`Level of monkey business after 20 rounds: ${monkeys[0].inspected * monkeys[1].inspected}`);
    monkeys = [...monkeyStorage];
    for(let i = 1; i < 10001; i++){
        monkeyBusiness(false);
    }
    monkeys = monkeys.sort((a,b) => b.inspected - a.inspected);
    console.log(`Level of monkey business after 10000 rounds: ${monkeys[0].inspected * monkeys[1].inspected}`);
});

function monkeyBusiness(part1){
    monkeys.forEach(monkey => {
        let monkeyItems = [...monkey.items];
        monkey.items.forEach((item) => {
            let calculation = monkey.operation.replace(/[^-()\d/*+old]/g, "");
            calculation = calculation.replace(/old/g,item);
            let worry;
            if(part1){
                worry = Math.floor(eval(calculation)/3);
            } else {
                worry = Math.floor(eval(calculation)%productOfDivideBy);
            }
            if(worry % monkey.test.divisibleBy === 0){
                monkeys[monkey.test.true].items.push(worry);
                monkeyItems.splice(0,1);
            } else {
                monkeys[monkey.test.false].items.push(worry);
                monkeyItems.splice(0,1);
            }
            monkey.inspected++;
        });
        monkey.items = monkeyItems;
    });
}