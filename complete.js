$(function() {
	var names = [ "Magdalena Malejeva", "Neeme Näljahäda", "Olga Oravasaba", "Eduard Ekskavaator", "Ferdinand Fuksia", "Gerhard Gätegõverdus", 
	"Harald Hamster", "Ildegaard Ilumeel", "Janaida Jalutova", "Kõikme Kannatameära", "Filbert Hollins", "Ulrich Van Andringa", "Carl Zino"];
	var accentMap = {
		"ä": "a",
		"ö": "o"
	};
	var normalize = function(term) {
		var ret = "";
		for ( var i = 0; i < term.length; i++ ) {
			ret += accentMap [term.charAt(i)] || term.charAt(i);
		}
		return ret;
	};
	$("#complete").autocomplete({
			source: function(request, response){ 
			var re = $.ui.autocomplete.escapeRegex(request.term);
			var matcher = new RegExp( "^" + re, "i" ); 
			response($.grep(names, function(value){ 
				return matcher.test( value ) || matcher.test( normalize( value ) );
			}));
		}
	});
});
