/*
 * Add your JavaScript to this file to complete the assignment.  Don't forget
 * to add your name and @oregonstate email address below.
 *
 * Name: Jayson Kildea
 * Email: kildeaj@oregonstate.edu
 */

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart1);
google.charts.setOnLoadCallback(drawChart2);
// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart1() {
var data = new google.visualization.DataTable();
	data.addColumn('string', 'Topping');
	data.addColumn('number', 'Slices');
	data.addColumn({ role: 'style' });
	data.addRows([
		['Mushrooms', 52.5, 'color: darkgoldenrod'],
		['Onions', 38.4, 'color: purple'],
		['Olives', 12.5, 'color: darkolivegreen'],
		['Zucchini', 32.0, 'color: darkgreen'],
		['Pepperoni', 40.0, 'color: red']
	]);
	data.sort({column:1, desc:true});

	var options = {'title':'Most Wasted Foods This Week',
                       'width':500,
                       'height':300}; 
        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(document.getElementById('chart1'));
	chart.draw(data, options);
}

function drawChart2() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Meal Options');
	data.addColumn('number', '# of times chosen');
	data.addRows([
		['Cheeseburger & Fries', 7],
		['Pepperoni Pizza', 3],
		['Alfredo Pasta', 5],
		['Taco', 2],
		['Vegetarian', 4]
	]);
	data.sort({column:1, desc:true});

	var options = {'title':'Popularity of Meals for November 7th, 2022',
                       'width':500,
                       'height':300};
        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart2'));
	chart.draw(data, options);
}
