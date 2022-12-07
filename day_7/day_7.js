const _ = require('lodash');
const fs = require("node:fs");
/*---------VARIABLES---------*/
const systemSize = 70000000;
const updateReq = 30000000;
/*--------------------------*/
fs.readFile("./input.txt", null, (e,data)=>{
    const input = data.toString().split("\r\n");
    let currentpath = "";
    let filesystem = {};
    input.forEach(cmd => {
        if(cmd.startsWith("$")){
            if(cmd.startsWith("$ cd")){
                const dir = cmd.split("cd ")[1];
                if(dir === "/") return currentpath = "/";
                if(currentpath === "/") currentpath = "";
                if(dir === ".."){
                    currentpath = currentpath.split("/");
                    currentpath.length = currentpath.length -1;
                    currentpath = currentpath.join("/");
                } else {
                    currentpath = currentpath.split("/");
                    currentpath.push(dir);
                    currentpath = currentpath.join("/");
                }
            }
        } else {
            const pathArr = currentpath.split("/");
            pathArr.splice(0,1);
            if(cmd.startsWith("dir")){
                if(pathArr.length === 0 || pathArr[0] === ""){
                    _.set(filesystem,cmd.split("dir ")[1],{});
                } else {
                    if(_.get(filesystem,pathArr.join(".")) === undefined){
                        _.set(filesystem,pathArr.join("."),{});
                    }
                    _.set(filesystem,`${pathArr.join(".")}.${cmd.split("dir ")[1]}`,{});
                }
            } else {
                if(pathArr.length === 0 || pathArr[0] === ""){
                    filesystem["files"] = filesystem["files"] ?? [];
                    filesystem["files"] = [...filesystem["files"],cmd];
                    filesystem["size"] = filesystem["size"] ?? 0;
                    filesystem["size"] += parseInt(cmd.split(" ")[0]);
                } else {
                    let dir = _.get(filesystem,pathArr.join("."));
                    dir["files"] = dir["files"] ?? [];
                    dir["files"] = [...dir["files"],cmd];
                    dir["size"] = dir["size"] ?? 0;
                    dir["size"] += parseInt(cmd.split(" ")[0]);
                    _.set(filesystem,pathArr.join("."),dir);
                    if(pathArr.length > 1){
                        for(let i = 0; i < pathArr.length; i++){
                            let path2 = pathArr.slice(0,i*-1).join(".");
                            if(i === 0){
                                path2 = pathArr.join(".");
                            }
                            const a = _.get(filesystem, path2);
                            a["totalSize"] = a["totalSize"] ?? 0;
                            a["totalSize"] += parseInt(cmd.split(" ")[0]);
                            _.set(filesystem, path2, a);
                        }
                    } else {
                        const a = _.get(filesystem, pathArr[0]);
                        a["totalSize"] = a["totalSize"] ?? 0;
                        a["totalSize"] += parseInt(cmd.split(" ")[0]);
                        _.set(filesystem, pathArr[0],a);
                    }
                }
            }
        }
    });
    let foldersUnder100000 = [];
    let toDeleteFolder = {path: "", size: 70000000};
    function loooper(obj,starterpath,path = `${starterpath}.`,size = 0) {
        for (let k in obj) {
            if (typeof obj[k] === "object" && obj[k] !== null && k !== "files" && k !== "size" && k !== "totalSize"){
                path = path += `${k}.`;
                loooper(obj[k],starterpath,path,size);
            } else {
                if(k === "size"){
                    size += parseInt(obj[k]);
                }
                if(k === "totalSize"){
                    if(parseInt(obj[k]) <= 100000){
                        let x = path.substring(0,path.length-1);
                        foldersUnder100000.push({
                            path: x,
                            totalSize: obj[k]
                        });
                    }
                }
            }
        }
    }

    function loooper2(obj,starterpath,path = `${starterpath}.`,size = 0) {
        for (let k in obj) {
            if (typeof obj[k] === "object" && obj[k] !== null && k !== "files" && k !== "size" && k !== "totalSize"){
                path = path += `${k}.`;
                loooper2(obj[k],starterpath,path,size);
            } else {
                if(k === "size"){
                    size += parseInt(obj[k]);
                }
                if(k === "totalSize"){
                    if(parseInt(obj[k]) >= updateSize && parseInt(obj[k]) < toDeleteFolder.size){
                        toDeleteFolder = {
                            path: path.substring(0,path.length-1),
                            size: parseInt(obj[k])
                        }
                    }
                }
            }
        }
    }

    Object.keys(filesystem).forEach(folder => {
        loooper(filesystem[folder],folder);
    });
    Object.keys(filesystem).forEach(folder => {
        filesystem["totalSize"] = filesystem["totalSize"] ?? 0;
        if(folder === "size") return filesystem["totalSize"] += filesystem[folder];
        if(folder === "files") return;
        filesystem["totalSize"] += parseInt(filesystem[folder]["totalSize"]);
    });
    const sizes = foldersUnder100000.map(x => x.totalSize).reduce((x,y) => x + y);
    const updateSize = (systemSize - filesystem.totalSize - updateReq) * -1;
    Object.keys(filesystem).forEach(folder => {
        loooper2(filesystem[folder],folder);
    });
    console.log(`
Size of folders on the system with size less than 100000 is: ${sizes}
---
Space required for updating the system: ${updateSize}
Deleting folder /${toDeleteFolder.path} frees up ${toDeleteFolder.size} space,
making space available for the update to be ${(systemSize - filesystem.totalSize) + toDeleteFolder.size} (requires ${updateReq}),
and leaving ${(systemSize - filesystem.totalSize) + toDeleteFolder.size - updateReq} free space after the update.
`);
});