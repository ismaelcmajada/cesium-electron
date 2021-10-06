let form = document.getElementById("marker_form");
let add = false;

viewer.selectedEntityChanged.addEventListener(function (selectedEntity) {
    if (Cesium.defined(selectedEntity)) {
        markers.forEach(marker => {
            if(selectedEntity.name == marker.name) {
                form.elements["name"].value = marker.name;
                form.elements["name"].value = marker.description;
            }
        });
        form.elements["name"].value = selectedEntity.name;
        form.elements["boton_form"].value = "Modificar punto"
        form.elements["botonBorrar_form"].style.display = "block";


    } else {
        form.elements["name"].value = "";
        form.elements["description"].innerHTML = "";
        form.elements["boton_form"].value = "Añadir punto";
        form.elements["botonBorrar_form"].style.display = "none";
    }
});

form.elements["boton_form"].addEventListener("click", () => {
    add = true;
})

viewer.scene.canvas.addEventListener('contextmenu', (event) => {
    if(add) {
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var cartesian = viewer.camera.pickEllipsoid(new Cesium.Cartesian3(event.clientX, event.clientY), ellipsoid);
    var location = ellipsoid.cartesianToCartographic(cartesian);

    var marker = new Marker(viewer, form.elements["name"].value, location.longitude, location.latitude, 10 , form.elements["description"].innerHTML);
    marker.addMarker();
    markerOptions.saveMarker(marker.name, marker.longitude, marker.latitude, marker.z, form.elements["description"].innerHTML);

    form.elements["name"].value = "";
    form.elements["description"].innerHTML = "";
    add = false;
    }
});