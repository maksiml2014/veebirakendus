/**
 * This function is called onload in html hence other function in this file that
 * are called on first rows
 * 
 * @param form
 */

function onLoad(form) {
	hidelogout();
	sendGetToChannel();
}

function Stattable() {
	
	// function sending getrequest to channel
	

	var table = jQuery('#tablestat');
	var table2 = jQuery('#tablestat2');
	var table3 = jQuery('#tablestat3');
	var piirkond = document.getElementById("statpiirkond").value;
	var partei = document.getElementById("statpartei").value;
	var link = "statpartei?statpiirkond=" + piirkond + "&statpartei=" + partei;
	var link2 = "statcandidate?statpiirkond=" + piirkond + "&statpartei="+ partei;
	var andmed = new Array();
	jQuery(table2).empty();
	table2.append(jQuery("<thead><th>Erakond</th><th>% häältest</th><th>hääli</th></thead><tbody>"));

	jQuery(table3).empty();
	table3.append(jQuery("<thead><th>Kandidaat</th><th>hääli</th></thead><tbody>"));
	
	
	if(navigator.onLine){
	jQuery.getJSON(link, function(data) {
		if (link=="statpartei?statpiirkond=0&statpartei=100"){
			jQuery(table).empty();
			table.append(jQuery("<thead><th>Erakond</th><th>% häältest</th><th>hääli</th></thead><tbody>"));
			jQuery.each(data, function(index, item) {
				table2.append(jQuery("<tr><td>" + item.name + "</td><td>" + item.pc	+ "</td><td>" + item.votes + "</td></tr>"));
				table.append(jQuery("<tr><td>" + item.name + "</td><td>" + item.pc + "</td><td>" + item.votes + "</td></tr>"));
				andmed.push([ item.name, item.votes ]);
			});
			table2.append(jQuery("</tr></tbody>"));
			table.append(jQuery("</tr></tbody>"));
			drawChart(andmed, 'map');
			drawChart(andmed, 'chart_div');
		}
		
		else{
		jQuery.each(data, function(index, item) {
			table2.append(jQuery("<tr><td>" + item.name + "</td><td>" + item.pc	+ "</td><td>" + item.votes + "</td></tr>"));
			andmed.push([ item.name, item.votes ]);
		});
		table2.append(jQuery("</tr></tbody>"));
		drawChart(andmed, 'chart_div');
		}
	});
	
	jQuery.getJSON(link2, function(data) {
		jQuery.each(data, function(index, item) {
			table3.append(jQuery("<tr><td>" + item.name + "</td><td>"+ item.votes + "</td></tr>"));
		});
		table3.append(jQuery("</tr></tbody>"));
	});
	}
	
	
	
	else{
		
		var object = JSON.parse(localStorage.getItem("statpartei"));
		
		if (link=="statpartei?statpiirkond=0&statpartei=100"){
			jQuery(table).empty();
			table.append(jQuery("<thead><th>Erakond</th><th>% häältest</th><th>hääli</th></thead><tbody>"));
			jQuery.each(object, function(index, item) {
				
				table2.append(jQuery("<tr><td>" + item.name + "</td><td>" + item.pc	+ "</td><td>" + item.votes + "</td></tr>"));
				table.append(jQuery("<tr><td>" + item.name + "</td><td>" + item.pc + "</td><td>" + item.votes + "</td></tr>"));
				andmed.push([ item.name, item.votes ]);
			});
			table2.append(jQuery("</tr></tbody>"));
			table.append(jQuery("</tr></tbody>"));
			console.log(andmed);
			drawChart(andmed, 'map');
			drawChart(andmed, 'chart_div');
		}
		
		else{
			if(piirkond!=0 && partei==100){
				jQuery.each(object, function(index, item) {
					if(item.region==piirkond){
					table2.append(jQuery("<tr><td>" + item.name + "</td><td>" + item.pc	+ "</td><td>" + item.votes + "</td></tr>"));
					andmed.push([ item.name, item.votes ]);
					}
				});		
			}
			else if(piirkond==0 && partei!=100){
				jQuery.each(object, function(index, item) {
					if(item.party==partei){
					table2.append(jQuery("<tr><td>" + item.name + "</td><td>" + item.pc	+ "</td><td>" + item.votes + "</td></tr>"));
					andmed.push([ item.name, item.votes ]);
					}
				});				
			}
			else if(piirkond!=0 && partei !=100){
				jQuery.each(object, function(index, item) {
					if(item.region==piirkond && item.party==partei){
					table2.append(jQuery("<tr><td>" + item.name + "</td><td>" + item.pc	+ "</td><td>" + item.votes + "</td></tr>"));
					andmed.push([ item.name, item.votes ]);
					}
				});
			}
			table2.append(jQuery("</tr></tbody>"));
			drawChart(andmed, 'chart_div');
		
	
	
			var object = JSON.parse(localStorage.getItem("statcandidate"));
			if(partei==100 && piirkond==0){
				jQuery.each(object, function(index, item) {
					table3.append(jQuery("<tr><td>" + item.name + "</td><td>"+ item.votes + "</td></tr>"));
				});
			}else{
				if(piirkond!=0 && partei==100){
					jQuery.each(object, function(index, item) {
						if (item.region==piirkond){
						table3.append(jQuery("<tr><td>" + item.name + "</td><td>"+ item.votes + "</td></tr>"));
						}
					});
				}else if(piirkond==0 && partei !=100){
					jQuery.each(object, function(index, item) {
						if(item.party==partei){
						table3.append(jQuery("<tr><td>" + item.name + "</td><td>"+ item.votes + "</td></tr>"));
						}
						});
				} else if (piirkond!=0 && partei !=100){
					jQuery.each(object, function(index, item) {
						if (item.party==party && item.region== piirkond){
						table3.append(jQuery("<tr><td>" + item.name + "</td><td>"+ item.votes + "</td></tr>"));
						}
				});
				}
				
			}
			table3.append(jQuery("</tr></tbody>"));
			
		}
			
		
		}	
}
/**
 * id of a browser session for web socket
 */
var id = "";

/**
 * generate unique id from system tyme get JSon from /channel servlet Json
 * contains token
 * create channel between browser and server using token
 */
function sendGetToChannel() {
	var token = "";
	var link = "/channel?id=";
//	if (id != "") {
	id = new Date().getTime();
//	}
	link += id;
//	alert(link);

	jQuery.getJSON(link, function(data) {
//		alert("token: " + data.token);
		channel = new goog.appengine.Channel(data.token);
		socket = channel.open();
		socket.onopen = onOpened;
		socket.onmessage = onMessage;
		socket.onerror = onError;
		socket.onclose = onClose;
		sendMessage  = vote;
		
	});
}

function onOpened() {
//	alert(id);
    Stattable();
}

function onMessage(msg) {
	alert("message");
}

function onMessage(err) {
//    alert(err.data);
	if (err.data == "vote_updated"){
		Stattable();		
	}else if (err.data == "candidate_updated"){
		getForm();
	}
}
function onError(){
//	alert("error");s
}

function onClose() {
    alert("Channel closed!");
}

//function sendUpdateToChannel(update)


