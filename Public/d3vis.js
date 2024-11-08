Promise.all([
  fetch('http://localhost:3003/api/movies/netflix-movies').then(response => response.json()),
  fetch('http://localhost:3003/api/movies/prime-movies').then(response => response.json()),
  fetch('http://localhost:3003/api/movies/hulu-movies').then(response => response.json())
])
.then(([netflixData, primeData, huluData]) => {
  // Prepare the data for visualization
  const data = [
    { service: 'Netflix', count: netflixData.length },
    { service: 'Amazon Prime', count: primeData.length },
    { service: 'Hulu', count: huluData.length }
  ];
  
  console.log(data); // View the data structure in console
  visualizeData(data); // Pass the data to D3 visualization function
})
.catch(error => console.error('Error fetching data:', error));

// Function to visualize data using D3
function visualizeData(data) {
  // Set up dimensions and margins for the chart
  const width = 500;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };

  // Create SVG element
  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Define the scales
  const x = d3.scaleBand()
    .domain(data.map(d => d.service))
    .range([0, width - margin.left - margin.right])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([height - margin.top - margin.bottom, 0]);

  // Add x-axis
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  // Add y-axis
  svg.append("g")
    .call(d3.axisLeft(y));

  // Create bars
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.service))
    .attr("y", d => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", d => height - margin.top - margin.bottom - y(d.count))
    .attr("fill", "steelblue");

  // Add labels
  svg.selectAll(".text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", d => x(d.service) + x.bandwidth() / 2)
    .attr("y", d => y(d.count) - 5)
    .attr("text-anchor", "middle")
    .text(d => d.count);
}