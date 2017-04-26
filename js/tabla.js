  colors={radEncGood:"skyblue",radEncReg:"grey",radEncBad:"tomato",
  radEncA_R1:"rgba(135,206,235,1)",radEncA_R2:"rgba(135,206,235,.5)"
  ,radEncA_R3:"rgba(255,99,71,.5)",radEncA_R4:"rgba(255,99,71,1)"}


  

  $.getJSON( "encuesta.json", function( data ) {  
    // console.log( "JSON Data: " + data);
    c=0;
    console.log(data)
    makeAwnser(data)



   
});


function makeAwnser(data,awn){
  var resultado={};
  var resultado2={};
  nodes=[];

  awn={ q1:{radEncGood:0,radEncReg:0,radEncBad:0},
  q2:{radEncA_R1:0,radEncA_R2:0,radEncA_R3:0,radEncA_R4:0,radEncA_R5:0}, 
  qg3:{radEncA_R1:0,radEncA_R2:0,radEncA_R3:0,radEncA_R4:0,radEncA_R5:0}, 
  q4:{radEncC_R1:0,radEncC_R2:0} ,
  qb3:{ckEncB_A1:0,ckEncB_A2:0,ckEncB_A3:0,ckEncB_A4:0,ckEncB_A5:0} 
  }
  for(entrada in data){
      c++;
      objetoent=data[entrada];
      if (objetoent.answers && objetoent.answers.q4) {
        awn.q4[objetoent.answers.q4]+=1;
      }
      if (objetoent.answers && objetoent.answers.q1=="radEncGood") {
        for(k in objetoent.answers.q3){
          awn.qg3[objetoent.answers.q3[k]]+=1;
        }
      }
      else if(objetoent.answers && (objetoent.answers.q1=="radEncBad" || objetoent.answers.q1=="radEncReg") ){
        for(k in objetoent.answers.q3){
          awn.qb3[objetoent.answers.q3[k]]+=1;
        }
      }
      if( objetoent.answers && resultado[objetoent.organization] ){
        if(resultado[objetoent.organization][objetoent.answers.q1]){
          resultado[objetoent.organization][objetoent.answers.q1]+=1;
        }
        else{
          resultado[objetoent.organization].org=objetoent.organization;
          resultado[objetoent.organization][objetoent.answers.q1]=1;
        }
      
      }
      else{
        resultado[objetoent.organization]={};
      }
      // Q2
      if( objetoent.answers && resultado2[objetoent.organization] ){
        if(resultado2[objetoent.organization][objetoent.answers.q2]){
          resultado2[objetoent.organization][objetoent.answers.q2]+=1;
          //resultado[objetoent.organization].q2[objetoent.answers.q2]+=1;
        }
        else{
          resultado2[objetoent.organization].org=objetoent.organization;
          resultado2[objetoent.organization][objetoent.answers.q2]=1;
        }
      
      }
      else{
        resultado2[objetoent.organization]={};
      }

  }
  for(asoc in resultado){
    node={name:asoc,respuestas:resultado[asoc],rq2:resultado2[asoc]  };
    nodes.push(node);

  }
  console.log("awn",awn)
  drawQ(nodes,awn,0)
  // for(asoc in resultado2){
  //   node={name:asoc,respuestas:resultado2[asoc]  };
  //   nodes.q2.push(node);
  // }
  // drawQ(nodes.q2,awn.q2,250)
  //   console.log("awn",nodes)
     //Dibuja cada una de las preguntas
     
}


var svg = d3.select("#tabla").append("svg")
                                     .attr("width", 1200)
                                    .attr("height", 4500);

function drawQ(nodes,awn,margin){
  i=2;
  // var back = svg.append("rect")
  //                            .attr("x", 10)
  //                            .attr("y", 10)
  //                           .attr("width", 1000)
  //                           .attr("height", 20)
  //                           .attr("fill","grey")
  svg.append("text")
  .attr("x", 200)
  .attr("y", 20)
  .attr("dy", "0em")
  .text("¿Cómo fue tu ")
  svg.append("text")
  .attr("x", 200)
  .attr("y", 20)
  .attr("dy", "1em")
  .text("experiencia en")
  svg.append("text")
  .attr("x", 200)
  .attr("y", 20)
  .attr("dy", "2em")
  .text("gob.mx?")

  svg.append("text")
  .attr("x", 400)
  .attr("y", 20)
  .attr("dy", "0em")
  .text("¿Fue fácil")
  svg.append("text")
  .attr("x", 400)
  .attr("y", 20)
  .attr("dy", "1em")
  .text("encontrar lo")
  svg.append("text")
  .attr("x", 400)
  .attr("y", 20)
  .attr("dy", "2em")
  .text("que buscabas?")

  svg.append("text")
  .attr("x", 600)
  .attr("y", 20)
  .attr("dy", "1em")
  .text("TOTAL")
  for(node in nodes){
    i=drawsingle(nodes[node],i,awn,margin);
  }
  

}
function drawdonut(){

}
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>" + d.data.age + ":</strong> <span style='color:red'>" + d.data.population + "</span>";
  })
var tip2 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    console.log("kjhjkhjk",d);
    return "<strong>"+d+":</strong> <span style='color:red'>ff</span>";
  })
function drawsingle(node,i,awn,margin){
    T=0;
    T2=0;
    for(s in awn.q1){
      a=awn.q1[s];
      if (!node.respuestas[s]) {node.respuestas[s]=0}
      T=T+node.respuestas[s];
    }
    for(s in awn.q2){
      a=awn.q1[s];
      if (!node.rq2[s]) {node.rq2[s]=0}
      T2=T2+node.rq2[s];
    }
    past=0;
    if(T<=10){return i;}
    else{
      svg.append("text")
        .attr("x", 20)
        .attr("y", (40*i)+2+10 )
        .text(node.name)
      for(s in awn.q1){
      val=node.respuestas[s]/T;
      
        svg.append("rect")
        .attr("x", margin+200+past)
        .attr("y", (40*i)+2 )
        .attr("width", 150*val)
        .attr("height", 20)
        .attr( "fill",colors[s] )
        .attr("data", val)

        if (val>=.10) {
        svg.append("text")
          .attr("x", margin+200+past)
          .attr("y", (40*i) )
          .attr("class","smlabel")
          .text(Math.round(val*100)+"%");
        }
        past+=150*val;
      }
      past=0;
      for(s in awn.q2){
      val=node.rq2[s]/T2;
        svg
        .append("rect")
        .attr("x", 100+280+past)
        .attr("y", (40*i)+2 )
        .attr("width", 200*val)
        .attr("height", 20)
        .attr( "fill",colors[s] )
        .attr("data", val)

        if (val>=.10) {
          svg.append("text")
        .attr("x", 100+280+past)
        .attr("y", (40*i) )
        .attr("class","smlabel")
        .text(Math.round(val*100)+"%");
        }
        
        past+=200*val;
      }
      svg.append("text")
        .attr("x", 600)
        .attr("y", (40*i)+20 )
        .text(T)
      // console.log(node.name,T,node.respuestas.radEncGood/T, i);
      return i+1;
    }
    
     
    
}
 svg.call(tip2); 


 function donut(contenedor,num){
  console.log("DONUTR")
  var width = 230,
    height = 290,
    radius = 120;

var color = d3.scale.ordinal()
    .range(["rgba(135,206,235,1)", "rgba(135,206,235,.7)", "rgba(135,206,235,.5)", "rgba(135,206,235,.3)", "rgba(135,206,235,.1)", "#000", "#fff"]);

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
      .text(function(d) { return "Q"+num });

    svg.call(tip);

d3.csv("data/res.csv", type, function(error, data) {
  data1=[data[0],data[1],data[2],data[3],data[4]]
  data2=[data[5],data[6],data[7],data[8],data[9]]
   data3=[data[10],data[11]]
  if (num==1) {
    data=data1
  }
  else if(num==2){
    data=data2
  }
  else if(num==3){
    data=data3
  }
  if (error) throw error;

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc")
      

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.age); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

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