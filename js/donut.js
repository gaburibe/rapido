function donut(contenedor){
  console.log("DONUTR")
	var width = 230,
    height = 290,
    radius = 120;

var color = d3.scale.ordinal()
    .range(["#0ce8a9", "#0dcc91", "#0caa75", "#0d8459", "#08442a", "#000", "#fff"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 35);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var svg = d3.select("#"+contenedor).append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    svg.append("text")
      .attr("dy", ".35em")
      .attr("class","centertext")
      .text(function(d) { return "100%" });

d3.csv("data/res.csv", type, function(error, data) {
  if (error) throw error;

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.age); });

  // g.append("text")
  //     .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
  //     .attr("dy", ".35em")
  //     .text(function(d) { return d.data.age; });
});
}


function type(d) {
  d.population = +d.population;
  return d;
}