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

		markerList.load(viewer);

        document.getElementsByClassName("cesium-geocoder-input")[0].placeholder = "Busca un lugar...";


