var
		src = "./src"
		dest = "./app/www",
		node_modules = "./node_modules",
		bower_components = "./bower_components";


module.exports = {
	dist: {
		js: {
			src: src + "/js/*",
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
				bower_components + "/jquery/dist/jquery.js",
				bower_components + "/bootstrap/dist/js/bootstrap.js",
				bower_components + "/leaflet/dist/leaflet-src.js",
				bower_components + "/leaflet.sync/L.Map.Sync.js"
			],
			dest: dest + "/js/"
		},
		sass: {
			src: [
				bower_components + "/bootstrap/dist/css/bootstrap.css",
				bower_components + "/leaflet/dist/leaflet.css"
			],
			dest: dest + "/css/"
		},
		copy: [
			{ // Bootstrap fonts
				src: bower_components + "/bootstrap/dist/fonts/*",
				dest: dest + "/fonts/"
			},
			{ // Leaflet images
				src: bower_components + "/leaflet/dist/images/*",
				dest: dest + "/img/leaflet/"
			}
		]
	}
};
