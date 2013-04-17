$(function() {
	var names=[];
	if(navigator.onLine){
	jQuery.getJSON("/partei?searchbox=&piirkond=0&partei=100", function(result){
	  jQuery.each(result, function(index, item){
	   names.push(item.name);
	  });
	 });
	}else{
		var andmed=JSON.parse(localStorage.getItem("Search"));
		jQuery.getJSON(andmed, function(data){
			jQuery.each(result, function(index, item){
				   names.push(item.name);
			});
		});
	}
	
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
