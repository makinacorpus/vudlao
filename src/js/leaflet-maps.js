(function(global) {
	'use strict';

	global.map1 = L.map('map1', { minZoom : 10, maxZoom: 19 });
	global.map2 = L.map('map2', { minZoom : 10, maxZoom: 19, zoomControl:false, attribution: ''});

	// Map 1
	map1.attributionControl.setPrefix('Source: Département de Loire-Atlantique');
	var streets_mapquest = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
		opacity: 0.5,
		minZoom: 9,
		maxZoom: 12,
		attribution: "MapQuest / OpenStreetMap",
		subdomains: '1234'
	});
	var matrixIds3857= new Array(22);
	for (var i= 0; i<22; i++) {
		matrixIds3857[i]= {
			identifier    : "" + i,
			topLeftCorner : new L.LatLng(20037508,-20037508)
		};
	}
	// Begin IGN
	var ign_keys = {
		'localhost': 'ymg58ktvpimfa7zyxjxyr1a5',
		'makinacorpus.github.io' : '9z9o6i52lxwch6mxt9wmwro5',
		'vuduciel.loire-atlantique.fr' :'287bdvzzjnxqhh4s0mqfto41'
	};
	var ign_key = ign_keys[location.hostname];
	var ign = new L.TileLayer.WMTS("http://wxs.ign.fr/"+ign_key+"/geoportail/wmts",
		{
			layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
			style: 'normal',
			minZoom: 13,
			maxZoom: 19,
			tilematrixSet: "PM",
			matrixIds: matrixIds3857,
			format: 'image/jpeg',
			attribution: "&copy; IGN"
		}
	);
	// End IGN
	var ortho2012 = new L.FallbackTileLayer('http://{s}.tiles.cg44.makina-corpus.net/ortho-2012/{z}/{x}/{y}.jpg', {
		continuousWorld: true,  // very important
		tms: true,
		maxZoom: 19,
		subdomains: "abcdefgh",
		attribution: "",
		errorTileUrl: "img/empty.png"
	}).addTo(map1);
	ortho2012.on('load', function() {
		if(ortho2012.reachLimit()) { // do not display external layers if not near limit
			map1.addLayer(ign);
			map1.addLayer(streets_mapquest);
			ortho2012._container.style.zIndex=1;
		} else {
			map1.removeLayer(ign);
			map1.removeLayer(streets_mapquest);
		}
	});
	ortho2012.on('loading', function() {
		ortho2012._limit = false;
	});

	// Map 2
	streets_mapquest.addTo(map2); // Layer

	// maxBounds
	var max_bounds_strict = new L.LatLngBounds(new L.LatLng(46.86008, -2.55754), new L.LatLng(47.83486, -0.92346));
	var max_bounds_buffer = new L.LatLngBounds(new L.LatLng(46.8, -3.0), new L.LatLng(47.87, -0.8));
	map1.setMaxBounds(max_bounds_buffer);
	map2.setMaxBounds(max_bounds_buffer);

	// randomDisplay
	function randomDisplay() {
		var niceLocations = [
			["Le Terril, Abbaretz", 18, 47.56142, -1.54120],
			["La Bôle de Merquel, Mesquer", 16, 47.4179, -2.4539],
			["La Brière, Saint-Joachim", 16, 47.3734, -2.2223],
			["Marais de Lyarne, Les Moutiers-en-Retz", 17, 47.04490, -1.97523],
			["Château de Clisson et Domaine de la Garenne Lemot, Clisson", 18, 47.08590, -1.27772],
			["Estuaire de la Loire", 15, 47.2907, -1.9411],
			["Château, Châteaubriant", 18, 47.71958, -1.37327],
			["La Loire, Ancenis", 16, 47.3705, -1.0800],
			["Le Pont de Saint-Nazaire", 14, 47.2789, -2.1653],
			["Lac de Vioreau, Joué-sur-Erdre", 15, 47.5232, -1.4230],
		];
		var random = niceLocations[Math.floor(Math.random()*niceLocations.length)];
		map1.setView([random[2], random[3]], random[1]);
		document.getElementById("search-input").value = random[0];
	}
	randomDisplay();

})(this);
