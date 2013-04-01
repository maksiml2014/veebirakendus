function Stattable(form) {

	var table= jQuery('#tablestat')

	jQuery(table).empty()
	table.append(jQuery("<thead><th>Erakond</th><th>% häältest</th><th>hääli</th></thead><tbody>"));
		//jQuery.getJSON(link, function(data){
		jQuery.getJSON("erakonnad.json", function(data){
		jQuery.each(data, function(index, item){
			table.append(jQuery("<tr><td>" + item.name + "</td><td>" + item.pc + "</td><td>" + item.votes + "</td></tr>"));
		});
		jQuery.append("</tbody>")
	});	
		
		var table2= jQuery('#tablestat2')

		jQuery(table2).empty()
		table2.append(jQuery("<thead><th>Erakond</th><th>% häältest</th><th>hääli</th></thead><tbody>"));
			//jQuery.getJSON(link, function(data){
			jQuery.getJSON("erakonnad.json", function(data){
			jQuery.each(data, function(index, item){
				table2.append(jQuery("<tr><td>" + item.name + "</td><td>" + item.pc + "</td><td>" + item.votes + "</td></tr>"));
			});
			jQuery.append("</tbody>")
		});	
}

