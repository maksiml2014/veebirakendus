
var username = "";

function Login() {
	

	var usernamediv = jQuery('#username');
	username = "Ott Karu";
	
	usernamediv.append(jQuery("<p> Ott Karu </p>"));		
	
	hidelogin();
	showlogout();
}

function Logout(){
	
	var usernamediv = jQuery('#username');
	jQuery(usernamediv).empty();
	hidelogout();
	showlogin();
	
}