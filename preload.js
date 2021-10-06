const { contextBridge } = require('electron');
const fs = require('fs')


let path = './data/markers.json';

contextBridge.exposeInMainWorld(
    'api', {
        load,
        save
    }
);

function load () {
    let data = fs.readFileSync(path);
    return  JSON.parse(data);
}

function save (data) {
    fs.writeFileSync(path, JSON.stringify(data));
}