var username = "Ott Karu";
var addfunc = "add";






function getCheckedRadio(radio_group) {
	for ( var i = 0; i < radio_group.length; i++) {
		var button = radio_group[i];
		if (button.checked) {
			return button;
		}
	}
	return undefined;
}


function addCandidate() {

	if (validation()) {

		var party_radio_group = document.getElementsByName("partei");
		var region_radio_group = document.getElementsByName("ringkond");

		var party_id_button = getCheckedRadio(party_radio_group);
		var region_id_button = getCheckedRadio(region_radio_group);

		var party_id = party_id_button.value;
		var region_id = region_id_button.value;
		// alert (party_id + region_id);
		//		
		var result = jQuery.post("/statpartei",{candidate_name : username, party : party_id, region : region_id},
				function(data) {
			alert("Kandidaat edukalt lisatud!");
		}).error(function() {
			alert("Olete end juba lisanud kandidaadiks. Tühistamiseks kontakteeriga rakenduse omanikke.");
		})

	}
}