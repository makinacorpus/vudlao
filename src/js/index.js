(function() {
	'use strict';

	var container = document.getElementById("container");
	// init
	var doubleColunm = (container.className === "double-colunm");
	if(doubleColunm) {
		map1.sync(map2);
		map2.sync(map1);
	}

	function showHideMap(){
		if(document.getElementById("compare-with").value === "0") {
			container.className = "single-colunm";
			doubleColunm = false;
			// Resize
			map1.invalidateSize();
			// Unsync
			map1.unsync();
			map2.unsync();
		} else {
			container.className = "double-colunm";
			doubleColunm = true;
			// Resize
			map1.invalidateSize();
			map2.invalidateSize();
			// Sync
			map1.sync(map2);
			map2.sync(map1);
		}
	};

	document.getElementById("compare-with").addEventListener("change", showHideMap);
})();
