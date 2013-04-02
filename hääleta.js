function hääleta() {
	
	hidehääleta();
	showtühista();
}

function tühista(){
	
	hidetühista();
	showhääleta();
	
}



function hidehääleta(){
	document.getElementById("addvote").style.visibility = 'hidden';
}

function showhääleta(){
	document.getElementById("deletevote").style.visibility = 'visible';
}


function hidetühista(){
	document.getElementById("deletevote").style.visibility = 'hidden';
}

function showtühista(){
	document.getElementById("addvote").style.visibility = 'visible';
}