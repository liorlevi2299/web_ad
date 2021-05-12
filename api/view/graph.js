let xlabels=[];
let ylabels=[];
let anomalies=[];

async function getData(feature){

    let i = 0;
    xlabels=[];
    ylabels=[];
    anomalies=[];
    (Object.values(detectCSV[feature])[0]).forEach(val=>{ ////////
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
/*        (Object.values(anomaliesList[feature])[0]).forEach(val=>{

        });*/

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
                type: 'line',
                label: Object.keys(detectCSV[feature]).toString(),
                data: ylabels,
                backgroundColor: "#8A2BE2EF",
                borderColor: "#8A2BE2EF",
                borderWidth: 0.1,
                pointRadius: 1.3,
            }, {
                type: 'scatter',
                label: 'anomalies',
                data:anomalies,
                backgroundColor:'rgb(208,9,9)',
                borderColor: 'rgb(208,9,9)',
                borderWidth: 0.1,
                pointRadius: 1.9,
            }],
            labels: xlabels
        },


        // backgroundColor: 'rgb(102,205,186)',
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
    myChart.canvas.parentNode.style.height = '400px';
    myChart.canvas.parentNode.style.width = '78%';
    myChart.canvas.parentNode.style.position = 'absolute'
    myChart.canvas.parentNode.style.top = '12cm';
    myChart.canvas.parentNode.style.padding = '8px';
}


