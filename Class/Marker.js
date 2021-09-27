class Marker {
    longitude;
    latitude;
    z;
    name;
    viewer;

    constructor (viewer, name, longitude, latitude, z) {
        this.viewer = viewer;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.z = z;
    }

    addMarker () {
        this.viewer.entities.add({
            name : this.name,
            position : Cesium.Cartesian3.fromRadians(this.longitude, this.latitude, this.z),
            point : {
              pixelSize : 5,
              color : Cesium.Color.RED,
              outlineColor : Cesium.Color.WHITE,
              outlineWidth : 2,
              heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND 
            }
        })
    }

}