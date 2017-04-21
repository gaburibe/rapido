 

var width = 260,
    height = 228,
    centered;
var subheight=height-50; //Subheight deja espacio para los labels



d3.json("mx.json", function(error, mx) {

  var states = topojson.feature(mx, mx.objects.municipalities);
  //Se filtran los municipios y se dibujan en sus contenedores
  state = states.features.filter(function(d) { return d.properties.name === "Parras"; })[0];
  drawMunicipios(state,states,mx,"mn1");
  state = states.features.filter(function(d) { return d.properties.name === "La Magdalena Contreras"; })[0];
  drawMunicipios(state,states,mx,"mn2");
  state = states.features.filter(function(d) { return d.properties.name === "Azcapotzalco"; })[0];
  drawMunicipios(state,states,mx,"mn3");
 
});

d3.json("mxs.json", function(error, mx) {

  var states = topojson.feature(mx, mx.objects.states);
  //Se filtran los estados y se dibujan en sus contenedores
  state = states.features.filter(function(d) { return d.properties.name === "Baja California"; })[0];
  drawStates(state,states,mx,"st1");
  state = states.features.filter(function(d) { return d.properties.name === "Sonora"; })[0];
  drawStates(state,states,mx,"st2");
  state = states.features.filter(function(d) { return d.properties.name === "Chiapas"; })[0];
  drawStates(state,states,mx,"st3");
 
});



function drawMunicipios(state,states,mx,container){ // dibuja solo una parte del mapa a escala
  var path = d3.geo.path()
              .projection(projection);

  var svg2 = d3.select("#"+container).append("svg")
                .attr("width", width)
                .attr("height", height);
  var projection = d3.geo.albers();
  var path = d3.geo.path()
                .projection(projection);
  projection
                    .scale(1)
                    .translate([0,0]);
  var b = path.bounds(state),
                    s = .95 / Math.max ((b[1][0]-b[0][0])/width, (b[1][1]-b[0][1])/subheight),
                    t = [(width-s*(b[1][0]+b[0][0]))/2, (subheight-s*(b[1][1]+b[0][1]))/2];
  projection //se modifica la projección al bpunding box del estado
  .scale(s)
  .translate(t);

                svg2.append("path")
                    .datum(state)
                    .attr("class", "municipalities")
                    .attr("d", path);
  svg2.append("text")   //LABEL
  .attr("y", height-10)
  .attr("x", width/2)
  .attr("class", "labelG")
  .attr("text-anchor","middle")
  .text(state.properties.name);
}

function drawStates(state,states,mx,container){ // dibuja solo una parte del mapa a escala
  console.log(state);
  
  var path = d3.geo.path()
              .projection(projection);

  var svg2 = d3.select("#"+container).append("svg")
                .attr("width", width)
                .attr("height", height);
 
  var projection = d3.geo.albers();
  var path = d3.geo.path()
                .projection(projection);
  projection
                    .scale(1)
                    .translate([0,0]);
  var b = path.bounds(state),
                    s = .95 / Math.max ((b[1][0]-b[0][0])/width, (b[1][1]-b[0][1])/subheight),
                    t = [(width-s*(b[1][0]+b[0][0]))/2, (subheight-s*(b[1][1]+b[0][1]))/2];
  projection //se modifica la projección al bpunding box del estado
  .scale(s)
  .translate(t);

                svg2.append("path")
                    .datum(state)
                    .attr("class", "municipalities")
                    .attr("d", path)
   svg2.append("text")     //LABEL
  .attr("y", height-10)
  .attr("x", width/2)
  .attr("class", "labelG")
  .attr("text-anchor","middle")
  .text(state.properties.name);

}


