// Create a canvas element
let canvasTable1 = document.createElement("canvas");
let canvasTable2 = document.createElement("canvas");
let myChart1 = document.getElementById("table1");
let myChart2 = document.getElementById("table2");
canvasTable1.setAttribute("id", "graph1");
canvasTable2.setAttribute("id", "graph2");
let ContainerTable = document.getElementById("mw-content-text");
ContainerTable.insertBefore(canvasTable1, myChart1);
ContainerTable.insertBefore(canvasTable2, myChart2);
canvasTable1.width = 800; // Set the width of the canvas
canvasTable1.height = 600; // Set the height of the canvas
canvasTable2.width = 800; // Set the width of the canvas
canvasTable2.height = 600; // Set the width of the canvas

document.addEventListener("DOMContentLoaded", function () {
  let labels = [];
  let data = [];

  let table = document.getElementsByTagName("table")[0];
  let tbody = table.getElementsByTagName("tbody")[0];
  let rows = tbody.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    let country = rows[i].getElementsByTagName("td")[0].innerText;
    labels.push(country);

    let values = rows[i].getElementsByTagName("td");
    let countryData = [];

    for (let j = 2; j < values.length; j++) {
      let value = parseFloat(values[j].innerText.replace(",", "."));
      countryData.push(value);
    }

    data.push(countryData);
  }

  console.log(data);
  console.log(labels);
  let ctx = document.getElementById("graph1").getContext("2d");

  if (ctx) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
        ],
        datasets: data.map((countryData, index) => ({
          label: labels[index],
          data: countryData,
          fill: false,
          borderColor: getRandomColor(),
        })),
      },
      options: {
        responsive: true,
      },
    });
  } else {
    console.error("Impossible de récupérer le contexte du canvas.");
  }
});

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const mygraph2 = document.getElementById("table2");

let data2 = [];
for (let i = 1; i < mygraph2.rows.length; i++) {
  const rowData = mygraph2.rows[i].cells;
  const dataObj = {
    "N°": rowData[0].innerText.trim(),
    Country: rowData[1].innerText.trim(),
    "2007-09": rowData[2].innerText.trim(),
    "2010-12": rowData[3].innerText.trim(),
  };
  data2.push(dataObj);
}
console.log(data2);
const ctx2 = document.getElementById("graph2").getContext("2d");
const countries2 = data2.map(data => data.Country);
const values2007_09 = data2.map(data => data["2007-09"]);
const values2010_12 = data2.map(data => data["2010-12"]);
new Chart(ctx2, {
  type: "bar",
  data: {
    labels: countries2,
    datasets: [
      {
        label: "2007-09",
        data: values2007_09,
        borderWidth: 1,
      },
      {
        label: "2010-12",
        data: values2010_12,
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Function to generate random colors for chart lines
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// création et attribution de l'id pour la zone du graphique
let dataPoints = [];
let table3 = document.createElement("canvas");
table3.id = "graph3";
// création du context du graphique
const ctx3 = table3.getContext("2d");

// pré-configuration du graphique

const chartConfig = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Data Series",
        data: dataPoints,
        fill: false,
        borderColor: "rgb(0, 0, 0)",
        tension: 0.2,
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "X-Axis",
        },
      },
      y: {
        title: {
          display: true,
          text: "Y-Axis",
        },
      },
    },
  },
};

const graph3 = new Chart(ctx3, chartConfig);
//fonction update graph
function updateChart() {
  const xstart =
    dataPoints.length > 0 ? dataPoints[dataPoints.length - 1].x + 1 : 1;
  const ystart =
    dataPoints.length > 0 ? dataPoints[dataPoints.length - 1].y : 0;
  fetch(
    `https://canvasjs.com/services/data/datapoints.php?xstart=${xstart}&ystart=${ystart}`
  )
    .then(response => response.json())
    .then(data => {
      dataPoints.push({
        x: xstart,
        y: data[0][1],
      });

      graph3.update();

      setTimeout(updateChart, 1000);
    });
}

const h1Element = document.querySelector("h1");
h1Element.insertAdjacentElement("beforebegin", table3);

updateChart();
