function hidelogout(){
//	alert('asda');
	document.getElementById("logoutbutton").style.visibility = 'hidden';
	document.getElementById("addvote").style.visibility='hidden';
	document.getElementById("deletevote").style.visibility='hidden';
	document.getElementById("lisavisible").style.visibility='hidden';
	document.getElementById("pleaselogin").style.visibility='visible';
}
function hidelogin(){
	document.getElementById("loginbutton").style.visibility = 'hidden';
	document.getElementById("addvote").style.visibility='visible';
	document.getElementById("deletevote").style.visibility='visible';
	document.getElementById("lisavisible").style.visibility='visible';
	document.getElementById("pleaselogin").style.visibility='hidden';
}
function showlogout(){
	document.getElementById("logoutbutton").style.visibility = 'visible';
	document.getElementById("addvote").style.visibility='visible';
	document.getElementById("deletevote").style.visibility='visible';
	document.getElementById("lisavisible").style.visibility='visible';
	document.getElementById("pleaselogin").style.visibility='hidden';
}
function showlogin(){
	document.getElementById("loginbutton").style.visibility = 'visible';
	document.getElementById("addvote").style.visibility='hidden';
	document.getElementById("deletevote").style.visibility='hidden';
	document.getElementById("lisavisible").style.visibility='hidden';
	document.getElementById("pleaselogin").style.visibility='visible';
}