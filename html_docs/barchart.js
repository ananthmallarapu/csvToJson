var margin = {top: 80, right: 20, bottom: 70, left: 140},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .35);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(20);


// add the SVG element

var svg = d3.select("#tab1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


// load the data
console.log("hello");
d3.json("outputdata/file_01.json", function(error, data) {
    data.forEach(function(d) {
        d.CountryName = d.CountryName;
        d.Lifeexpectancy = +d.Lifeexpectancy;
    });
	
  // scale the range of the data
  x.domain(data.map(function(d) { return d.CountryName; }));
  y.domain([80, d3.max(data, function(d) { return d.Lifeexpectancy; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "middle")
      .attr("dx", "-.8em")
      .attr("dy", ".55em")
      .attr("transform", "rotate(0)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(90)")
      .attr("y", -10)
      .attr("x", height/2)
      .attr("dx" ,"4em")
      .attr("dy", "4em")
      .style("text-anchor", "end")
      .style("font-size", "15px")
      .text("Life expectancy");

      svg.append("text")
          .attr("class","title")
          .attr("x", (width / 2))             
          .attr("y", -30)
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "underline")  
          .text(" Top five Countries with highest Life Expectancy for the Year 2013");

      svg.append("text")
     .attr("x",width/2)
     .attr( "y",height+50)
    
      .attr("transform", "rotate(0)")
      
      .style("text-anchor", "end")
      .style("font-size","15px")
      .text("Countries"); 


  // Add bar chart
  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.CountryName); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Lifeexpectancy); })
      .attr("height", function(d) { return height - y(d.Lifeexpectancy); });

});
