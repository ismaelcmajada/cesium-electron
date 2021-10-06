const markerList = {
    markers: [],
    viewer: null,


    load: function (viewer) {
        this.viewer = viewer;
        this.markers = api.load();

        this.markers.forEach(marker => {
            this.addToViewer(marker, marker.id);
        });

    },

    save: function () {
        api.save(this.markers);
    },

    addToViewer: function (marker, id = null) {
        return this.viewer.entities.add({
            id: marker.id,
            name: marker.name,
            position: Cesium.Cartesian3.fromRadians(marker.longitude, marker.latitude),
            description: marker.description,
            point: {
                pixelSize: 5,
                color: Cesium.Color.RED,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2,
                heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
            },
            label: {
                text: marker.name,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                pixelOffset: new Cesium.Cartesian2(0.0, -30),
                scale: 0.75,
                fillColor: Cesium.Color.YELLOW,
                pixelOffsetScaleByDistance: new Cesium.NearFarScalar(
                    1.5e2,
                    3.0,
                    1.5e7,
                    0.5
                ),
            }
        })
    },

    add: function (marker) {

        let entity = this.addToViewer(marker);
        marker.id = entity.id;
        this.markers.push(marker);

        this.save();


    },

    update: function (entity) {
        let cartographic = Cesium.Cartographic.fromCartesian(entity.position.getValue());

        let lat = cartographic.latitude;
        let lon = cartographic.longitude;

        let index = this.markers.findIndex(marker => marker.id == entity.id);

        this.markers[index].name = entity.name;
        this.markers[index].longitude = lon;
        this.markers[index].latitude = lat;
        this.markers[index].description = entity.description.getValue();

        this.save();
    },

    remove: function (entity) {

        let index = this.markers.findIndex(marker => marker.id == entity.id);

        this.markers.splice(index, 1);
        this.viewer.entities.remove(entity)
        this.save();
    },
}