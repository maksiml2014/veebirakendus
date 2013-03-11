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
	
	else if (piirkond != 0 && partei != 100) {
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
	
	else if (piirkond !=0){
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
	else if (partei !=100){
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
	
	else {jQuery('#scriptinput').empty();}
	

};