function getForm(form) {

	
	var div = jQuery('#found');
	var found = jQuery('#foundbody');
	var tablehead = jQuery('#tablehead');
	var name = form.searchbox.value;
	var piirkond = document.getElementById("piirkond").value;
	var partei = document.getElementById("partei").value;
	
	
	if (name != "" && piirkond==0 && partei == 100) {
		jQuery(tablehead).empty();
		jQuery(found).empty();
		found.append(jQuery("<tr>"));
		tablehead.append(jQuery("<th>Partei</th><th>Piirkond</th><th>Kandidaat</th>"));
		jQuery.getJSON("candidate.json", function(result) {

			jQuery.each(result, function(index, item) {
				
				if (index != "id") {
					jQuery(div).empty();
					div.append(jQuery("<p><br> Kandidaat leitud: </p><br />"));
					found.append(jQuery("<td>" + item.name + ' </td>'));

				}
			});
		});
		found.append(jQuery("</tr>"));
	}
	
	else if (piirkond != 0 && partei != 100 && name=="") {
		jQuery(tablehead).empty();
		jQuery(found).empty();
		
		tablehead.append(jQuery("<th>Kandidaat</th>"));
		jQuery.getJSON("findCandidatesByPartyAndRegion.json", function(result) { //json fail
			jQuery.each(result, function(index, item){  //list candidates
				if (index !="id"){
					jQuery.each(item, function(key, val){ //
						if (key != "id"){
							jQuery(div).empty();
							div.append(jQuery("<p><br> Kandidaat leitud: </p><br />"));
							found.append(jQuery("<tr><td>" + val.person.name + '</td></tr>'));
						}
					});
				}
			});
		});
	}
	
	else if (piirkond !=0 && name=="" && partei==100){
		jQuery(tablehead).empty();
		jQuery(found).empty();
		
		tablehead.append(jQuery("<th>Kandidaat</th><th>Partei</th>"));
		jQuery.getJSON("findCandidatesByRegion.json", function(result){
			jQuery.each(result, function(index, item){
				if (index != "id"){
					jQuery.each(item, function(key, val){
						if (key !="id"){
							jQuery(div).empty()
							div.append(jQuery("<p><br> Kandidaat leitud: </p><br />"));
							//alert(val.person.name)
							found.append(jQuery("<tr><td>" + val.person.name + '</td><td> ' + val.party.name + '</tr></td>'));
						}
					});
				}
			});
		});
		
	}
	else if (partei !=100 && name=="" && piirkond==0){
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
	
	else {jQuery(div).empty();
	jQuery(tablehead).empty();
	jQuery(found).empty();
	div.append(jQuery("<p>Teie päringule ei leitud vastust</p>"))
			}
	

};