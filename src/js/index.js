var layer1 = L.tileLayer('http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart&zoom={z}&x={x}&y={y}');

var layer2 = L.tileLayer('http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}', {
	attribution: '© Kartverket'
});

var map1 = L.map('map1', {
	layers: [layer1],
	center: [59.336, 5.967],
	zoom: 14
});

map1.attributionControl.setPrefix('');

var map2 = L.map('map2', {
	layers: [layer2],
	center: [59.336, 5.967],
	zoom: 14,
	zoomControl: false
});


(function() {
	var container = document.getElementById("container");

	var doubleColunm = false;
	function showHideMap(){
		if(!doubleColunm) {
			container.className = "double-colunm";
			doubleColunm = true;
			// Resize
			map1.invalidateSize();
			map2.invalidateSize();
			// Sync
			map1.sync(map2);
			map2.sync(map1);
		} else {
			container.className = "single-colunm";
			doubleColunm = false;
			// Resize
			map1.invalidateSize();
			// Unsync
			map1.unsync(map2);
			map2.unsync(map1);
		}
	};

	// Event
	document.getElementById("compare-button").addEventListener("click", showHideMap);

})();
