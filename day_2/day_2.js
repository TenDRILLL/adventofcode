const winState = [0,3,6];
const fs = require("node:fs");
fs.readFile("./input.txt", null, (e,data)=>{
    let input = data.toString().split("\r\n");
    const points = {X: 1, Y: 2, Z: 3, A: 1, B: 2, C: 3};
    input = input.map(x => {return {enemy: points[x.split(" ")[0]], me: points[x.split(" ")[1]]}});

    let total = 0;

    input.forEach(duel => {
        if(duel.enemy === duel.me){
            total += (duel.me + winState[1]);
        } else {
            total += checkifwin(duel);
        }
    });
    console.log(`Total if you won all games: ${total}`);
    let newTotal = 0;
    input.forEach(duel => {
        if(duel.me === 2){
            newTotal += (duel.enemy + winState[1]);
        } else {
            newTotal += duel.me === 1 ? ((duel.enemy - 1 === 0 ? 3 : duel.enemy - 1) + winState[0]) : ((duel.enemy + 1 === 4 ? 1 : duel.enemy + 1) + winState[2]);
        }
    });
    console.log(`Total with advanced guide: ${newTotal}`);
});

function checkifwin(duel){
    switch(duel.me){
        case 1:
            return (duel.me + winState[duel.enemy === 2 ? 0 : 2]);
        case 2:
            return (duel.me + winState[duel.enemy === 3 ? 0 : 2]);
        case 3:
            return (duel.me + winState[duel.enemy === 1 ? 0 : 2]);
    }
}