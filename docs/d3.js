const central_image = document.getElementById("central_image");
const description = document.getElementById("description");
const container = document.getElementById("container");
const descriptionContainer = document.getElementById("descriptionContainer");

const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;

// const isMobile = viewportWidth < 640; // 640 is the width `sm` in tailwind
const isMobile = viewportWidth < viewportHeight;
const titleHeight = 48;

// set the dimensions of the graph
const graphSize = Math.min(viewportHeight - titleHeight, viewportWidth) * 0.8;
var width = graphSize;
var height = graphSize;
var ringWidth = 25;

// The radius of the pieplot is half the width or half the height (smallest one)
var radius = Math.min(width, height) / 2;
const colors = { pink: "#FFD4D4", yellow: "#FFFAC9", grey: "#C4C4C4", black: "#000000" };

const smallestRingWidth = radius - 5 * ringWidth;
const bufferBetweenRingsAndPicture = graphSize < 500 ? ringWidth : 2 * ringWidth;
const pictureRadius = smallestRingWidth - bufferBetweenRingsAndPicture;
central_image.width = pictureRadius * 2;
central_image.height = pictureRadius * 2;

container.style.gridTemplateColumns = !isMobile ? "1fr " + (graphSize + ringWidth) + "px 1fr" : null;
description.style.height = !isMobile ? "66.6666666667%" : null;
descriptionContainer.style.height = !isMobile ? "100%" : null;

// set the color scale
var color = (x, data_dict) => {
    return data_dict[x].exist ? colors[data_dict[x].color] : colors.black;
};
var exist = (x, data_dict) => {
    return data_dict[x].exist;
};

// Compute the position of each group on the pie:
var pie = d3
    .pie()
    .value(function (d) {
        return d.value.width;
    })
    .sort(null);

// idk how to add typescript but here's how the data is structured:
// type data = {
//     width: number, // the width of gap is 0.6, the width of everything else is number of months it lasts.
//     exist: boolean, // false if is placeholder for spacing, true if it is an event in amy's life that has a picture and description
//     // the following are only used if exist is true
//     color?: string, // the color on the pie chart, which is a key in the `colors` object.
//     description?: string,
// }

// 2020 donut
const data_2020 = {
    gap: { width: 0.6, exist: false, description: "Placeholder" },
    jan_dec_1: { width: 0.3, color: "grey", exist: true, description: "Placeholder" },
    start_here: { width: 1, color: "pink", exist: true, description: "Placeholder" },
    jan_dec_2: { width: 10.7, color: "grey", exist: true, description: "Placeholder" },
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
            .innerRadius(radius - ringWidth) // This is the size of the donut hole
            .outerRadius(radius)
    )
    .attr("fill", function (d) {
        return color(d.data.key, data_2020);
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .attr("class", "pie-section")
    .style("visibility", (d) => (exist(d.data.key, data_2020) ? "visible" : "hidden"))
    .attr("id", (d) => d.data.key + "_20");

svg_2020_donut
    .selectAll("h")
    .data(data_ready_2020)
    .enter()
    .append("text")
    .text((d) => (d.data.key === "gap" ? "2020" : d.data.key === "start_here" ? "start here" : null))
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
        return "rotate(" + (((d.startAngle + d.endAngle) / 2) * 180) / Math.PI + ") translate(0," + (ringWidth - radius - 5) + ")";
    });

// 2021 donuts

radius = radius - ringWidth * 2;

var svg_2021_main_donut = d3
    .select("#id3")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "outerPie")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

const data_2021 = {
    gap: { width: 0.6, exist: false },
    jan: {
        width: 1,
        color: "pink",
        exist: true,
        description: "Learned plasmid design on Benchling to bioengineer ocean-cleaning medusoids (jellyfish + rat hybrids)",
    },
    feb: {
        width: 1,
        color: "pink",
        exist: true,
        description: "Pitched a VR platform for high schoolers to improve understanding of biological phenomena by 77%",
    },
    mar: {
        width: 1,
        color: "pink",
        exist: true,
        description: "Worked with the UN to design a global teleworking platform to increase employment for women in Mexico",
    },
    apr: {
        width: 1,
        color: "pink",
        exist: true,
        description: "Co-designed a cell-computer interface to monitor biomarkers in the blood for early detection of cancer",
    },
    may_jun: {
        width: 2,
        color: "pink",
        exist: true,
        description: "Used evolutionary algorithms to evolve xenobots to clear plaque from arteries",
    },
    jul: {
        width: 1,
        color: "pink",
        exist: true,
        description: "Consulted for BenchSci on how to use their platform to XLR8 and refine clinical trial design",
    },
    aug: {
        width: 1,
        color: "pink",
        exist: true,
        description: "Proposed an acquisition of EdgeQ by Renesas for an end-to-end 5G connectivity solution for the mass market",
    },
    sep: { width: 1, exist: false, description: "" },
    oct: {
        width: 1,
        color: "pink",
        exist: true,
        description: "Researching the biological basis of intelligence and optimization tactics with Dragon’s Vault",
    },
    nov: { width: 1, exist: false, description: "" },
    dec: {
        width: 1,
        color: "pink",
        exist: true,
        description: "Building a device to measure bioimpedance for early + non-invasive cancer detection",
    },
};
const data_2021_2 = {
    gap: { width: 0.6, exist: false },
    jan: { width: 1, exist: false },
    feb: {
        width: 1,
        color: "yellow",
        exist: true,
        description: "Performed a CRISPR-Cas9 experiment at home + made a youtube video documenting it!",
    },
    mar: { width: 1, exist: false },
    apr_sep: {
        width: 6,
        color: "yellow",
        exist: true,
        description: "Proposed a genetic edit to and gene editing method for Azotobacter vinalandii to create a better biofertilizer with TKS iGEM",
    },
    oct: { width: 1, exist: false },
    nov: { width: 1, exist: false },
    dec: { width: 1, exist: false },
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
            .innerRadius(radius - ringWidth) // This is the size of the donut hole
            .outerRadius(radius)
    )
    .attr("fill", function (d) {
        return color(d.data.key, data_2021);
    })
    .style("visibility", (d) => (exist(d.data.key, data_2021) ? "visible" : "hidden"))
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .attr("class", "pie-section")
    .attr("id", (d) => d.data.key + "_21");

svg_2021_main_donut
    .selectAll("whatever")
    .data(data_ready)
    .enter()
    .append("text")
    .text((d) => (d.data.key === "gap" ? "2021" : null))
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
        return "rotate(" + (((d.startAngle + d.endAngle) / 2) * 180) / Math.PI + ") translate(0," + (ringWidth - radius - 5) + ")";
    });

// secondary donut
secondary_ring_width = ringWidth / 3;

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
            .innerRadius(radius - ringWidth) // This is the size of the donut hole
            .outerRadius(radius - (ringWidth - secondary_ring_width))
    )
    .attr("fill", function (d) {
        return color(d.data.key, data_2021_2);
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("visibility", (d) => (exist(d.data.key, data_2021_2) ? "visible" : "hidden"))
    .attr("class", "pie-section")
    .attr("id", (d) => d.data.key + "_21_2");

// 2022 donut
const data_2022 = {
    gap: { width: 0.6, exist: false, description: "Placeholder" },
    jan_dec: { width: 12, color: "black", exist: true, description: "Placeholder" },
};

var data_ready_2022 = pie(d3.entries(data_2022));

radius = radius - ringWidth * 2;
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
            .innerRadius(radius - ringWidth) // This is the size of the donut hole
            .outerRadius(radius)
    )
    .attr("fill", function (d) {
        return color(d.data.key, data_2022);
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .attr("class", "pie-section")
    .style("visibility", (d) => (exist(d.data.key, data_2022) ? "visible" : "hidden"))
    .attr("id", (d) => d.data.key + "_22");

svg_2022_donut
    .selectAll("h")
    .data(data_ready_2022)
    .enter()
    .append("text")
    .text((d) => (d.data.key === "gap" ? "2022" : null))
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
        return "rotate(" + (((d.startAngle + d.endAngle) / 2) * 180) / Math.PI + ") translate(0," + (ringWidth - radius - 5) + ")";
    });

// Handle the hover events!

const datasets = [
    { data: data_2020, id: "20" },
    { data: data_2021, id: "21" },
    { data: data_2021_2, id: "21_2" },
    { data: data_2022, id: "22" },
];

for (const dataset of datasets) {
    for (const key of Object.keys(dataset.data)) {
        let data = dataset.data[key];
        if (data.exist) {
            d3.select("#" + key + "_" + dataset.id)
                .on("mouseover", function () {
                    central_image.src = "./imgs/" + dataset.id + "_" + key + ".png";
                    central_image.alt = "Picture of " + data.description;
                    description.style.visibility = "visible";
                    description.innerHTML = data.description;
                })
                .on("mouseout", function () {
                    central_image.src = "./imgs/amy_headshot.png";
                    central_image.alt = "Amy Li headshot";
                    description.innerHTML = "";
                    description.style.visibility = "hidden";
                });
        }
    }
}
