(function(global) {
	'use strict';

	L.Control.Boussole = L.Control.extend({
			includes: L.Mixin.Events,
			options: {
				position: 'topright',
				title: 'Boussole',
			},
			onAdd: function(map) {
				var container = L.DomUtil.create('div', 'leaflet-control-bsl');
				this._container = container;

				document.addEventListener("deviceready", function() {
					var watchID = navigator.compass.watchHeading(

						function onSuccess(heading) {

							container.style['-webkit-transform'] = 'rotate(' + heading.magneticHeading + 'deg)';

						}, function onError(compassError) {

							container.style.display = "none";
							navigator.compass.clearWatch(this._watchID);

						}, { frequency: 500 }
					);
				}, false);

				return this._container;
			}
	});
	L.control.boussole = function(map) {
		var bsl = new L.Control.Boussole(map);
		return bsl;
	};

	L.control.boussole().addTo(map1);
	L.control.boussole().addTo(map2);

})(this);
