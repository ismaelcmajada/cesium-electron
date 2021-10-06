let nav = document.getElementById("top_nav");
let nav2 = document.getElementById("top_nav2");

viewer.selectedEntityChanged.addEventListener(function (selectedEntity) {
    if (Cesium.defined(selectedEntity)) {
        nav.style.display = "flex";
        nav2.style.display = "flex";

        let cartographic = Cesium.Cartographic.fromCartesian(selectedEntity.position.getValue());

        let lat = cartographic.latitude;
        let lon = cartographic.longitude;

        nav.innerHTML = "<div>Latitud: " + lat + "</div>"
        nav.innerHTML += "<div>Longitud: " + lon + "</div>"

    } else {
        nav.style.display = "none";
        nav2.style.display = "none";
    }
});

let botonIr = document.getElementById("ir");

botonIr.addEventListener("click", () => {
    if (Cesium.defined(viewer.selectedEntity)) {
        viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1000;
        viewer.flyTo(viewer.selectedEntity, {
            offset: new Cesium.HeadingPitchRange(0, (-Math.PI / 2) + 0.0000001),
        }).then(() => {
            viewer.scene.screenSpaceCameraController.minimumZoomDistance = 0;
        })
    }
})

let botonVolver = document.getElementById("volver");

botonVolver.addEventListener("click", () => {
    viewer.selectedEntity = null;
    viewer.scene.camera.flyHome();
})