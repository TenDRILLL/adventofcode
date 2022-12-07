const fs = require("node:fs");
fs.readFile("./input.txt", null, (e,data)=>{
    const input = data.toString().split("\r\n");
    let crates = [[],[],[],[],[],[],[],[],[]];
    let crates2 = [[],[],[],[],[],[],[],[],[]];
    let tempcrates = [[],[],[],[],[],[],[],[]];
    input.slice(0,8).forEach((row,column) =>{
        for(let i = 1; i < row.length; i += 4){
            tempcrates[column].push(row[i]);
        }
    });
    tempcrates.forEach((x,y) => {
        if(x.length < 9){ for(let i = x.length; i < 9; i++){ tempcrates[y].push(" "); } }
        x.forEach((crate,pos)=>{
            crates[pos].push(crate);
            crates2[pos].push(crate);
        });
    });
    crates = crates.map(x => x.reverse());
    crates2 = crates2.map(x => x.reverse());
    crates.forEach((y,i) => {
        crates[i] = y.filter(x => x !== " ");
    });
    crates2.forEach((y,i) => {
        crates2[i] = y.filter(x => x !== " ");
    });
    /*All crates are now in proper slots and empty ones are removed.*/
    input.slice(10,input.length).forEach((inst)=>{
        inst = inst.split(" ");
        const move = inst[1];
        const from = inst[3];
        const to = inst[5];
        for(let i = 0; i < move; i++){
            let crate = crates[from-1].pop();
            crates[to-1].push(crate);
        }
    });
    let top = "";
    crates.forEach(x => {
        if(x.length > 0) top += x.pop();
    });
    console.log(`Crates at the top with 9000 are: ${top}`);
    input.slice(10,input.length).forEach((inst)=>{
        inst = inst.split(" ");
        const move = parseInt(inst[1]);
        const from = parseInt(inst[3])-1;
        const to = parseInt(inst[5])-1;
        const a = crates2[from].slice(parseInt(move)*-1);
        crates2[from].length = crates2[from].length-move;
        crates2[to] = [...crates2[to],...a];
    });
    let top2 = "";
    crates.forEach(x => {
        if(x.length > 0) top2 += x.pop();
    });
    console.log(`Crates at the top with 9001 are: ${top2}`);
});
