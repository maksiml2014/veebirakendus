function getForm(form) {

	var div = jQuery('#found');
	var table= jQuery('#tablejson')
	var name = form.searchbox.value;
	var piirkond = document.getElementById("piirkond").value;
	var partei = document.getElementById("partei").value;
	var link="partei?searchbox=" + name + "&piirkond=" + piirkond + "&partei=" + partei
	
	
		jQuery(div).empty()
		jQuery(table).empty()
		table.append(jQuery("<thead><th>Hääleta</th><th>Kandidaat</th><th>Piirkond</th><th>Partei</th></thead><tbody>"));
		div.append(jQuery("<p><br> Kandidaat leitud: </p><br />"));		
		jQuery.getJSON(link, function(data){
		//jQuery.getJSON("uuususus.json", function(data){
			jQuery.each(data, function(index, item){
				table.append(jQuery('<tr><td><input type="radio" id="'+ item.name + '"></td><td>' + item.name + "</td><td>" + item.region_name + "</td><td>" + item.party_name + "</td></tr>"));
			});
			jQuery.append("</tbody>")
			sorttable.makeSortable(jQuery(table));
		});	

	
};