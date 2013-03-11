// Load JSON text from server hosted file and return JSON parsed object
function loadJSON(filePath) {
  // Load json file;
  var json = loadTextFileAjaxSync(filePath, "application/json");
  // Parse json
  return JSON.parse(optionsText);
}   


//Load text with Ajax synchronously: takes path to file and optional MIME type
function loadTextFileAjaxSync(filePath, mimeType)
{
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET",filePath,false);
  if (mimeType != null) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType);
    }
  }
  xmlhttp.send();
  if (xmlhttp.status==200)
  {
    return xmlhttp.responseText;
  }
  else {
    // TODO Throw exception
    return null;
  }
}

function searchButtonAction() {//v1.0
	var name = "lalala";
	var area = 0;
	var party = 100;
	name = document.getElementById("search-box").value;
	var arealist = document.getElementById("choosearea");
	area = arealist.options[arealist.selectedIndex].value;
	var partylist = document.getElementById("chooseparty");
	party = partylist.options[partylist.selectedIndex].value;
	
	alert (name);
	alert (area);
	alert (party);
	
	if (JSONObject.name==name){
		alert ("if found")
		document.getElementById("candidatename").innerHTML=JSONObject.name;
		document.getElementById("resultinfo").innerHTML=JSONObject.info;
		document.getElementById("addinfo").innerHTML=JSONObject.addinfo;
		document.getElementById("voteid").innerHTML=JSONObject.id;
		document.getElementById("candidatepic").src=JSONObject.image;
		
	}
}