var
		src = "./src"
		dest = "./www",
		node_modules = "./node_modules",
		bower_components = "./bower_components";


module.exports = {
	dist: {
		js: {
			src: [
				src + "/js/leaflet-tileLayerFallback.js",
				src + "/js/leaflet-sync.js",
				src + "/js/leaflet-maps.js",
				src + "/js/leaflet-buttons.js",
				src + "/js/index.js"
			],
			dest: dest + "/js/"
		},
		sass: {
			src: [
				src + "/style/*.css",
				src + "/style/index.scss"
			],
			dest: dest + "/css/"
		},
		html : {
			src: src + "/*.html",
			dest: dest
		},
		copy: [
			{ // Images
				src: src + "/img/*",
				dest : dest + "/img/"
			}
		]
	},

	vendors: {
		js: {
			src: [
				bower_components + "/leaflet/dist/leaflet-src.js",
				bower_components + "/leaflet.TileLayer.WMTS/leaflet-tilelayer-wmts-src.js"
			],
			dest: dest + "/js/"
		},
		sass: {
			src: [
				bower_components + "/normalize.css/normalize.css",
				bower_components + "/leaflet/dist/leaflet.css"
			],
			dest: dest + "/css/"
		},
		copy: [
			{ // Leaflet images
				src: bower_components + "/leaflet/dist/images/*",
				dest: dest + "/img/leaflet/"
			}
		]
	}
};
