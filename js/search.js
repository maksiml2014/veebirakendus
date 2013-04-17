function getForm() {
	
	
	var name = jQuery('#complete').val();
	var div = jQuery('#found');
	var table= jQuery('#tablesearch');
	var piirkond = document.getElementById("piirkond").value;
	var partei = document.getElementById("partei").value;
	var link="partei?searchbox=" + name + "&piirkond=" + piirkond + "&partei=" + partei;
	jQuery(div).empty();
	jQuery(table).empty();
	table.append(jQuery("<thead><th>Vali kandidaat</th><th>Kandidaadi number</th><th>Kandidaat</th><th>Piirkond</th><th>Partei</th></thead><tbody>"));
	div.append(jQuery("<p><br> Kandidaat leitud: </p><br />"));		
	
	var piirkonnaNimi;
	var parteiNimi;
	if(piirkond==1){
		piirkonnaNimi="Valimisringkond nr 1 - Tallinna Haabersti, Põhja-Tallinna ja Kristiine linnaosa";
	}
	else if (piirkond==2){
		piirkonnaNimi="Valimisringkond nr 2 - Tallinna Kesklinna, Lasnamäe ja Pirita linnaosa";
	}
	else if(piirkond==3){
		piirkonnaNimi="Valimisringkond nr 3 - Tallinna Mustamäe ja Nõmme linnaosa";
	}
	else if(piirkond==4){
		piirkonnaNimi="Valimisringkond nr 4 - Harju- (v.a Tallinn) ja Raplamaa";
	}
	else if(piirkond==5){
		piirkonnaNimi="Valimisringkond nr 5 - Hiiu-, Lääne- ja Saaremaa";
	}
	else if(piirkond==6){
		piirkonnaNimi="Valimisringkond nr 6 - Lääne-Virumaa";
	}
	else if(piirkond==7){
		piirkonnaNimi="Valimisringkond nr 7 - Ida-Virumaa";
	}
	else if(piirkond==8){
		piirkonnaNimi="Valimisringkond nr 8 - Järva- ja Viljandimaa";
	}
	else if(piirkond==9){
		piirkonnaNimi="Valimisringkond nr 9 - Jõgeva- ja Tartumaa (v.a Tartu linn)";
	}
	else if(piirkond==10){
		piirkonnaNimi="Valimisringkond nr 10 - Tartu linn";
	}
	else if(piirkond==11){
		piirkonnaNimi="Valimisringkond nr 11 - Võru-, Valga- ja Põlvamaa";
	}
	else if(piirkond==12){
		piirkonnaNimi="	Valimisringkond nr 12 - Pärnumaa";
	}
	
	if(partei==1){
		parteiNimi="Üksikandidaat";
	}
	else if(partei==2){
		parteiNimi="Eesti Rahvameele erakond";
	}
	else if(partei==3){
		parteiNimi="Erakond Vali Meid";
	}
	else if(partei==4){
		parteiNimi="Eesti Kohalik Koduerakond";
	}
	else if(partei==5){
		parteiNimi="Erakond Uudne Kodu";
	}
	else if(partei==6){
		parteinNimi="Erakond Tasakaalukus";
	}
	else if(partei==7){
		parteiNimi="Eestimaa Ühendatud Taimetoitlased";
	}
	else if(partei==8){
		parteiNimi="Erakond Eesti Sinised Vabanikud";
	}
	else if(partei==9){
		parteiNimi="Erakond Roheline Muru Meile";
	}
	else if(partei==10){
		parteiNimi="Eesti Riiklik Tasapinna Kogu";
	}
	else if(partei==11){
		parteiNimi="Rahvaeitav Erakond";
	}
		
	if(navigator.onLine){
		jQuery.getJSON(link, function(data){
			jQuery.each(data, function(index, item){
				table.append(jQuery('<tr><td><input type="radio" name="radiohaaletamine" value ="' + item.id +  '"></input></td><td>' + item.id +'</td><td>' + item.name + "</td><td>" + item.region_name + "</td><td>" + item.party_name + "</td></tr>"));
			});
			table.append(jQuery("</tbody>"));
		});	
	}else{
		var object = JSON.parse(localStorage.getItem("Search"));
		
		if(name!=""){
			if(piirkond==0 && partei==100){
			jQuery.each(object, function(index, item){
				if(item.name==name){
				table.append(jQuery('<tr><td><input type="radio" name="radiohaaletamine" value ="' + item.id +  '"></input></td><td>' + item.id +'</td><td>' + item.name + "</td><td>" + item.region_name + "</td><td>" + item.party_name + "</td></tr>"));
				}
			});	
			}
			else{
				if(piirkond==0 && partei!=100){
					jQuery.each(object, function(index, item){
						if(item.name==name && item.party_name==parteiNimi){
						table.append(jQuery('<tr><td><input type="radio" name="radiohaaletamine" value ="' + item.id +  '"></input></td><td>' + item.id +'</td><td>' + item.name + "</td><td>" + item.region_name + "</td><td>" + item.party_name + "</td></tr>"));
						}
					});
				}
				else if(piirkond!=0 && partei==100){
					jQuery.each(object, function(index, item){
						if(item.name==name && item.region_name==piirkonnaNimi){
						table.append(jQuery('<tr><td><input type="radio" name="radiohaaletamine" value ="' + item.id +  '"></input></td><td>' + item.id +'</td><td>' + item.name + "</td><td>" + item.region_name + "</td><td>" + item.party_name + "</td></tr>"));
						}
					});
				}
				else if(piirkond!=0 && partei!=100){
					jQuery.each(object, function(index, item){
						if(item.name==name && item.region_name==piirkonnaNimi && item.party_name==parteiNimi){
						table.append(jQuery('<tr><td><input type="radio" name="radiohaaletamine" value ="' + item.id +  '"></input></td><td>' + item.id +'</td><td>' + item.name + "</td><td>" + item.region_name + "</td><td>" + item.party_name + "</td></tr>"));
						}
					});
				}
			}		
		}
		else{
			if(piirkond==0 && partei==100){
				jQuery.each(object, function(index, item){
					table.append(jQuery('<tr><td><input type="radio" name="radiohaaletamine" value ="' + item.id +  '"></input></td><td>' + item.id +'</td><td>' + item.name + "</td><td>" + item.region_name + "</td><td>" + item.party_name + "</td></tr>"));
				});	
			}
			else{
			
				if(piirkond==0 && partei!=100){
					jQuery.each(object, function(index, item){
						if(item.party_name==parteiNimi){
						table.append(jQuery('<tr><td><input type="radio" name="radiohaaletamine" value ="' + item.id +  '"></input></td><td>' + item.id +'</td><td>' + item.name + "</td><td>" + item.region_name + "</td><td>" + item.party_name + "</td></tr>"));
						}
					});
				}
				else if(piirkond!=0 && partei==100){
					jQuery.each(object, function(index, item){
						if(item.region_name==piirkonnaNimi){
						table.append(jQuery('<tr><td><input type="radio" name="radiohaaletamine" value ="' + item.id +  '"></input></td><td>' + item.id +'</td><td>' + item.name + "</td><td>" + item.region_name + "</td><td>" + item.party_name + "</td></tr>"));
						}
					});
				}
				else if(piirkond!=0 && partei!=100){
					jQuery.each(object, function(index, item){
						if(item.region_name==piirkonnaNimi && item.party_name==parteiNimi){
						table.append(jQuery('<tr><td><input type="radio" name="radiohaaletamine" value ="' + item.id +  '"></input></td><td>' + item.id +'</td><td>' + item.name + "</td><td>" + item.region_name + "</td><td>" + item.party_name + "</td></tr>"));
						}
					});
				}			
			}
		}
	}table.append(jQuery("</tbody>"));
}