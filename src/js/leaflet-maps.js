(function(global) {
	'use strict';

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

	global.map1 = L.map('map1').setView([51.505, -0.09], 13);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map1);

	global.map2 = L.map('map2').setView([51.505, -0.09], 13);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map2);

	randomDisplay();

})(this);
