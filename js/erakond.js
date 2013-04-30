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


var pc1=0;
var pc2=0;
var pc3=0;
var pc4=0;
var pc5=0;
var pc6=0;
var pc7=0;
var pc8=0;
var pc9=0;
var pc10=0;
var pc11=0;
var pc12=0;	

var text1;
var text2;
var text3;
var text4;
var text5;
var text6;
var text7;
var text8;
var text9;
var text10;
var text11;
var text12;

var party1;
var party2;
var party3;
var party4;
var party5;
var party6;
var party7;
var party8;
var party9;
var party10;
var party11;
var party12;



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
				if (item.region=="1"){
					if (item.pc>pc1){
						pc1=item.pc;
						party1=item.party;
						text1=item.name + "<br>" + item.pc + " % häältest<br>" + item.votes + " häält";					
					}
				}else if (item.region=="2"){
					if (item.pc>pc2){
						pc2=item.pc;
						party2=item.party;
						text2=item.name + "<br>" + item.pc + " % häältest<br>" + item.votes + " häält";
					}
				}else if (item.region=="3"){
					if (item.pc>pc3){
						pc3=item.pc;
						party3=item.party;
						text3=item.name + "<br>" + item.pc + " % häältest<br>" + item.votes + " häält";						
					}
				}else if (item.region=="4"){
					if (item.pc>pc4){
						pc4=item.pc;
						party4=item.party;
						text4=item.name + "<br>" + item.pc + " % häältest<br>" + item.votes + " häält";						
					}
				}else if (item.region=="5"){
					if (item.pc>pc5){
						pc5=item.pc;
						party5=item.party;
						text5=item.name + "<br>" + item.pc + " % häältest<br>" + item.votes + " häält";						
					}
				}else if (item.region=="6"){
					if (item.pc>pc6){
						pc6=item.pc;
						party6=item.party;
						text6=item.name + "<br>" + item.pc + " % häältest<br>" + item.votes + " häält";						
					}					
				}else if (item.region=="7"){
					if (item.pc>pc7){
						pc7=item.pc;
						party7=item.party;
						text7=item.name + "<br>" + item.pc + " % häältest<br>" + item.votes + " häält";						
					}
				}else if (item.region=="8"){
					if (item.pc>pc8){
						pc8=item.pc;
						party8=item.party;
						text8=item.name + "<br>" + item.pc + " % häältest<br>" + item.votes + " häält";						
					}
				}else if (item.region=="9"){
					if (item.pc>pc9){
						pc9=item.pc;
						party9=item.party;
						text9=item.name + "<br>" + item.pc + " % häältest<br>" + item.votes + " häält";						
					}
				}else if (item.region=="10"){
					if (item.pc>pc10){
						pc10=item.pc;
						party10=item.party;
						text10=item.name + "<br>" + item.pc + " % häältest<br>" + item.votes + " häält";						
					}
				}else if (item.region=="11"){
					if (item.pc>pc11){
						pc11=item.pc;
						party11=item.party;
						text11=item.name + "<br>" + item.pc + " % häältest<br>" + item.votes + " häält";						
					}
				}else if (item.region=="12"){
					if (item.pc>pc12){
						pc12=item.pc;
						party12=item.party;
						text12=item.name + "<br>" + item.pc + " % häältest<br>" + item.votes + " häält";						
					}
				}
			});
			table2.append(jQuery("</tr></tbody>"));
			table.append(jQuery("</tr></tbody>"));
			drawChart(andmed, 'map');
			drawChart(andmed, 'chart_div');
			initialize();			
			
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


//google map

function initialize() {
	var myMapOptions = {
		 zoom: 7
		,center: new google.maps.LatLng(58.694068,26.8396)
		,mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var theMap = new google.maps.Map(document.getElementById("googleMap"), myMapOptions);

	
	
	var Parnu = new google.maps.Marker({
		map: theMap,
		draggable: false,
		position: new google.maps.LatLng(58.384078,24.524746),
		visible: true,
		icon: "images/" + party12 +".png"
	});

	var ParnuText = document.createElement("div");
	ParnuText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
	ParnuText.innerHTML = text12;

	var myOptionsParnu = {
		 content: ParnuText
		,disableAutoPan: false
		,maxWidth: 0
		,pixelOffset: new google.maps.Size(-140, 0)
		,zIndex: null
		,boxStyle: { 
		  background: "url('tipbox.gif') no-repeat"
		  ,opacity: 0.75
		  ,width: "280px"
		 }
		,closeBoxMargin: "10px 2px 2px 2px"
		,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
		,infoBoxClearance: new google.maps.Size(1, 1)
		,isHidden: false
		,pane: "floatPane"
		,enableEventPropagation: false
	};

	google.maps.event.addListener(Parnu, "click", function (e) {
		ib12.open(theMap, this);
	});
	var ib12 = new InfoBox(myOptionsParnu);
	
	var Voru = new google.maps.Marker({
		map: theMap,
		draggable: false,
		position: new google.maps.LatLng(57.841662,27.003515),
		visible: true,
		icon: "images/" + party11 +".png"
	});

	var VoruText = document.createElement("div");
	VoruText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
	VoruText.innerHTML = text11;

	var myOptionsVoru = {
		 content: VoruText
		,disableAutoPan: false
		,maxWidth: 0
		,pixelOffset: new google.maps.Size(-140, 0)
		,zIndex: null
		,boxStyle: { 
		  background: "url('tipbox.gif') no-repeat"
		  ,opacity: 0.75
		  ,width: "280px"
		 }
		,closeBoxMargin: "10px 2px 2px 2px"
		,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
		,infoBoxClearance: new google.maps.Size(1, 1)
		,isHidden: false
		,pane: "floatPane"
		,enableEventPropagation: false
	};

	google.maps.event.addListener(Voru, "click", function (e) {
		ib11.open(theMap, this);
	});
	var ib11 = new InfoBox(myOptionsVoru);
	
	
	var Tartu = new google.maps.Marker({
		map: theMap,
		draggable: false,
		position: new google.maps.LatLng(58.377565,26.727387),
		visible: true,
		icon: "images/" + party10 +".png"
	});

	var TartuText = document.createElement("div");
	TartuText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
	TartuText.innerHTML = text10;

	var myOptionsTartu = {
		 content: TartuText
		,disableAutoPan: false
		,maxWidth: 0
		,pixelOffset: new google.maps.Size(-140, 0)
		,zIndex: null
		,boxStyle: { 
		  background: "url('tipbox.gif') no-repeat"
		  ,opacity: 0.75
		  ,width: "280px"
		 }
		,closeBoxMargin: "10px 2px 2px 2px"
		,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
		,infoBoxClearance: new google.maps.Size(1, 1)
		,isHidden: false
		,pane: "floatPane"
		,enableEventPropagation: false
	};

	google.maps.event.addListener(Tartu, "click", function (e) {
		ib10.open(theMap, this);
	});
	var ib10 = new InfoBox(myOptionsTartu);
	
	var Jogeva = new google.maps.Marker({
		map: theMap,
		draggable: false,
		position: new google.maps.LatLng(58.743069,26.38356),
		visible: true,
		icon: "images/" + party9 +".png"
	});

	var JogevaText = document.createElement("div");
	JogevaText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
	JogevaText.innerHTML = text9;

	var myOptionsJogeva = {
		 content: JogevaText
		,disableAutoPan: false
		,maxWidth: 0
		,pixelOffset: new google.maps.Size(-140, 0)
		,zIndex: null
		,boxStyle: { 
		  background: "url('tipbox.gif') no-repeat"
		  ,opacity: 0.75
		  ,width: "280px"
		 }
		,closeBoxMargin: "10px 2px 2px 2px"
		,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
		,infoBoxClearance: new google.maps.Size(1, 1)
		,isHidden: false
		,pane: "floatPane"
		,enableEventPropagation: false
	};

	google.maps.event.addListener(Jogeva, "click", function (e) {
		ib9.open(theMap, this);
	});
	var ib9 = new InfoBox(myOptionsJogeva);
		
	var Viljandi = new google.maps.Marker({
		map: theMap,
		draggable: false,
		position: new google.maps.LatLng(58.360499,25.591106),
		visible: true,
		icon: "images/" + party8 +".png"
	});

	var ViljandiText = document.createElement("div");
	ViljandiText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
	ViljandiText.innerHTML = text8;

	var myOptionsViljandi = {
		 content: ViljandiText
		,disableAutoPan: false
		,maxWidth: 0
		,pixelOffset: new google.maps.Size(-140, 0)
		,zIndex: null
		,boxStyle: { 
		  background: "url('tipbox.gif') no-repeat"
		  ,opacity: 0.75
		  ,width: "280px"
		 }
		,closeBoxMargin: "10px 2px 2px 2px"
		,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
		,infoBoxClearance: new google.maps.Size(1, 1)
		,isHidden: false
		,pane: "floatPane"
		,enableEventPropagation: false
	};

	google.maps.event.addListener(Viljandi, "click", function (e) {
		ib8.open(theMap, this);
	});
	var ib8 = new InfoBox(myOptionsViljandi);
		
		
	var Idaviru = new google.maps.Marker({
		map: theMap,
		draggable: false,
		position: new google.maps.LatLng(59.353737,27.411194),
		visible: true,
		icon: "images/" + party7 +".png"
	});

	var IdaviruText = document.createElement("div");
	IdaviruText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
	IdaviruText.innerHTML = text7;
		
	var myOptionsIdaviru = {
		 content: IdaviruText
		,disableAutoPan: false
		,maxWidth: 0
		,pixelOffset: new google.maps.Size(-140, 0)
		,zIndex: null
		,boxStyle: { 
		  background: "url('tipbox.gif') no-repeat"
		  ,opacity: 0.75
		  ,width: "280px"
		 }
		,closeBoxMargin: "10px 2px 2px 2px"
		,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
		,infoBoxClearance: new google.maps.Size(1, 1)
		,isHidden: false
		,pane: "floatPane"
		,enableEventPropagation: false
	};

	google.maps.event.addListener(Idaviru, "click", function (e) {
		ib7.open(theMap, this);
	});
	var ib7 = new InfoBox(myOptionsIdaviru);
	
	
	var Laaneviru = new google.maps.Marker({
			map: theMap,
			draggable: false,
			position: new google.maps.LatLng(59.342972,26.366115),
			visible: true,
			icon: "images/" + party6 +".png"
		});

		var LaaneviruText = document.createElement("div");
		LaaneviruText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
		LaaneviruText.innerHTML = text6;

		var myOptionsLaaneviru = {
			 content: LaaneviruText
			,disableAutoPan: false
			,maxWidth: 0
			,pixelOffset: new google.maps.Size(-140, 0)
			,zIndex: null
			,boxStyle: { 
			  background: "url('tipbox.gif') no-repeat"
			  ,opacity: 0.75
			  ,width: "280px"
			 }
			,closeBoxMargin: "10px 2px 2px 2px"
			,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
			,infoBoxClearance: new google.maps.Size(1, 1)
			,isHidden: false
			,pane: "floatPane"
			,enableEventPropagation: false
		};

		google.maps.event.addListener(Laaneviru, "click", function (e) {
			ib6.open(theMap, this);
		});
		var ib6 = new InfoBox(myOptionsLaaneviru);
		
		
		var Laane = new google.maps.Marker({
			map: theMap,
			draggable: false,
			position: new google.maps.LatLng(58.939349,23.538439),
			visible: true,
			icon: "images/" + party5 +".png"
		});

		var LaaneText = document.createElement("div");
		LaaneText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
		LaaneText.innerHTML = text5;

		var myOptionsLaane = {
			 content: LaaneText
			,disableAutoPan: false
			,maxWidth: 0
			,pixelOffset: new google.maps.Size(-140, 0)
			,zIndex: null
			,boxStyle: { 
			  background: "url('tipbox.gif') no-repeat"
			  ,opacity: 0.75
			  ,width: "280px"
			 }
			,closeBoxMargin: "10px 2px 2px 2px"
			,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
			,infoBoxClearance: new google.maps.Size(1, 1)
			,isHidden: false
			,pane: "floatPane"
			,enableEventPropagation: false
		};

		google.maps.event.addListener(Laane, "click", function (e) {
			ib5.open(theMap, this);
		});
		var ib5 = new InfoBox(myOptionsLaane);
		


		var Rapla = new google.maps.Marker({
			map: theMap,
			draggable: false,
			position: new google.maps.LatLng(59.001329,24.796084),
			visible: true,
			icon: "images/" + party4 +".png"
		});

		var RaplaText = document.createElement("div");
		RaplaText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
		RaplaText.innerHTML = text4;

		var myOptionsRapla = {
			 content: RaplaText
			,disableAutoPan: false
			,maxWidth: 0
			,pixelOffset: new google.maps.Size(-140, 0)
			,zIndex: null
			,boxStyle: { 
			  background: "url('tipbox.gif') no-repeat"
			  ,opacity: 0.75
			  ,width: "280px"
			 }
			,closeBoxMargin: "10px 2px 2px 2px"
			,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
			,infoBoxClearance: new google.maps.Size(1, 1)
			,isHidden: false
			,pane: "floatPane"
			,enableEventPropagation: false
		};

		google.maps.event.addListener(Rapla, "click", function (e) {
			ib4.open(theMap, this);
		});
		var ib4 = new InfoBox(myOptionsRapla);
		
		
		var Nomme = new google.maps.Marker({
			map: theMap,
			draggable: false,
			position: new google.maps.LatLng(59.376362,24.690539),
			visible: true,
			icon: "images/" + party3 +".png"
		});

		var NommeText = document.createElement("div");
		NommeText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
		NommeText.innerHTML = text3;

		var myOptionsNomme = {
			 content: NommeText
			,disableAutoPan: false
			,maxWidth: 0
			,pixelOffset: new google.maps.Size(-140, 0)
			,zIndex: null
			,boxStyle: { 
			  background: "url('tipbox.gif') no-repeat"
			  ,opacity: 0.75
			  ,width: "280px"
			 }
			,closeBoxMargin: "10px 2px 2px 2px"
			,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
			,infoBoxClearance: new google.maps.Size(1, 1)
			,isHidden: false
			,pane: "floatPane"
			,enableEventPropagation: false
		};

		google.maps.event.addListener(Nomme, "click", function (e) {
			ib3.open(theMap, this);
		});
		var ib3 = new InfoBox(myOptionsNomme);
		
			
		var Lasna = new google.maps.Marker({
			map: theMap,
			draggable: false,
			position: new google.maps.LatLng(59.433128,24.861133),
			visible: true,
			icon: "images/" + party2 +".png"
		});

		var LasnaText = document.createElement("div");
		LasnaText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
		LasnaText.innerHTML = text2;

		var myOptionsLasna = {
			 content: LasnaText
			,disableAutoPan: false
			,maxWidth: 0
			,pixelOffset: new google.maps.Size(-140, 0)
			,zIndex: null
			,boxStyle: { 
			  background: "url('tipbox.gif') no-repeat"
			  ,opacity: 0.75
			  ,width: "280px"
			 }
			,closeBoxMargin: "10px 2px 2px 2px"
			,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
			,infoBoxClearance: new google.maps.Size(1, 1)
			,isHidden: false
			,pane: "floatPane"
			,enableEventPropagation: false
		};

		google.maps.event.addListener(Lasna, "click", function (e) {
			ib2.open(theMap, this);
		});
		var ib2 = new InfoBox(myOptionsLasna);
		
		
		var Pohja = new google.maps.Marker({
			map: theMap,
			draggable: false,
			position: new google.maps.LatLng(59.459068,24.688586),
			visible: true,
			icon: "images/" + party1 +".png"
		});

		var PohjaText = document.createElement("div");
		PohjaText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
		PohjaText.innerHTML = text1;

		var myOptionsPohja = {
			 content: PohjaText
			,disableAutoPan: false
			,maxWidth: 0
			,pixelOffset: new google.maps.Size(-140, 0)
			,zIndex: null
			,boxStyle: { 
			  background: "url('tipbox.gif') no-repeat"
			  ,opacity: 0.75
			  ,width: "280px"
			 }
			,closeBoxMargin: "10px 2px 2px 2px"
			,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
			,infoBoxClearance: new google.maps.Size(1, 1)
			,isHidden: false
			,pane: "floatPane"
			,enableEventPropagation: false
		};

		google.maps.event.addListener(Pohja, "click", function (e) {
			ib1.open(theMap, this);
		});
		var ib1 = new InfoBox(myOptionsPohja);
		
		var legend = document.getElementById('legend');
		
		var div=document.createElement('div');
		div.innerHTML= '<img src="images/1.png"> Üksikkandidaat'
		legend.appendChild(div);
		div=document.createElement('div');
		div.innerHTML= '<img src="images/2.png"> Eesti Rahvameele erakond'
		legend.appendChild(div);
		div=document.createElement('div');
		div.innerHTML= '<img src="images/3.png"> Erakond Vali Meid'
		legend.appendChild(div);
		div=document.createElement('div');
		div.innerHTML= '<img src="images/4.png"> Eesti Kohalik Koduerakond'
		legend.appendChild(div);
		div=document.createElement('div');
		div.innerHTML= '<img src="images/5.png"> Erakond Uudne Kodue'
		legend.appendChild(div);
		div=document.createElement('div');
		div.innerHTML= '<img src="images/6.png"> Erakond Tasakaalukus'
		legend.appendChild(div);
		div=document.createElement('div');
		div.innerHTML= '<img src="images/7.png"> Eestimaa Ühendatud Taimetoitlased'
		legend.appendChild(div);
		div=document.createElement('div');
		div.innerHTML= '<img src="images/8.png"> Erakond Eesti Sinised Vabanikud'
		legend.appendChild(div);
		div=document.createElement('div');
		div.innerHTML= '<img src="images/9.png"> Erakond Roheline Muru Meile'
		legend.appendChild(div);
		div=document.createElement('div');
		div.innerHTML= '<img src="images/10.png"> Eesti Riiklik Tasapinna Kogu'
		legend.appendChild(div);
		div=document.createElement('div');
		div.innerHTML= '<img src="images/11.png"> Rahvaeitav Erakond'
		legend.appendChild(div);
		
		
		
		theMap.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
				  document.getElementById('legend'));
}


//channel api

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


