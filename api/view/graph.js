let xlabels=[];
let ylabels=[];
let anomalies=[{x: 15, y:1},{x: 16, y:1},{x: 17, y:1},{x: 18, y:1},{x: 110, y:5},{x: 111, y:5},
    {x: 112, y:5},{x: 113, y:5},{x: 114, y:5},{x: 115, y:5}];

async function getData(feature){

    let i = 0;
    xlabels=[];
    ylabels=[];
    anomalies=[];
    (Object.values(result[feature])[0]).forEach(val=>{
        xlabels.push(i);
        ylabels.push(val);
        i++;
    });
    console.log(ylabels);

    /*    if (jsonAnomalies!=null){
    (Object.values(jsonAnomalies[feature])[0]).forEach(val=>{
        let point ={
            x: val,
            y: ((result[feature])[0])[val]
        }
        anomalies.push(point);
    });*/

}

async function showGraph(feature){
    document.getElementById("canvas").remove();
    let newCanvas = document.createElement("canvas");
    newCanvas.id = "canvas"
    document.getElementById("canvasDev").append(newCanvas);
    console.log("anomalies");
    console.log(anomalies);
    await getData(feature).catch(err=>{
        console.error(err);
    });
    var ctx = document.getElementById('canvas').getContext('2d');
    let myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: Object.keys(result[feature]).toString(),
                data: ylabels,
                backgroundColor:'rgba(9,79,208,0.20)',
                borderColor: 'rgb(9,79,208)',
                borderWidth: 0.1,
                pointRadius: 0.7,
            }, {
                type: 'scatter',
                label: 'anomalies',
                data:anomalies,
                backgroundColor:'rgb(208,9,9)',
                borderColor: 'rgb(208,9,9)',
                borderWidth: 0.1,
                pointRadius: 0.7,
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

}


