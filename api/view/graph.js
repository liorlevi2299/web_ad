let xlabels=[];
let ylabels=[];
let anomalies=[];

// copy the data, according to the chosen feature, to 2 arrays: the time array (x), and the data array (y)
async function getData(feature){
    let i = 0;
    xlabels=[];
    ylabels=[];
    anomalies=[];
    (Object.values(detectCSV[feature])[0]).forEach(val=>{
        xlabels.push(i);
        ylabels.push(val);
        i++;
    });

    let lines = []
    if (anomaliesList!=null){
        if (anomaliesList.has(Object.keys(detectCSV[feature]).toString())){
            lines = anomaliesList.get(Object.keys(detectCSV[feature]).toString())
        }
    }
    console.log(lines)

    lines.forEach(num=>{
        let point ={
            x: num,
            y: ((Object.values(detectCSV[feature])[0])[num])
        }
        anomalies.push(point);
    });
}

async function showGraph(feature){
    document.getElementById("canvas").remove();
    let newCanvas = document.createElement("canvas");
    newCanvas.id = "canvas"
    document.getElementById("canvasDev").append(newCanvas);
    await getData(feature).catch(err=>{
        console.error(err);
    });
    var ctx = document.getElementById('canvas').getContext('2d');
    let myChart = new Chart(ctx, {
        data: {
            datasets: [{
                // the line of data
                type: 'line',
                label: Object.keys(detectCSV[feature]).toString(),
                data: ylabels,
                backgroundColor: "#8A2BE2EF",
                borderColor: "#8A2BE2EF",
                borderWidth: 0.1,
                pointRadius: 1.3,
                order: 2

            }, {
                // the points of anomalies:
                type: 'scatter',
                label: 'anomalies',
                data:anomalies,
                backgroundColor:'rgb(208,9,9)',
                borderColor: 'rgb(94,2,2)',
                borderWidth: 0.1,
                pointRadius: 1.9,
                order: 1
            }],
            labels: xlabels
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    //design:
    myChart.canvas.parentNode.style.height = '53vh';
    myChart.canvas.parentNode.style.width = '70vw';
    myChart.canvas.parentNode.style.position = 'relative'
    myChart.canvas.parentNode.style.top = '4.9vh';
    myChart.canvas.parentNode.style.padding = '8px';
    myChart.canvas.parentNode.style.border = '0.3vw double rgba(138, 43, 226, 0.94)';
    myChart.canvas.parentNode.style.marginLeft = '5px';
    myChart.canvas.parentNode.style.borderRadius = '5px';

}


