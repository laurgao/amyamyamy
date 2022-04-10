
const central_image = document.getElementById("central_image");
const description = document.getElementById("description");

// set the dimensions and margins of the graph
var width = 650;
var height = 650;
var margin = 40;
var ring_width = 25;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin;
const colors = ["#FFFFFF", "#FFD4D4", "#FFFAC9", "#C4C4C4", "#000"];

// set the color scale
var color = (x, data_dict) => {
    return colors[data_dict[x].color];
};

// Compute the position of each group on the pie:
var pie = d3
    .pie()
    .value(function (d) {
        return d.value.width;
    })
    .sort(null);

// 2020 donut
const data_2020 = {
    gap: { width: 0.6, color: 0, description: "f" },
    jan_dec_1: { width: 0.3, color: 3, description: "f" },
    start_here: { width: 1, color: 1, description: "f" },
    jan_dec_2: { width: 10.7, color: 3, description: "f" },
};

var data_ready_2020 = pie(d3.entries(data_2020));
 
// append the svg object to the div called 'circle_d3_graph'
var svg_2020_donut = d3
    .select("#circle_d3_graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
	.attr("id", "id3")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg_2020_donut
    .selectAll("h")
    .data(data_ready_2020)
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
        return color(d.data.key, data_2020);
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", (d) => (color(d.data.key, data_2020) === colors[0] ? 0 : 1));
	


svg_2020_donut
    .selectAll("h")
    .data(data_ready_2020)
    .enter()
    .append("text")
    .text((d) => (d.data.key === "gap" ? "2020" : (d.data.key === "start_here" ? "start here" : null)))
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
        return "rotate(" + (((d.startAngle + d.endAngle) / 2) * 180) / Math.PI + ") translate(0," + (ring_width - radius - 5) + ")";
    });
	
	
// 2021 donuts

radius = radius - (ring_width * 2)

var svg_2021_main_donut = d3
    .select("#id3")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
	.attr("id","outerPie")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
// Right now, we'll just focus on the 1 year of 2021.
// ok idk how to add typescript but
// type data = {}
const data_2021 = {
    gap: { width: 0.6, color: 0 },
    jan: { width: 1, color: 1, description: "Learned plasmid design on Benchling to bioengineer ocean-cleaning medusoids (jellyfish + rat hybrids)" },
    feb: { width: 1, color: 1, description: "Pitched a VR platform for high schoolers to improve understanding of biological phenomena by 77%" },
    mar: { width: 1, color: 1, description: "Worked with the UN to design a global teleworking platform to increase employment for women in Mexico" },
    apr: { width: 1, color: 1, description: "Co-designed a cell-computer interface to monitor biomarkers in the blood for early detection of cancer"},
    may_jun: { width: 2, color: 1, description: "Used evolutionary algorithms to evolve xenobots to clear plaque from arteries" },
    jul: { width: 1, color: 1, description: "Consulted for BenchSci on how to use their platform to XLR8 and refine clinical trial design" },
    aug: { width: 1, color: 1, description: "Proposed an acquisition of EdgeQ by Renesas for an end-to-end 5G connectivity solution for the mass market" },
    sep: { width: 1, color: 0, description: "" },
    oct: { width: 1, color: 1, description: "Researching the biological basis of intelligence and optimization tactics with Dragon’s Vault" },
    nov: { width: 1, color: 0, description: "" },
    dec: { width: 1, color: 1, description: "Building a device to measure bioimpedance for early + non-invasive cancer detection" },
};
const data_2021_2 = {
    gap: { width: 0.6, color: 0 },
    jan: { width: 1, color: 0 },
    feb: { width: 1, color: 2, description: "Performed a CRISPR-Cas9 experiment at home + made a youtube video documenting it!" },
    mar: { width: 1, color: 0 },
    apr_sep: { width: 6, color: 2, description: "Proposed a genetic edit to and gene editing method for Azotobacter vinalandii to create a better biofertilizer with TKS iGEM" },
    oct: { width: 1, color: 0 },
    nov: { width: 1, color: 0 },
    dec: { width: 1, color: 0 },
};
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
        return color(d.data.key, data_2021);
    })
    .style("opacity", function (d) {
        color(d.data.key, data_2021) === colors[0] ? 0 : 1;
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .attr("id", (d) => d.data.key + "_21");

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
    .select("#outerPie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
	.attr("id", "id2")
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
        return color(d.data.key, data_2021_2);
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", (d) => (color(d.data.key, data_2021_2) === colors[0] ? 0 : 1))
    .attr("id", (d) => d.data.key + "_21_2");


const datasets = [{data: data_2021, id: "21"}, {data: data_2021_2, id: "21_2"}]

for (const dataset of datasets) {
	for (const key of Object.keys(dataset.data)) {
		let data = dataset.data[key];
		if (data.color !== 0) {
			d3.select("#" + key + "_" + dataset.id)
				.on("mouseover", function () {
					console.log("mouse OVER");
					central_image.src = "./imgs/" + dataset.id + "_" + key + ".png";
					central_image.alt = "Picture of " + data.description;
					description.style.visibility = "visible";
					description.innerHTML = data.description;
				})
				.on("mouseout", function () {
					central_image.src = "./imgs/amy_headshot.png";
					central_image.alt = "Amy Li headshot";
					console.log("mouse out");
					description.innerHTML = "";
					description.style.visibility = "hidden";
				});
		}
	}
}
// 2022 donut
const data_2022 = {
    gap: { width: 0.6, color: 0, description: "f" },
    jan_dec: { width: 12, color: 4, description: "f" },
};

var data_ready_2022 = pie(d3.entries(data_2022));

radius = radius - (ring_width * 2) 
var svg_2022_donut = d3
    .select("#outerPie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
	.attr("id", "id4")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg_2022_donut
    .selectAll("h")
    .data(data_ready_2022)
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
        return color(d.data.key, data_2022);
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", (d) => (color(d.data.key, data_2022) === colors[0] ? 0 : 1));


svg_2022_donut
    .selectAll("h")
    .data(data_ready_2022)
    .enter()
    .append("text")
    .text((d) => (d.data.key === "gap" ? "2022" : null))
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
        return "rotate(" + (((d.startAngle + d.endAngle) / 2) * 180) / Math.PI + ") translate(0," + (ring_width - radius - 5) + ")";
    });