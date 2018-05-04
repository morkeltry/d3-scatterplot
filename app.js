const height=500;
const width=800;
const padding = 50;


const graph = d3.select ('#scatterplot');
const plots = graph.selectAll ('circle');

const scaleX = d3.scaleLinear()
    .domain (d3.extent (regionData, d=> d.medianAge))
    .range ([padding,width-padding]);
const scaleY = d3.scaleLinear()
    .domain (d3.extent (regionData, d=> d.adultLiteracyRate))
    .range ([height-padding,padding]);
const scaleColour = d3.scaleLinear()
    .domain (d3.extent (regionData, d=> d.growthRate))
    .range (['blue','pink','red']);
const scalePoloness = d3.scaleLinear()
    .domain ([0,1])
    .range ([0,9]);

const xPos = d=> scaleX(d.medianAge);
const yPos = d=> scaleY(d.adultLiteracyRate);
const plotColour = d=> d.growthRate ? scaleColour(d.growthRate) : 'white';
const colAv= (d3.min (regionData, d=> d.growthRate)+ d3.max (regionData, d=> d.growthRate))/2
const invPlotColour = d=> d.growthRate ? scaleColour(colAv-d.growthRate) : 'grey';
const poloness = d=> scalePoloness(Math.pow(d.urbanPopulationRate/100,exaggeration));

const exaggeration = 1.1;

graph
    .attr ('width',width)
    .attr ('height',height)

console.log ('plots:', plots);

plots.
  data (regionData)
      .enter ()
      .append ('svg:circle')
      .attr ('cx', xPos)
      .attr ('cy', yPos)
      .attr ('r', 8)
      .attr ('fill', plotColour)
      .attr ('stroke', invPlotColour)
      .attr ('stroke-width', poloness)
      .attr ('datum', d=> d.growthRate)
      .on("mouseover", (d,i)=> {
        const tooltipText = `${d.region}: ${d.growthRate}%`;
        d3.select('svg')
            .append("text")
              .text(tooltipText)
              .attr("x", xPos(d)+12)
              .attr("y", yPos(d)+5);
      })
      .on("mouseout", ()=> {
        d3.select('svg')
            .selectAll("text")
              .remove();
      });


console.log ('plots:', plots);

var div = d3.selectAll(plots)
    .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
