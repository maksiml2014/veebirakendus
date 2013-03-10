function select_radio_button(group_p){
	document.getElementById(group_p).className='normal_p';
}

function is_selected(rb_group,lbl_info){
	var radio_group =document.getElementsByName(rb_group);
	for(var x=0;x<radio_group.length;x++){
		if(radio_group[x].checked){
			document.getElementById(lbl_info).className='normal_p';
			return 0;
		}
	}
	document.getElementById(lbl_info).className='error_p';
	return 1;
}
function validation(){
	var error=0;
	error+=is_selected("area","area_info");
	error+=is_selected("partei","partei_info");
	if(error>0){
		alert("Palun täitke kõik vajalikud väljad!");
		return false;
	}
	else{
		return true;
	}
}	

