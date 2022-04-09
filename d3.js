// set the dimensions and margins of the graph
var width = 450;
var height = 450;
var margin = 40;
var ring_width = 25;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin;
const colors = ["#FFFFFF", "#FFD4D4", "#FFFAC9"];

// append the svg object to the div called 'circle_d3_graph'
var svg_2021_main_donut = d3
    .select("#circle_d3_graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
// Right now, we'll just focus on the 1 year of 2021.
// ok idk how to add typescript but
// type data = {}
const data_2021 = {
    gap: { width: 1, color: 0 },
    jan: { width: 1, color: 1 },
    feb: { width: 1, color: 1 },
    mar: { width: 1, color: 1 },
    apr: { width: 1, color: 1 },
    may_jun: { width: 2, color: 1 },
    jul: { width: 1, color: 1 },
    aug: { width: 1, color: 1 },
    sep: { width: 1, color: 0 },
    oct: { width: 1, color: 1 },
    nov: { width: 1, color: 0 },
    dec: { width: 1, color: 1 },
};
const data_2021_2 = {
    gap: { width: 1, color: 0 },
    jan: { width: 1, color: 0 },
    feb: { width: 1, color: 2 },
    mar: { width: 1, color: 0 },
    apr_sep: { width: 6, color: 2 },
    oct: { width: 1, color: 0 },
    nov: { width: 1, color: 0 },
    dec: { width: 1, color: 0 },
};

// set the color scale
var color = (x) => {
    return colors[data_2021[x].color];
};
var color_2 = (x) => {
    console.log(x);
    return colors[data_2021_2[x].color];
};

// Compute the position of each group on the pie:
var pie = d3
    .pie()
    .value(function (d) {
        return d.value.width;
    })
    .sort(null);
var data_ready = pie(d3.entries(data_2021));
var data_ready_2 = pie(d3.entries(data_2021_2));

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg_2021_main_donut
    .selectAll("whatever")
    .data(data_ready)
    .enter()
    .append("path")
    .attr(
        "d",
        d3
            .arc()
            .innerRadius(radius - ring_width) // This is the size of the donut hole
            .outerRadius(radius)
    )
    .attr("fill", function (d) {
        return color(d.data.key);
    })
    .style("opacity", function (d) {
        color(d.data.key) === colors[0] ? 0 : 1;
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px");
// .style("stroke-opacity", "0");

svg_2021_main_donut
    .selectAll("whatever")
    .data(data_ready)
    .enter()
    .append("text")
    .text((d) => (d.data.key === "gap" ? "2021" : null))
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
        return "rotate(" + (((d.startAngle + d.endAngle) / 2) * 180) / Math.PI + ") translate(0," + (ring_width - radius - 5) + ")";
    });

// secondary donut
secondary_ring_width = ring_width / 3;

var svg_2021_2nd_donut = d3
    .select("#circle_d3_graph_2")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg_2021_2nd_donut
    .selectAll("h")
    .data(data_ready_2)
    .enter()
    .append("path")
    .attr(
        "d",
        d3
            .arc()
            .innerRadius(radius - ring_width) // This is the size of the donut hole
            .outerRadius(radius - (ring_width - secondary_ring_width))
    )
    .attr("fill", function (d) {
        return color_2(d.data.key);
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", (d) => (color_2(d.data.key) === colors[0] ? 0 : 1));
