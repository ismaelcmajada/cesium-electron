Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NTk5NWJkZC1hMDg4LTQwYWMtOTQyOC00NzY1MzQ5ZDlhODUiLCJpZCI6NTc0NTUsImlhdCI6MTYyMjM2Njk0Nn0.kCsqAKJkEZNARnEuy83zO3VC_x2L5YowG969TzBQULw"

		//Instanciación y configuración del globo.
		var viewer = new Cesium.Viewer('globo', {
			animation: false,
			baseLayerPicker: false,
			navigationHelpButton: false,
			sceneModePicker: false,
			homeButton: false,
			geocoder: true,
			selectionIndicator: false,
			fullscreenButton: false,
			imageryProvider: new Cesium.UrlTemplateImageryProvider({
				url: 'https://api.mapbox.com/styles/v1/ismaelpico/ckqsucp5y060x17mxyo5mblso/tiles/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaXNtYWVscGljbyIsImEiOiJja3FhMDl4MGYwdjZrMm9vd2NxeGloZ3p6In0.aLYOIzLlakDnd1q3aWy1Fw',
				tileWidth: 512,
				tileHeight: 512
			}),

			timeline: false
		});

		//Cargamos los marcadores desde el JSON
		let markersJSON = markerOptions.markers;
		var markers;
		markersJSON.forEach(marker => {
			//Creamos un objeo Marker con cada marcador del JSON y lo añadimos al globo.
			let markerObj = new Marker(viewer, marker.name, marker.longitude, marker.latitude, marker.z, marker.description);
			markerObj.addMarker();

			markers.push(markerObj);
		});

		viewer.selectedEntityChanged.addEventListener(function (selectedEntity) {
				if (Cesium.defined(selectedEntity)) {
				viewer.scene.screenSpaceCameraController.minimumZoomDistance = 0;
				viewer.flyTo(selectedEntity, {
					offset: new Cesium.HeadingPitchRange(0, (-Math.PI / 2) + 0.0000001),
				}).then( () => {
					viewer.scene.screenSpaceCameraController.minimumZoomDistance = 0;
				})
			}
		});
	  

        document.getElementsByClassName("cesium-geocoder-input")[0].placeholder = "Busca un lugar...";


