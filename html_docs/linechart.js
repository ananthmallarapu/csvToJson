d3.json("outputdata/file_03.json", function(error, data) {

    data.forEach(function(d) {
       
      d.birthrate=parseFloat(d.birthrate);
      d.deathrate=parseFloat(d.deathrate);
       d.year=(d.year);
        //console.log(d.year);
        //console.log((d.birthrate));
       //console.log((d.deathrate));

    });

    var dataIntermediate=["birthrate","deathrate"].map(function(c){
    return data.map(function(d){
        return {x: d.year, y: d[c] };

        





    });
});
console.log(dataIntermediate.length);
var data_0=dataIntermediate[0];
var data_1=dataIntermediate[1];
console.log(data_0);
console.log(data_1);

var margin = {top: 80, right: 50, bottom: 80, left: 70},
        width = 960 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;





         xScale = d3.scale.ordinal()
        .rangeRoundBands([0, width], 0.35).domain(data_0.map(function (d) {
    return d.x;
}));
         console.log(xScale.domain());

      yScale = d3.scale.linear().range([height,0]).domain([0,
    Math.max(d3.max(data_0,
            function (d) { return  d.y;}),d3.max(data_1,function(d){return d.y;}))
    ]).nice();

       console.log(yScale.domain());


      
 
var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
 var yAxis=d3.svg.axis()
        .scale(yScale)
        .orient("left");
 
var svg = d3.select("#tab3").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




       


     svg.append("rect")
	        .attr("x", (width/100))             
	        .attr("y", 10)
	        .attr("width",15)
	        .attr("height",15) 
	        .style("fill","blue");
 svg.append("rect")
	        .attr("x", (width/100))             
	        .attr("y", -10)
	        .attr("width",15)
	        .attr("height",15) 
	        .style("fill","green");
svg.append("text")
	        .attr("x", (width / 100)+20)             
	        .attr("y", 22)
	        .attr("text-anchor", "start")  
	        .style("font-size", "16px")   
	        .text("deathrate");
svg.append("text")
	        .attr("x", (width / 100)+20)             
	        .attr("y", 2)
	        .attr("text-anchor", "start")  
	        .style("font-size", "16px")   
	        .text("birthrate");


	          var lineGen = d3.svg.line()
  .x(function(d) {
    return xScale(d.x);
  })
  .y(function(d) {
    return yScale(d.y);
  }).interpolate("basis");

  svg.append('svg:path')
  .attr('d', lineGen(data_0))
  .attr('stroke', 'green')
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  ;

  svg.append('svg:path')
  .attr('d', lineGen(data_1))
  .attr('stroke', 'blue')
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  ;
svg.append("text")
          .attr("class","title")
          .attr("x", (width / 2))             
          .attr("y", -20)
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "underline")  
          .text("birthrate and deathrate of India over the years 1960-2013");

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
      .text("Rate per 1000 People")
        
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