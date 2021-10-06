let form = document.getElementById("marker_form");
let add = false;

viewer.selectedEntityChanged.addEventListener(function (selectedEntity) {
    if (Cesium.defined(selectedEntity)) {
        form.elements["name"].value = selectedEntity.name;
        form.elements["description"].value = selectedEntity.description.getValue();
        form.elements["añadir"].style.display = "none"
        form.elements["modificar"].style.display = "block";
        form.elements["borrar"].style.display = "block";

    } else {
        form.elements["name"].value = "";
        form.elements["description"].value = "";
        form.elements["añadir"].style.display = "block"
        form.elements["modificar"].style.display = "none";
        form.elements["borrar"].style.display = "none";
    }
});

form.elements["añadir"].addEventListener("click", () => {
    add = true;
})

form.elements["modificar"].addEventListener("click", () => {
  if(Cesium.defined(viewer.selectedEntity))  {
      viewer.selectedEntity.name = form.elements["name"].value
      viewer.selectedEntity.description = form.elements["description"].value
      viewer.selectedEntity.label.text = form.elements["name"].value
      markerList.update(viewer.selectedEntity);
  }        
})

form.elements["borrar"].addEventListener("click", () => {
    if(Cesium.defined(viewer.selectedEntity))  {
        markerList.remove(viewer.selectedEntity);
    }        
  })

viewer.scene.canvas.addEventListener('contextmenu', (event) => {
    if(add) {
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var cartesian = viewer.camera.pickEllipsoid(new Cesium.Cartesian3(event.clientX, event.clientY), ellipsoid);
    var location = ellipsoid.cartesianToCartographic(cartesian);

    let marker = {
        "name": form.elements["name"].value,
        "longitude": location.longitude,
        "latitude": location.latitude,
        "description": form.elements["description"].value
    }

    markerList.add(marker)

    form.elements["name"].value = "";
    form.elements["description"].value = "";
    add = false;
    }
});