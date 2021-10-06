let nav = document.getElementById("top_nav");

viewer.selectedEntityChanged.addEventListener(function (selectedEntity) {
    if (Cesium.defined(selectedEntity)) {
        nav.style.display = "flex";

        let cartographic = Cesium.Cartographic.fromCartesian(selectedEntity.position.getValue());

        let lat = cartographic.latitude;
        let lon = cartographic.longitude;

        nav.innerHTML = "<div>Latitud: "+lat+"</div>"
        nav.innerHTML += "<div>Longitud: "+lon+"</div>"

    } else {
        nav.style.display = "none";
    }
});