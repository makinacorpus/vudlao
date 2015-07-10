(function() {
	'use strict';

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
			map1.unsync();
			map2.unsync();
		}
	};

	document.getElementById("compare-button").addEventListener("click", showHideMap);

})();
