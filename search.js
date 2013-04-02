function getForm(form) {

	var div = jQuery('#found');
	var table= jQuery('#tablesearch')
	var name = form.searchbox.value;
	var piirkond = document.getElementById("piirkond").value;
	var partei = document.getElementById("partei").value;
	var link="partei?searchbox=" + name + "&piirkond=" + piirkond + "&partei=" + partei;
	
		jQuery(div).empty()
		jQuery(table).empty()
		table.append(jQuery("<thead><th>Vali kandidaat</th><th>Kandidaadi number</th><th>Kandidaat</th><th>Piirkond</th><th>Partei</th></thead><tbody>"));
		div.append(jQuery("<p><br> Kandidaat leitud: </p><br />"));		
		jQuery.getJSON(link, function(data){
			jQuery.each(data, function(index, item){
				table.append(jQuery('<tr><td><input type="radio" name="radiohaaletamine" value ="' + item.name +  '"></input></td><td>' + item.id +'</td><td>' + item.name + "</td><td>" + item.region_name + "</td><td>" + item.party_name + "</td></tr>"));
			});
			table.append(jQuery("</tbody>"));
		});	
	
	
		
	

};