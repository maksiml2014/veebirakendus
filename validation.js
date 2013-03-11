function select_radio_button(group_p){
	document.getElementById(group_p).style.color='white';
}

function is_selected(rb_group,lbl_info){
	var radio_group = document.getElementsByName(rb_group);
	for(var x=0;x<radio_group.length;x++){
		if(radio_group[x].checked){
			document.getElementById(lbl_info).style.color='white';
			return 0;
		}
	}
	document.getElementById(lbl_info).style.color='red';
	return 1;
}
function validation(){
	var error=0;
	error+=is_selected("ringkond","ringkond_info");
	error+=is_selected("partei","partei_info");
	if(error>0){
		alert("Palun täitke kõik punasega tähistatud väljad!");
		return false;
	}
	else{
		return true;
	}
}	

