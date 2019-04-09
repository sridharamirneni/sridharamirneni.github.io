const m0 = {
  id: "64e74b1cb96692d4@179",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md
)})
    },
    {
      name: "chart",
      inputs: ["pack","data","d3","DOM","width","height","color","format"],
      value: (function(pack,data,d3,DOM,width,height,color,format)
{
  const root = pack(data);

  const svg = d3.select(DOM.svg(width, height))
      .style("width", "100%")
      .style("height", "auto")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle");

  const leaf = svg.selectAll("g")
    .data(root.leaves())
    .join("g")
      .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

  leaf.append("circle")
      .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
      .attr("r", d => d.r)
      .attr("fill-opacity", 0.7)
      .attr("fill", d => color(d.data.group));

  leaf.append("clipPath")
      .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
    .append("use")
      .attr("xlink:href", d => d.leafUid.href);

  leaf.append("text")
      .attr("clip-path", d => d.clipUid)
    .selectAll("tspan")
    .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
    .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text(d => d);

  leaf.append("title")
      .text(d => `${d.data.group}\n${d.data.name}\n${format(d.value)}`);

  return svg.node();
}
)
    },
    {
      name: "data",
      inputs: ["d3"],
      value: (async function(d3){return(
await d3.csv("country-visas-new6.csv", ({id, value}) => ({name: id.split(".").pop(), group: id.split(".")[0], value: +value}))
)})
    },
    {
      name: "pack",
      inputs: ["d3","width","height"],
      value: (function(d3,width,height){return(
data => d3.pack()
    .size([width - 2, height - 2])
    .padding(3)
  (d3.hierarchy({children: data})
    .sum(d => d.value))
)})
    },
    {
      name: "width",
      value: (function(){return(
932
)})
    },
    {
      name: "height",
      inputs: ["width"],
      value: (function(width){return(
width
)})
    },
    {
      name: "format",
      inputs: ["d3"],
      value: (function(d3){return(
d3.format(",d")
)})
    },
    {
      name: "color",
      inputs: ["d3","data"],
      value: (function(d3,data){return(
d3.scaleOrdinal(data.map(d => d.group), d3.schemeCategory10)
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@5")
)})
    }
  ]
};

const notebook = {
  id: "64e74b1cb96692d4@179",
  modules: [m0]
};

export default notebook;
