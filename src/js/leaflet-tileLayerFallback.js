// ###################################
// TileLayer fallback
// Fallback to PNG if JPG is not available to allow transparency on borders
// ###################################
(function() {
	'use strict';

	L.FallbackTileLayer = L.TileLayer.extend({
		_tileOnError: function () {
			var layer = this._layer;

			layer.fire('tileerror', {
				tile: this,
				url: this.src
			});

			var newUrl;
			if(this.src.indexOf(".jpg")>0) {
				layer._limit = true;
				newUrl = this.src.replace("jpg", "png");
			} else {
				newUrl = layer.options.errorTileUrl;
			}
			if (newUrl) {
				this.src = newUrl;
			}

			layer._tileLoaded();
		},

		reachLimit: function() {
			return this._limit;
		}
	});
})();
