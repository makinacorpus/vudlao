(function() {
	'use strict';

	L.Map = L.Map.extend({
		sync: function (map) {
			// init
			var flag = true;
			map.setView(this.getCenter(), this.getZoom(), { animate: false, reset: false });
			// event
			function syncIfNecessary() {
				if(flag) {
					var pos = this.getCenter();
					var zoom = this.getZoom();
					map.setView(pos, zoom, { animate: false, reset: false });
					flag = false;
				} else {
					flag = true;
				}
			}
			this.on('move', syncIfNecessary);
			this.on('zoomend', syncIfNecessary);
			return this;
		},
		unsync: function () {
			this.off('move');
			this.off('zoomend');
		}
	});
})();
