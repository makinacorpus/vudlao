(function(global) {
	'use strict';

	var searchForm = document.getElementById("search-form");
	var searchInput = document.getElementById("search-input");
	var searchButton = document.getElementById("search-button");

	var resultsLayerMap1 = L.featureGroup().addTo(map1);
	var resultsLayerMap2 = L.featureGroup().addTo(map2);

	function clearRandom() {
		if(searchInput.className === "random-display") {
			searchInput.value = "";
			searchInput.className = "search-ready";
		}
	}
	searchInput.addEventListener("click", clearRandom);
	searchInput.addEventListener("focus", clearRandom);



	function search(input) {
		function elasticSearchJSONP(params) {
			var url = "http://es.makina-corpus.net/cg44/address/_search" + L.Util.getParamString(params);
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = url;
			document.getElementsByTagName("head")[0].appendChild(script);
		}

		function getLabel(hit, mode) {
			var label = "";
			if(hit.nom) {
				label = hit.nom;
				if(hit.type && hit.type == "LIEUDIT") {
					label += " (Lieu-dit)"
					if(hit.commune) { label += " - <strong>" + hit.commune + "</strong>"; }
				} else {
					label = "<strong>" + label + "</strong>";
				}
			} else {
				label = (mode == "POPUP" && hit.numero ? hit.numero + ' ':'') +
								(hit.nom_voie ? hit.nom_voie + ' - ':'') +
								(hit.nom_ld ? hit.nom_ld + ', ':'') +
								'<strong>' + (hit.commune ? hit.commune:'') + '</strong>';
			}
			return label;
		}

		function showResult(hit) {
			if(hit.nom) { searchInput.value = hit.nom; }
			var label = getLabel(hit, "POPUP");
			var current_result = {
				"type": "Feature",
				"properties": { "name": label },
				"geometry": hit.geometry
			};
			[resultsLayerMap1, resultsLayerMap2].forEach(function(resultsLayer) {
				resultsLayer.clearLayers();
				L.geoJson(current_result, {
					style: function (feature) {
						if(feature.geometry.type=='Polygon') {
							return {fillColor: 'transparent'};
						}
					},
					onEachFeature: function onEachFeature(feature, layer) {
						layer.bindPopup(feature.properties.name);
					}
				}).addTo(resultsLayer);
			});
			var bounds = resultsLayerMap1.getBounds();
			if (bounds.isValid()) {
				map1.fitBounds(bounds);
			}
		}

		function showMultipleResults(hits) {
			var choices_box = document.getElementById('choice-list');
			choices_box.innerHTML = "";
			if(hits.total === 1) {
				showResult(hits.hits[0]);
			} else if(hits.total > 1) {
				var choices = {};
				hits.hits.forEach(function(element) {
					var hit = element._source;
					var label = getLabel(hit, "LISTING");
					choices[label] = hit;
				});

				var distinct = [];
				distinct = Object.keys(choices);
				if(distinct.length===1) {
					showResult(choices[distinct[0]]);
				} else {
					for(var choice in choices) {
						// Element
						var li = document.createElement("li");
						li.innerHTML = choice;
						// Event
						L.DomEvent.addListener(li, 'click', (function(label, hit) {
							return function() {
								showResult(hit);
								document.getElementById("search-input").value = label;
								choices_box.innerHTML = "";
							}
						}(li.textContent, choices[choice])));
						// List
						choices_box.appendChild(li);
					}
				}
			} else { // hits.total < 1
				alert("Aucun résultat");
			}
		}

		global.searchFullResults = function(results) {
			showMultipleResults(results.hits);
		}

		global.searchNameOnlyResults = function(results) {
			if(results.hits.total === 1) {
				console.log("==== Name Only ====");
				console.log(results);
				showResult(results.hits.hits[0]._source);
			} else {
				elasticSearchJSONP({
					q: searchInput.value,
					default_operator:"AND",
					callback: "searchFullResults"
				});
			}
		}

		// search name only
		elasticSearchJSONP({
			source: JSON.stringify({
				query: {
					query_string: {
						fields: ["nom", "type"],
						query: searchInput.value + " AND COMMUNE",
						default_operator: "AND"
					}
				}
			}),
			callback : "searchNameOnlyResults"
		});


	}
	searchForm.addEventListener("submit", function(event) {
		event.preventDefault();
		search(searchInput);
	});

})(this);
