class Marker {
    longitude;
    latitude;
    z;
    name;
    viewer;
    description;
    entity;

    constructor (viewer, name, longitude, latitude, z, description = "") {
        this.viewer = viewer;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.z = z;
        this.description = description;
        this.entity = null;
    }

    addMarker () {
        let marker = this.viewer.entities.add({
            name : this.name,
            position : Cesium.Cartesian3.fromRadians(this.longitude, this.latitude, this.z),
            point : {
              pixelSize : 5,
              color : Cesium.Color.RED,
              outlineColor : Cesium.Color.WHITE,
              outlineWidth : 2,
              heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND 
            },
			label: {
				text: this.name,
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
				pixelOffset: new Cesium.Cartesian2(0.0, -20),
				scale: 0.5,
				fillColor: Cesium.Color.BLACK,
				pixelOffsetScaleByDistance: new Cesium.NearFarScalar(
					1.5e2,
					3.0,
					1.5e7,
					0.5
				),
			}
        })
        this.entity = marker;
        
    }

}