


function supports_html5_storage() {
	  try {
	    return 'localStorage' in window && window['localStorage'] !== null;
	  } catch (e) {
	    return false;
	  }
	}
		
	function GetLocalData(){
		if(!supports_html5_storage() && !navigator.onLine()){
			return;
		}
		//search jsonid
				jQuery.getJSON("partei?searchbox=&piirkond=0&partei=100", function(data){
					var index = String("Search");
					var andmed = (JSON.stringify(data));
					localStorage.setItem(index,andmed);
				});
			
					
		//stat jsonid

			
		var jsonlink= String("statpartei?statpiirkond=0&statpartei=100");
		jQuery.getJSON(jsonlink, function(data){
			index= ("statpartei")
			andmed=(JSON.stringify(data));
			localStorage.setItem(index,andmed);
		});
			
		
		
		
			jsonlink=String("statcandidate?statpiirkond=0&statpartei=100");
			jQuery.getJSON(jsonlink, function(data){
				index= ("statcandidate");
				andmed=(JSON.stringify(data));
				localStorage.setItem(index,andmed);
			});
			
		}
	
	
	GetLocalData();