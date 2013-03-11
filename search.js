function getForm(form) {

	var obj = jQuery('#scriptinput');
	var name = form.searchbox.value;
	var piirkond = document.getElementById("piirkond").value;
	var partei = document.getElementById("partei").value;
	
	
	if (name != "") {
		jQuery.getJSON("candidate.json", function(result) {

			jQuery.each(result, function(index, item) {
				if (index != "id") {
					jQuery('#scriptinput').empty();
					obj.append(jQuery("<p><br>" + item.name + '<br /></p>'));

				}
			});
		});
	}
	
	if (piirkond != 0 && partei != 100) {
		jQuery('#scriptinput').empty();
		jQuery.getJSON("findCandidatesByPartyAndRegion.json", function(result) { //json fail
			jQuery.each(result, function(index, item){  //list candidates
				if (index !="id"){
					jQuery.each(item, function(key, val){ //
						if (key != "id"){
							
							obj.append(jQuery("<p><br>" + val.person.name + '<br /></p>'));
						}
					});
				}
				
				
			});

		});
	}
	
	if (piirkond !=0){
		jQuery('#scriptinput').empty();
		jQuery.getJSON("findCandidatesByRegion.json", function(result){
			jQuery.each(result, function(index, item){
				if (index != "id"){
					jQuery.each(item, function(key, val){
						if (key !="id"){
							//alert(val.person.name)
							obj.append(jQuery("<p><br>" + val.person.name + ' ' + val.party.name + '<br /></p>'));
						}
					});
				}
			});
		});
		
	}
	if (partei !=0){
		jQuery('#scriptinput').empty();
		jQuery.getJSON("findCandidatesByParty.json", function(result){
			jQuery.each(result, function(index, item){
				if (index != "id"){
					jQuery.each(item, function(key, val){
						if (key !="id"){
							//alert(val.person.name)
							obj.append(jQuery("<p><br>" + val.person.name + ' ' + val.region.name + '<br /></p>'));
						}
					});
				}
			});
		});
		
	}
	

	// alert (name);

	/*
	 * var e = document.getElementById("partei").value; //alert(e); if (e !=
	 * 100) {arr.push("party:" + e); nrSearched += 1;}
	 * 
	 * 
	 * var f = document.getElementById("piirkond").value; //alert(f); if (f !=
	 * 0) {arr.push("region:" + f); nrSearched += 1;}
	 * 
	 * //alert(nrSearched);
	 * 
	 * 
	 * if (nrSearched == 1){ } jQuery("#scriptinput").empty();
	 * jQuery.getJSON("findCandidatesByParty.json", function(result) { var obj =
	 * jQuery('#scriptinput'); jQuery.each(result, function(index, item) { if
	 * (index != "id") { jQuery.each(item, function(key, val) { if (key != "id") {
	 * obj.append(jQuery("<p><br>" + val.region.name + '<br />' +
	 * val.person.name + "</p>")); } }); } }); });
	 */
};