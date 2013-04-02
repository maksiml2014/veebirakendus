
      // Load the Visualization API and the piechart package.
      google.load('visualization', '1.0', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {
    	  
    	var piirkond = document.getElementById("statpiirkond").value;
    	var partei = document.getElementById("statpartei").value;
    	var link="statpartei?statpiirkond=" + piirkond + "&statpartei=" + partei
        clearChart();
    	var list;
    	// Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Hääli');
  //      data.addRows([
    //      ['Mushrooms', 3],
      //    ['Onions', 1],
   //       ['Olives', 1],
   //       ['Zucchini', 1],
   //       ['Pepperoni', 2]
  //      ]);
        
        jQuery.getJSON(link, function(data){
    		jQuery.each(data, function(index, item){
    			list.append(jQuery("['" + item.partei +"', " + item.votes + "],"))
    		});
    		finallist=list.substring(0, str.length-1);
    		data.addRows([finallist]);
        }	
    		
        // Set chart options
        var options = {'title':'Hääli',
                       'width':$("#itemL").width(),
                       'height':300,
                       'backgroundColor': "#6fa8dc"};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
