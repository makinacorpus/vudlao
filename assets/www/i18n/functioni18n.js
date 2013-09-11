var language="";

function getLocaleName(){
	navigator.globalization.getLocaleName(successCB, errorCB);

}
function successCB(locale){
	language=(locale.value).substr(0,(locale.value).indexOf('_')) ;


}
function errorCB(){
	console.log('Error getting locale\n');

}
function trad(clef){
	var str="";
	try{   

		switch (language) {
		case "en":
			str = i18n_en[clef];
			break;
		case "es":
			str = i18n_sp[clef];
			break;

		default:
			str = i18n_fr[clef];
			break;
		}

		
		if (str === undefined){
			str    = clef;                   
		};
		return str;    
	}catch(e){
		return clef;  
	}; 
}