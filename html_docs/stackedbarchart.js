d3.json("outputdata/file_02.json", function(error, data) {

    data.forEach(function(d) {
        d.year=d.year;
    	d.female=parseFloat(d.female);
    	d.male=parseFloat(d.male);
        //console.log(d.year);
        //console.log((d.female));
        //console.log((d.male));

    });

    var xData=["male","female"];

    var margin = {top: 80, right: 50, bottom: 80, left: 70},
        width = 960 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;
 
var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], 0.35);
 
var y = d3.scale.linear()
        .rangeRound([height, 0]);
 
var color = d3.scale.category20();
 
var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
 var yAxis=d3.svg.axis()
        .scale(y)
        .orient("left");
 
var svg = d3.select("#tab2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    

var dataIntermediate=xData.map(function(c){
    return data.map(function(d){
        return {x: d.year, y: d[c] };

    });
});

//console.log(dataIntermediate);

var dataStackLayout = d3.layout.stack()(dataIntermediate);
console.log(dataStackLayout.length);

x.domain(dataStackLayout[0].map(function (d) {
    return d.x;
}));
//console.log(x.domain());
 
y.domain([0,
    d3.max(dataStackLayout[dataStackLayout.length - 1],
            function (d) { return d.y0 + d.y;})
    ])
  .nice();

  //console.log(y.domain());

  var layer = svg.selectAll(".stack")
        .data(dataStackLayout)
        .enter().append("g")
        .attr("class", "stack")
        .style("fill", function (d, i) {
            
            console.log("color");
            console.log( color(i));
            return color(i);

        });
 
layer.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x(d.x);
        })
        .attr("y", function (d) {
            return y(d.y + d.y0);
        })
        .attr("height", function (d) {
            return y(d.y0) - y(d.y + d.y0);
        })
        .attr("width", x.rangeBand());

svg.append("text")
	        .attr("class","title")
	        .attr("x", (width / 2))             
	        .attr("y", -20)
	        .attr("text-anchor", "middle")  
	        .style("font-size", "16px") 
	        .style("text-decoration", "underline")  
	        .text("Life Expectancy of asian Countries over the years 1960-2013");


svg.append("rect")
	        .attr("x", (width/100))             
	        .attr("y", 20)
	        .attr("width",15)
	        .attr("height",15) 
	        .style("fill","#1f77b4");
 svg.append("rect")
	        .attr("x", (width/100))             
	        .attr("y", 0)
	        .attr("width",15)
	        .attr("height",15) 
	        .style("fill","#aec7e8");
svg.append("text")
	        .attr("x", (width / 100)+20)             
	        .attr("y", 32)
	        .attr("text-anchor", "start")  
	        .style("font-size", "16px")   
	        .text("female");
svg.append("text")
	        .attr("x", (width / 100)+20)             
	        .attr("y", 12)
	        .attr("text-anchor", "start")  
	        .style("font-size", "16px")   
	        .text("male");
	       
	   svg.append("text")
 		 .attr("x",width/2)
 		 .attr( "y",height+50)
 		
      .attr("transform", "rotate(0)")
      
      .style("text-anchor", "start")
      .style("font-size","15px")
      .text("Years");     




svg.append("g")

        .attr("class", " y axis")
        .call(yAxis)
        .append("text")
 		.attr("x",height/2)
 		.attr("y",-10)
 		.attr("class","title")
      .attr("transform", "rotate(90)")
      .attr("dx" ,"4em")
      .attr("dy", "4em")
      .style("text-anchor", "end")
      .style("font-size","15px")
      .text("Life expectancy")
        
      .selectAll("text")  
     .style("text-anchor", "end")
     .attr("dx", "-.8em")
     .attr("dy", ".15em")
     .attr("transform", "rotate(0)");
   		
 



svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")  
     .style("text-anchor", "end")
     .attr("dx", "-.8em")
     .attr("dy", ".15em")
     .attr("transform", "rotate(-65)");

  


    




});    