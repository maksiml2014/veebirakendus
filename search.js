function getForm(form) {

	var div = jQuery('#found');
	var table= jQuery('#tablejson')
	var name = form.searchbox.value;
	var piirkond = document.getElementById("piirkond").value;
	var partei = document.getElementById("partei").value;
	var link="1001.evalimised-ut.appspot.com/partei?searchbox=" + name + "&piirkond=" + piirkond + "&partei=" + partei
	
	
	if (name != "" && piirkond==0 && partei == 100) {
		jQuery(table).empty();
		table.append(jQuery("<thead><th>Partei</th><th>Piirkond</th><th>Kandidaat</th><thead><tbody><tr>"));
		jQuery.getJSON(link, function(result) {
			jQuery.each(result, function(index, item) {
				if (index != "id") {
					jQuery(div).empty();
					div.append(jQuery("<p><br> Kandidaat leitud: </p><br />"));
					table.append(jQuery("<td>" + item.name + ' </td>'));
				}
			});
		});
		table.append(jQuery("</tr></tbody>"));
	}
	
	else if (piirkond != 0 && partei != 100 && name=="") {
		jQuery(table).empty();
		table.append(jQuery("<thead><th>Kandidaat</th><thead><tbody>"));
		jQuery.getJSON(link, function(result) { //json fail
			jQuery.each(result, function(index, item){  //list candidates
				if (index !="id"){
					jQuery.each(item, function(key, val){ //
						if (key != "id"){
							jQuery(div).empty();
							div.append(jQuery("<p><br> Kandidaat leitud: </p><br />"));
							table.append(jQuery("<tr><td>" + val.person.name + '</td></tr>'));
						}
					});
				}
			});
		});
		table.append(jQuery("</tbody>"));
	}
	
	else if (piirkond !=0 && name=="" && partei==100){
		jQuery(table).empty();
		table.append(jQuery("<thead><th>Kandidaat</th><th>Partei</th><thead><tbody>"));
		jQuery.getJSON(link, function(result){
			jQuery.each(result, function(index, item){
				if (index != "id"){
					jQuery.each(item, function(key, val){
						if (key !="id"){
							jQuery(div).empty()
							div.append(jQuery("<p><br> Kandidaat leitud: </p><br />"));
							//alert(val.person.name)
							table.append(jQuery("<tr><td>" + val.person.name + '</td><td> ' + val.party.name + '</td></tr>'));
						}
					});
				}
			});
		});
		table.append(jQuery("</tbody>"));
	}
	
	else if (partei !=100 && name=="" && piirkond==0){
		jQuery(table).empty();
		
		table.append(jQuery("<thead><th>Kandidaat</th><th>Piirkond</th></thead><tbody>"));
		jQuery.getJSON(link, function(result){
			jQuery.each(result, function(index, item){
				if (index != "id"){
					jQuery.each(item, function(key, val){
						jQuery(div).empty()
						div.append(jQuery("<p><br> Kandidaat leitud: </p><br />"));
						if (key !="id"){
							//alert(val.person.name)
							table.append(jQuery("<tr><td>" + val.person.name + '</td><td> ' + val.region.name + '</td></tr>'));
						}
					});
				}
			});
		});
		table.append(jQuery("</tbody>"));
	}
	
	

	else if (partei ==100 && name=="" && piirkond==0){
		jQuery(div).empty()
		jQuery(table).empty()
		table.append(jQuery("<thead><th>Kandidaat</th><th>Piirkond</th><th>Partei</th></thead><tbody>"));
		div.append(jQuery("<p><br> Kandidaat leitud: </p><br />"));		
		jQuery.getJSON(link, function(data){
		//jQuery.getJSON("uuususus.json", function(data){
			jQuery.each(data, function(index, item){
				table.append(jQuery("<tr><td>" + item.name + "</td><td>" + item.region_name + "</td><td>" + item.party_name + "</td></tr>"));
			});
			jQuery.append("</tbody>")
			sorttable.makeSortable(jQuery(table));
		});	
	}
	
	
	else {jQuery(div).empty();
	jQuery(table).empty();
	div.append(jQuery("<p>Teie päringule ei leitud vastust</p>"))
			}
	

};