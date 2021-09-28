const { contextBridge } = require('electron');
const fs = require('fs')


let markers = require('./data/markers.json');

contextBridge.exposeInMainWorld(
    'markerOptions', {
        markers,
        saveMarker
    }
    );

function saveMarker(name, longitude, latitude, z) {
    let marker = {
        'name': name,
        'longitude': longitude,
        'latitude': latitude,
        'z': z
    }
    markers.push(marker);
    fs.writeFileSync('./data/markers.json', JSON.stringify(markers));
}